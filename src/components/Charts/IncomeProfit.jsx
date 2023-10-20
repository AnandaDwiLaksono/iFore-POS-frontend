import { ChartComponent, DateTime, Highlight, Inject, Legend, SeriesCollectionDirective, SeriesDirective, SplineAreaSeries, Tooltip } from '@syncfusion/ej2-react-charts'
import React from 'react'
import moment from 'moment';

import { useStateContext } from '../../contexts/ContextProvider';

const IncomeProfit = ({ dataIncome, dataProfit, date }) => {
  const { currentMode } = useStateContext();

  const areaPrimaryXAxis = {
    valueType: 'DateTime',
    labelFormat: 'dd/MM/yyyy',
    majorGridLines: { width: 0 },
    intervalType: 'Days',
    edgeLabelPlacement: 'Shift',
    labelStyle: { color: 'gray' },
    minimum: moment(date[0]).isSame(date[2]) ? new Date(moment().subtract(7, 'days')) : new Date(moment(date[0]).subtract(1, 'days')),
    maximum: new Date(moment(date[1]).add(2, 'days')),
  };
  
  const areaPrimaryYAxis = {
    labelFormat: 'Rp {value}',
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    majorGridLines: { dashArray: '5,5', color: currentMode === 'Dark' ? '#20232a' : '#ededed' },
    labelStyle: { color: 'gray' },
    title: 'Income & Profit',
    titleStyle: { color: currentMode === 'Dark' ? '#fff' : '#33373E' },
    minimum: 0,
    maximum: Math.max(...dataIncome.map(item => item.y)),
  };
  
  const areaCustomSeries = [
    {
      dataSource: dataIncome,
      xName: 'x',
      yName: 'y',
      name: 'Income',
      opacity: '0.2',
      type: 'SplineArea',
      width: '2',
      border: { width: 3, color: '#3acaeb' },
      fill: '#3acaeb',
    },
    {
      dataSource: dataProfit,
      xName: 'x',
      yName: 'y',
      name: 'Profit',
      opacity: '0.2',
      type: 'SplineArea',
      width: '2',
      border: { width: 3, color: '#4848b0' },
      fill: '#4848b0',
    }
  ];
  
  return (
    <ChartComponent
      id='area-chart'
      height='324px'
      width='100%'
      style={{ textAlign: "center" }}
      primaryXAxis={areaPrimaryXAxis}
      primaryYAxis={areaPrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true,  shared: true}}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ visible: true, enableHighlight: true, textStyle: { color: currentMode === 'Dark' ? '#fff' : '#33373e' } }}
    >
      <Inject services={[SplineAreaSeries, DateTime, Legend, Tooltip, Highlight]} />
      <SeriesCollectionDirective>
        {areaCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default IncomeProfit;
