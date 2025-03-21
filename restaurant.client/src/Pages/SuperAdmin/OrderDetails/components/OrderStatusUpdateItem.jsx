import React from "react";
import moment from "moment";
import { OrderStatusItem } from "../../../../components/OrderStatusItem/OrderStatusItem";

const OrderStatusUpdateItem = ({ status, changedTime }) => {
  return (
    <div className="d-flex align-items-center text-muted pb-4 ps-2">
      <i class="fa-regular fa-clock me-1"></i>
      <label>
        <em>{moment(changedTime).fromNow()}</em>
        <sub className="d-block pt-1">
          <small> {moment(changedTime).format("DD.MM.YYYY HH:mm")}</small>
        </sub>
      </label>
      <span className="ms-2">
        Order changed status to <strong><OrderStatusItem status={status}/> </strong>
      </span>
    </div>
  );
};

export default OrderStatusUpdateItem;
