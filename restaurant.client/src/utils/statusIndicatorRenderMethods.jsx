import React from 'react';

import TextBox from 'devextreme-react/text-box';
import { OrderStatusItem } from '../components/OrderStatusItem/OrderStatusItem';
import "../components/OrderStatusItem/OrderStatuItem.scss"

export const editFieldRender = (data) => {
  return (
    <div className='item-editor-field'>
      <TextBox
        className={data ? `item-${data.name.toLowerCase().replace('| ', '').replace(/ /g, '-')}` : 'default'}
        readOnly
        text={data ? data.name : ''}
        hoverStateEnabled={false}
      />
    </div>
  );
};


export const statusItemRender = (data) => { return <OrderStatusItem text={data.name} /> };
