import React from 'react';
import "./OrderStatuItem.scss"

export const OrderStatusItem = ({ status }) => (
  <span className={`item-field item-${status ? status.toLowerCase().replace('| ', '').replace(' ', '-') : 'default'}`}>
    {status}
  </span>
);