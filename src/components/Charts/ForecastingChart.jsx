import { ChartComponent, DateTime, Highlight, Inject, LineSeries, SeriesCollectionDirective, SeriesDirective, Tooltip } from '@syncfusion/ej2-react-charts'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { useStateContext } from '../../contexts/ContextProvider';
import { ErrorAnimation, LoadingAnimation } from '../../components';

const ForecastingChart = ({ id, category }) => {
  const { currentMode } = useStateContext();

  const payload = [
    {
      category: 'total',
      parameter: {
        seed: 0,
        maxFeatures: 0,
        replacement: true,
        nEstimators: 25,
        selectionMethod: 'median'
      }
    },
    {
      category: 'Freebase',
      parameter: {
        seed: 0,
        maxFeatures: 0,
        replacement: false,
        nEstimators: 266,
        selectionMethod: 'median'
      }
    },
    {
      category: 'Saltnic',
      parameter: {
        seed: 0,
        maxFeatures: 5,
        replacement: true,
        nEstimators: 42,
        selectionMethod: 'median'
      }
    },
    {
      category: 'Pod',
      parameter: {
        seed: 1,
        maxFeatures: 4,
        replacement: false,
        nEstimators: 113,
        selectionMethod: 'median'
      }
    },
    {
      category: 'Mod',
      parameter: {
        seed: 0,
        maxFeatures: 6,
        replacement: false,
        nEstimators: 15,
        selectionMethod: 'mean'
      }
    },
    {
      category: 'Coil',
      parameter: {
        seed: 0,
        maxFeatures: 6,
        replacement: false,
        nEstimators: 87,
        selectionMethod: 'median'
      }
    },
    {
      category: 'Accessories',
      parameter: {
        seed: 0,
        maxFeatures: 3,
        replacement: false,
        nEstimators: 224,
        selectionMethod: 'median'
      }
    }
  ]

  const parameter = payload.find(item => item.category === category)

  const { data, isLoading, isSuccess, isError, refetch } = useQuery(
    ['forecasting', category],
    () => axios.post(`${process.env.REACT_APP_API_URL}/api/model-forecasting`, parameter),
    { enabled: category !== null }
  );

  if (isLoading) return <LoadingAnimation />;

  if (isError) return (
    <>
      <ErrorAnimation />
      <button
        onClick={() => refetch()}
        className='mt-5 text-red-500 font-semibold hover:underline focus:outline-none'
      >
        Try Again
      </button>
    </>
  );

  if (isSuccess) {
    console.log(data);

    const dataResult = [data?.data?.dataActual, data?.data?.prediction]

    const linePrimaryXAxis = {
      valueType: 'DateTime',
      labelFormat: 'dd/MM/yyyy',
      majorGridLines: { width: 0 },
      intervalType: 'Days',
      edgeLabelPlacement: 'Shift',
      labelStyle: { color: 'gray' },
      minimum: dataResult[0][0].x,
      maximum: dataResult[1][3].x,
    };
    
    const linePrimaryYAxis = {
      labelFormat: category === 'total' ? 'Rp {value}' : '{value}',
      lineStyle: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 },
      majorGridLines: { dashArray: '5,5', color: currentMode === 'Dark' ? '#20232a' : '#ededed' },
      labelStyle: { color: 'gray' },
      title: category === 'total' ? 'Income' : category,
      titleStyle: { color: currentMode === 'Dark' ? '#fff' : '#33373E' },
    };

    const lineCustomSeries = [
      {
        dataSource: dataResult[0],
        xName: 'x',
        yName: 'y',
        name: 'Actual',
        type: 'Line',
        width: '3',
        fill: '#603F8B',
        marker: { visible: true, width: 7, height: 7, shape: 'Diamond', fill: '#603F8B' }
      },
      {
        dataSource: dataResult[1],
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
              {category === 'total' ? 'Income' : category}
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
  }
};

export default ForecastingChart;
