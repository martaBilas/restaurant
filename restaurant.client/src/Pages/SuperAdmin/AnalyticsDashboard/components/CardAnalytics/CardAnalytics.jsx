import React from 'react';
import './CardAnalytics.scss';

export const CardAnalytics = ({
  title,
  contentClass,
  isLoading = false,
  children,
  additionalHeaderContent,
}) => (
  <div className={`card ${contentClass}`}>
    <div className='header'>
      {title && <div className='title pt-3 pb-3'>{title}</div>}
      {additionalHeaderContent}
    </div>
    {!isLoading && <div className='card-contents'>{children}</div>}
  </div>
);