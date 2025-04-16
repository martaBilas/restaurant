import React from 'react'
import { useState, useCallback, useEffect } from 'react';

import { formatNumber } from 'devextreme/localization';
import Toolbar from 'devextreme-react/toolbar';
import { Item } from 'devextreme-react/toolbar';
import Tabs from 'devextreme-react/tabs';
import { LoadPanel } from 'devextreme-react/load-panel';
import ScrollView from 'devextreme-react/scroll-view';
import { TickerCard } from './components/TickerCard/TickerCard';
import { OrderStatusAnalyticsCard } from './components/OrderStatusAnalyticsCard/OrderStatusAnalyticsCard';
import { RevenueCard } from './components/RevenueCard/RevenueCard';

import "./AnalyticsDashboard.scss"

import { ANALYTICS_PERIODS } from '../../../const/analytics.period.const';

export const AnalyticsDashboard = () => {
    const [tabIndex, setTabIndex] = useState(ANALYTICS_PERIODS["Today"].index);
    const [dateRange, setDateRange] = useState(ANALYTICS_PERIODS["Today"].period.split('/'));
    const [isLoading, setIsLoading] = useState(true);
    const items = Object.keys(ANALYTICS_PERIODS);
  
    const formatCurrency = (value) => formatNumber(value, { type: 'currency' });

    useEffect(() => {
        // Promise.all([
        //   getOpportunitiesByCategory(...dateRange).then((data) => {
        //     setOpportunities(data);
        //     setOpportunitiesTotal(calculateTotal(data));
        //   }),
        //   getSalesByCategory(...dateRange).then((data) => setSalesByCategory(data)),
        //   getSales(...dateRange).then((data) => {
        //     setSales(data);
        //     setSalesTotal(calculateTotal(data));
        //   }),
        //   getSalesByStateAndCity(...dateRange)
        //     .then((data) => calcSalesByState(data))
        //     .then((data) => setSalesByState(data)),
        // ])
        //   .then(() => setIsLoading(false))
        //   .catch((error) => console.log(error));
      }, [dateRange]);

      const onTabClick = useCallback((e) => {
        const { index, period } = ANALYTICS_PERIODS[e.addedItems[0]];
        setTabIndex(index);
        setDateRange(period.split('/'));
        setIsLoading(true);
      }, []);

      const dataSource=[
        {
            "name": "New",
            "value": 478
        },
        {
            "name": "Returned",
            "value": 424
        },
        {
            "name": "Preparing",
            "value": 185
        },
        {
            "name": "Out for delivery",
            "value": 333
        },
        {
          "name": "Canceled by customer",
          "value": 53
        },
        {
          "name": "Canceled by client",
          "value": 51
        },
        {
            "name": "Delivered",
            "value": 604
        }
    ];

    const salesDataSource=[
      {
          "date": "2020-01-18T00:00:00",
          "total": 6050
      },
      {
          "date": "2020-01-20T00:00:00",
          "total": 1050
      },
      {
          "date": "2020-01-22T00:00:00",
          "total": 13700
      },
      {
          "date": "2020-01-25T00:00:00",
          "total": 5050
      },
      {
          "date": "2020-01-27T00:00:00",
          "total": 3725
      },
      {
          "date": "2020-01-30T00:00:00",
          "total": 9500
      }
  ]

  return (
    <ScrollView className='view-wrapper-scroll'>
        <Toolbar>
            <Item location='before'>
                <span className='fs-5 ps-4 pe-3'>Dashboard</span>
            </Item>
            <Item location='before'>
                <Tabs
                scrollByContent
                showNavButtons={false}
                dataSource={items}
                selectedIndex={tabIndex}
                onSelectionChanged={onTabClick}
                />
          </Item>
        </Toolbar>
        <div className='cards compact ps-4 pe-4'>
          <TickerCard
            title="Total Orders Amount"
            icon='product'
            tone='warning'
            value={20}
          />
          <TickerCard
            title="Completed Orders Amount"
            icon='todo'
            tone="positive"
            value={18}
          />
          <TickerCard
            title="Canceled Orders Amount"
            icon='revert '
            tone="negative"
            value={2}
          />
          <TickerCard
            title="Total Orders Cost"
            icon='money'
            tone='info'
            value={20}
            formatValue={formatCurrency}
          />
        </div>
        <div className='cards wide ps-4 pe-4'>
          <OrderStatusAnalyticsCard datasource={dataSource}/>
          <RevenueCard datasource={salesDataSource}/>
        </div>
        <LoadPanel container='.content' visible={isLoading} position={{ of: '.layout-body' }} />
    </ScrollView>
  )
}