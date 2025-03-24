import React from 'react';
import "./OrderStatuItem.scss"

export const OrderStatusItem = ({ text }) => (
<span className={`item-${text ? text.toLowerCase().replace('| ', '').replace(/ /g, '-') : 'default'}`}>
    {text}
  </span>
);