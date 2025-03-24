import React from "react";

import {
  DataGrid,
  Column,
  Sorting,
  RequiredRule,
  Paging,
  Pager,
  Editing,
  Scrolling,
  FilterRow,
} from "devextreme-react/data-grid";
import SelectBox from "devextreme-react/select-box";
import { OrderStatusItem } from "../../../../components/OrderStatusItem/OrderStatusItem";
import { editFieldRender, statusItemRender } from "../../../../utils/statusIndicatorRenderMethods";
import { Link } from "react-router-dom";
import { STATUS_ITEMS } from "../../../../const/order.status.items.const";

import "./OrdersGrid.scss";


const CellComponent = ({ data }) => {
  return <OrderStatusItem text={data.value.name} />;
};


const statusEditorRender = (cell) => {
  const onValueChanged = (e) => cell.setValue(e.value);
  return (
    <SelectBox
      defaultValue={cell.value}
      items={STATUS_ITEMS}
      valueExpr="id" 
      onValueChanged={onValueChanged}
      fieldRender={editFieldRender}
      itemRender={statusItemRender}
    />
  );
};

export const OrdersGrid = React.forwardRef(({ dataSource }, ref) => {

  return (
    <DataGrid
      className="planning-grid theme-dependent"
      ref={ref}
      dataSource={dataSource}
      columnAutoWidth
      hoverStateEnabled
      showBorders
      height="500"
      pageSize={10}
    >
      <Scrolling
        mode="virtual"
        preloadEnabled={true}
        useNative={false}
        showScrollbar="always"
      />
      <Paging enabled={true} pageSize={15} />
      <Pager visible showPageSizeSelector />
      <Editing mode="row" allowUpdating />
      <FilterRow visible={true} />
      <Sorting mode="multiple" />

      <Column
        dataField="id"
        caption="Order Id"
        hidingPriority={7}
        allowEditing={false}
        alignment="left"
        cellRender={({ data }) => (
          <Link to={`/order-details/${data.id}`}>{data.id}</Link>
        )}
      />
      <Column
        dataField="orderDate"
        caption="Date & Time"
        dataType="date"
        sortOrder="asc"
        hidingPriority={1}
        allowEditing={false}
        alignment="left"
        format="dd.MM.yyyy HH:mm:ss"
      />
      <Column
        caption="Customer"
        calculateCellValue={(rowData) =>
          `${rowData.customer?.firstName || ""} ${
            rowData.customer?.lastName || ""
          }`.trim()
        }
        allowEditing={false}
      />
      <Column
        dataField="customer.address"
        caption="Customer Address"
        hidingPriority={5}
        allowEditing={false}
        allowSorting={false}
        alignment="left"
      />
      <Column
        dataField="customer.phoneNumber"
        caption="Customer Phone"
        hidingPriority={5}
        allowEditing={false}
        allowSorting={false}
        alignment="left"
      />
      <Column
        dataField="total"
        caption="Total"
        hidingPriority={5}
        allowEditing={false}
        alignment="left"
      />
      <Column
        dataField="orderStatus"
        caption="Status"
        minWidth={120}
        cellComponent={CellComponent}
        editCellRender={statusEditorRender}
        hidingPriority={3}
        alignment="left"
      >
        <RequiredRule />
      </Column>
    </DataGrid>
  );
});
