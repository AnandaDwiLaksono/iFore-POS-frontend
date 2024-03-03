import { ChartComponent, DateTime, Highlight, Inject, LineSeries, SeriesCollectionDirective, SeriesDirective, Tooltip } from '@syncfusion/ej2-react-charts'
import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider';

const ForecastingChart = ({ id, data, label, title, header }) => {
  const { currentMode } = useStateContext();

  const linePrimaryXAxis = {
    valueType: 'DateTime',
    labelFormat: 'dd/MM/yyyy',
    majorGridLines: { width: 0 },
    intervalType: 'Days',
    edgeLabelPlacement: 'Shift',
    labelStyle: { color: 'gray' },
    minimum: data[0][0].x,
    maximum: data[1][3].x,
  };
  
  const linePrimaryYAxis = {
    labelFormat: label,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    majorGridLines: { dashArray: '5,5', color: currentMode === 'Dark' ? '#20232a' : '#ededed' },
    labelStyle: { color: 'gray' },
    title: title,
    titleStyle: { color: currentMode === 'Dark' ? '#fff' : '#33373E' },
  };

  const lineCustomSeries = [
    {
      dataSource: data[0],
      xName: 'x',
      yName: 'y',
      name: 'Actual',
      type: 'Line',
      width: '3',
      fill: '#603F8B',
      marker: { visible: true, width: 7, height: 7, shape: 'Diamond', fill: '#603F8B' }
    },
    {
      dataSource: data[1],
      xName: 'x',
      yName: 'y',
      name: 'Forecasting',
      type: 'Line',
      width: '3',
      fill: '#FD49A0',
      marker: { visible: true, width: 7, height: 7, shape: 'Diamond', fill: '#FD49A0' },
      dashArray: '10'
    }
  ];
  
  return (
    <div className='pl-6 pt-6 w-full lg:w-1/2'>
      <div className='bg-white rounded-2xl shadow dark:bg-secondary-dark-bg'>
        <div className='p-4'>
          <div className='text-xl font-semibold text-[#344767] mb-4 dark:text-gray-300'>
            {header}
          </div>
          <div className='w-full'>
            <ChartComponent
              id={id}
              primaryXAxis={linePrimaryXAxis}
              primaryYAxis={linePrimaryYAxis}
              width="100%"
              height="324px"
              chartArea={{ border: { width: 0 } }}
              tooltip={{ enable: true, shared: true }}
              legendSettings={{ enableHighlight: true}}
            >
              <Inject services={[LineSeries, DateTime, Tooltip, Highlight]} />
              <SeriesCollectionDirective>
                {lineCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
              </SeriesCollectionDirective>
            </ChartComponent>
          </div>  
        </div>
      </div>
    </div>
  );
};

export default ForecastingChart;
