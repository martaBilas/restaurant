import React from "react";

const OrderedItem = ({ index, name, amount, price }) => {
  return (
    <div className="d-flex justify-content-between align-items-center ">
      <span><strong>{index + 1}.</strong> {name}</span>
      <span>{amount} x ${price}</span>
      <span><strong>${amount * price}</strong></span>
    </div>
  );
};

export default OrderedItem;
