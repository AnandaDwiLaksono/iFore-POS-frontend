import React from 'react';
import { IoCartSharp } from 'react-icons/io5';
import { FaMoneyBillWaveAlt, FaWallet } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';

import { useStateContext } from '../contexts/ContextProvider';
import { Card, CategoryPie, ForecastingChart, IncomeProfit } from '../components';

const Dashboard = () => {
  const { numberFormat } = useStateContext();

  const incomeData = [
    [
      { x: new Date(2023, 2, 6), y: 2200 },
      { x: new Date(2023, 2, 7), y: 3400 },
      { x: new Date(2023, 2, 8), y: 2800 },
      { x: new Date(2023, 2, 9), y: 1600 },
      { x: new Date(2023, 2, 10), y: 2300 },
      { x: new Date(2023, 2, 11), y: 1200 },
      { x: new Date(2023, 2, 12), y: 1200 },
    ],
    [
      { x: new Date(2023, 2, 12), y: 1200 },
      { x: new Date(2023, 2, 13), y: 1300 },
      { x: new Date(2023, 2, 14), y: 1100 },
      { x: new Date(2023, 2, 15), y: 1300 },
    ]
  ];

  const categoryData = [
    [
      { x: new Date(2023, 2, 6), y: 22 },
      { x: new Date(2023, 2, 7), y: 34 },
      { x: new Date(2023, 2, 8), y: 28 },
      { x: new Date(2023, 2, 9), y: 16 },
      { x: new Date(2023, 2, 10), y: 23 },
      { x: new Date(2023, 2, 11), y: 12 },
      { x: new Date(2023, 2, 12), y: 12 },
    ],
    [
      { x: new Date(2023, 2, 12), y: 12 },
      { x: new Date(2023, 2, 13), y: 13 },
      { x: new Date(2023, 2, 14), y: 11 },
      { x: new Date(2023, 2, 15), y: 13 },
    ]
  ];

  return (
    <div className='flex flex-col px-11 py-6 gap-6'>
      <div className='flex flex-wrap justify-between'>
        <div className='text-3xl font-bold text-[#344767] dark:text-gray-200 w-full sm:w-auto'>
          Dashboard
        </div>
        <div className='flex justify-end w-full sm:w-auto'>
          <DateRangePickerComponent
            placeholder={new Date().toLocaleDateString()}
            max={new Date()}
            format='dd/MM/yyyy'
          />
        </div>
      </div>
      <div className='box-border flex flex-wrap -mt-6 -ml-6 w-[calc(100%+24px)]'>
        <Card title='Transaction' value={numberFormat.format(23)} percentage='-2%' icon={<IoCartSharp />} />
        <Card title='Income' value={`Rp${numberFormat.format(1034300)}`} percentage='+3%' icon={<FaMoneyBillWaveAlt />} />
        <Card title='Profit' value={`Rp${numberFormat.format(530000)}`} percentage='+5%' icon={<FaWallet />} />
        <Card title='Best Selling Category' value='Saltnic' icon={<BiCategory />} />
      </div>
      <div className='flex flex-wrap -ml-6 -mt-6 w-[calc(100%+24px)]'>
        <div className='pl-6 pt-6 w-full lg:w-3/5'>
          <div className='bg-white rounded-2xl shadow dark:bg-secondary-dark-bg'>
            <div className='p-4'>
              <div className='text-xl font-semibold text-[#344767] mb-4 dark:text-gray-300'>
                Income & Profit Overview
              </div>
              <div className='w-full'>
                <IncomeProfit />
              </div>
            </div>
          </div>
        </div>
        <div className='pl-6 pt-6 w-full lg:w-2/5'>
          <div className='bg-white rounded-2xl shadow dark:bg-secondary-dark-bg'>
            <div className='p-4'>
              <div className='text-xl font-semibold text-[#344767] mb-4 dark:text-gray-300'>
                Sales by Category
              </div>
              <div className='w-full'>
                <CategoryPie />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap justify-between'>
        <div className='text-3xl font-bold text-[#344767] w-full sm:w-auto dark:text-gray-200'>
          Forecasting
        </div>
        <div className='flex justify-end w-full sm:w-auto'>
          <DateRangePickerComponent
            placeholder={new Date().toLocaleDateString()}
            max={new Date()}
            format='dd/MM/yyyy'
          />
        </div>
      </div>
      <div className='flex flex-wrap -ml-6 -mt-6 w-[calc(100%+24px)] justify-center'>
        <ForecastingChart id='income-chart' data={incomeData} label='RP {value}' title='Income (in Thousand)' header='Income' />
        <ForecastingChart id='freebase-chart' data={categoryData} label='{value}' header='Freebase' />
        <ForecastingChart id='saltnic-chart' data={categoryData} label='{value}' header='Saltnic' />
        <ForecastingChart id='pod-chart' data={categoryData} label='{value}' header='Pod' />
        <ForecastingChart id='mod-chart' data={categoryData} label='{value}' header='Mod' />
        <ForecastingChart id='coil-chart' data={categoryData} label='{value}' header='Coil' />
        <ForecastingChart id='accessories-chart' data={categoryData} label='{value}' header='Accessories' />
      </div>
    </div>
  );
};

export default Dashboard;
