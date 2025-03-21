import React, {useCallback } from "react";
import { useNavigate } from "react-router-dom";

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
import {
  editFieldRender,
  statusItemRender,
} from "../../../../utils/statusindicatorRenderMethos";
import { Link } from "react-router-dom";

import "./OrdersGrid.scss";

let useNavigation = true;

const STATUS_ITEMS = ["Open", "In Progress", "Deferred", "Completed"];

const CellComponent = ({ data }) => <OrderStatusItem text={data.text} />;

const editStatusRender = ({ setValue, value }) => (
  <SelectBox
    className="edit-cell"
    defaultValue={value}
    items={STATUS_ITEMS}
    fieldRender={editFieldRender}
    itemRender={statusItemRender}
    onValueChange={(value) => setValue(value)}
  />
);

export const OrdersGrid = React.forwardRef(({ dataSource }, ref) => {
  const toogleUseNavigation = useCallback(() => {
    useNavigation = !useNavigation;
  }, []);

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
      onEditingStart={toogleUseNavigation}
      onEditCanceled={toogleUseNavigation}
      onSaved={toogleUseNavigation}
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
          <Link to={`/order-details/${data.id}`} >
          {data.id}
        </Link>
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
        format="yyyy-MM-dd HH:mm:ss"
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
        dataField="status"
        caption="Status"
        minWidth={120}
        cellComponent={CellComponent}
        editCellRender={editStatusRender}
        hidingPriority={3}
        alignment="left"
      >
        <RequiredRule />
      </Column>
    </DataGrid>
  );
});
