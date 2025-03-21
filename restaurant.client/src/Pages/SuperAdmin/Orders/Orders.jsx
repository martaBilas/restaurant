import React, { useState, useCallback, useEffect, useRef } from "react";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import Toolbar, { Item } from "devextreme-react/toolbar";
import LoadPanel from "devextreme-react/load-panel";
import { exportDataGrid } from "devextreme/pdf_exporter";
import { exportDataGrid as exportDataGridXSLX } from "devextreme/excel_exporter";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Button from "devextreme-react/button";
import TextBox from "devextreme-react/text-box";
import { OrdersGrid } from "./components/OrdersGrid";
import DataSource from "devextreme/data/data_source";

import "./Orders.scss";
import { getOrdersList } from "../../../services/OrdersService";

export const Orders = () => {
  const gridRef = useRef(null);

  const [loading, setLoading] = useState(true);

  const dataSource = new DataSource({
    load: async () => {
      return await getOrdersList();
    },
  });

  useEffect(() => {
    if (dataSource) {
      setLoading(false);
    }
  }, [dataSource]);

  const exportToPDF = useCallback(() => {
    const doc = new jsPDF();
    exportDataGrid({
      jsPDFDocument: doc,
      component: gridRef.current?.instance,
    }).then(() => {
      doc.save("Orders.pdf");
    });
  }, []);

  const exportToXSLX = useCallback(() => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Main sheet");
    exportDataGridXSLX({
      component: gridRef.current?.instance,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          "Orders.xlsx"
        );
      });
    });
  }, []);

  const search = useCallback((e) => {
    gridRef.current?.instance.searchByText(e.component.option("text") ?? "");
  }, []);

  return (
    <div className="view-wrapper view-wrapper-task-list list-page px-5 py-2">
      <Toolbar className="toolbar-common theme-dependent pb-2">
        <Item location="before">
          <span className="toolbar-header px-4">Orders</span>
        </Item>
        <Item location="after" locateInMenu="auto">
          <div className="separator" />
        </Item>
        <Item
          location="after"
          widget="dxButton"
          showText="inMenu"
          locateInMenu="auto"
        >
          <Button
            icon="exportpdf"
            text="Export To PDF"
            stylingMode="text"
            onClick={exportToPDF}
          />
        </Item>
        <Item
          location="after"
          widget="dxButton"
          showText="inMenu"
          locateInMenu="auto"
        >
          <Button
            icon="exportxlsx"
            text="Export To XSLX"
            stylingMode="text"
            onClick={exportToXSLX}
          />
        </Item>
        <Item location="after" widget="dxTextBox" locateInMenu="auto">
          <TextBox
            mode="search"
            className="searchBox"
            placeholder="Orders Search"
            onInput={search}
            width={200}
          />
        </Item>
      </Toolbar>
      {loading && <LoadPanel visible />}
      {!loading && <OrdersGrid dataSource={dataSource} ref={gridRef} />}
    </div>
  );
};
