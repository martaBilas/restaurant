import React from 'react';

import TextBox from 'devextreme-react/text-box';
import { OrderStatusItem } from '../components/OrderStatusItem/OrderStatusItem';

export const editFieldRender = (data) => (
  <div className='item-editor-field'>
    <TextBox
      className={data && `item-field item-${data.toLowerCase().replace('| ', '').replace(' ', '-')}`}
      inputAttr={{ class: 'item-editor-input' }}
      readOnly
      text={data}
      hoverStateEnabled={false}
    />
  </div>
);

export const statusItemRender = (data) => <OrderStatusItem text={data} />;
