import { ChartComponent, DateTime, Highlight, Inject, Legend, SeriesCollectionDirective, SeriesDirective, SplineAreaSeries, Tooltip } from '@syncfusion/ej2-react-charts'
import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider';

const IncomeProfit = () => {
  const { currentMode } = useStateContext();

  const areaPrimaryXAxis = {
    valueType: 'DateTime',
    labelFormat: 'dd/MM/yyyy',
    majorGridLines: { width: 0 },
    intervalType: 'Days',
    edgeLabelPlacement: 'Shift',
    labelStyle: { color: 'gray' },
  };
  
  const areaPrimaryYAxis = {
    labelFormat: 'Rp {value}',
    lineStyle: { width: 0 },
    interval: 500,
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    majorGridLines: { dashArray: '5,5', color: currentMode === 'Dark' ? '#20232a' : '#ededed' },
    labelStyle: { color: 'gray' },
    title: 'Income & Profit (in Thousand)',
    titleStyle: { color: currentMode === 'Dark' ? '#fff' : '#33373E' },
  };

  const areaChartData = [
    [
      { x: new Date(2023, 2, 6), y: 2200 },
      { x: new Date(2023, 2, 7), y: 3400 },
      { x: new Date(2023, 2, 8), y: 2800 },
      { x: new Date(2023, 2, 9), y: 1600 },
      { x: new Date(2023, 2, 10), y: 2300 },
      { x: new Date(2023, 2, 11), y: 2500 },
      { x: new Date(2023, 2, 12), y: 2900 },
      { x: new Date(2023, 2, 13), y: 3800 },
      { x: new Date(2023, 2, 14), y: 1400 },
      { x: new Date(2023, 2, 15), y: 3100 },
    ],
    [
      { x: new Date(2023, 2, 6), y: 1200},
      { x: new Date(2023, 2, 7), y: 1300},
      { x: new Date(2023, 2, 8), y: 1200},
      { x: new Date(2023, 2, 9), y: 1100},
      { x: new Date(2023, 2, 10), y: 1200},
      { x: new Date(2023, 2, 11), y: 1200},
      { x: new Date(2023, 2, 12), y: 1200},
      { x: new Date(2023, 2, 13), y: 1300},
      { x: new Date(2023, 2, 14), y: 1100},
      { x: new Date(2023, 2, 15), y: 1300},
    ]
  ];
  
  const areaCustomSeries = [
    {
      dataSource: areaChartData[0],
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
      dataSource: areaChartData[1],
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
  )
}

export default IncomeProfit