import React from 'react';
import './TickerCard.scss';

export const TickerCard = ({ title, icon, tone, value, formatValue = (value) => `${value}` }) => (
    <div className='ticker'>
      <div className={`icon-wrapper icon-wrapper--${tone}`}>
        <i className={`dx-icon dx-icon-${icon}`} />
      </div>
      <div className='middle'>
        <div className='title'>
          { title }
        </div>
        <div className='total'>
          {formatValue(value)}
        </div>
      </div>
    </div>
  );
  
  