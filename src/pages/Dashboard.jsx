import React from 'react';
import { IoCartSharp } from 'react-icons/io5';
import { FaMoneyBillWaveAlt, FaWallet } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';

import { useStateContext } from '../contexts/ContextProvider';
import { CategoryPie, ForecastingChart, IncomeProfit } from '../components';

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
        <div className='pl-6 pt-6 basis-full max-w-full sm:basis-1/2 sm:max-w-[50%] lg:basis-1/4 lg:max-w-[25%]'>
          <div className='bg-white rounded-2xl shadow dark:bg-secondary-dark-bg'>
            <div className='p-4 flex w-full items-center'>
              <div className='w-2/3'>
                <p className='text-sm font-bold text-[#67748e] dark:text-gray-300'>
                  Transaction
                </p>
                <span className='text-[#344767] text-xl font-bold dark:text-white'>
                  {numberFormat.format(23)}
                </span>
                <span className='text-[#ea0606] text-sm font-bold ml-1'>
                  -2%
                </span>
              </div>
              <div className='w-1/3'>
                <div className='w-12 h-12 flex justify-center items-center bg-[#03C9D7] ml-auto rounded-lg text-white shadow-md text-xl'>
                  <IoCartSharp />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='pl-6 pt-6 basis-full max-w-full sm:basis-1/2 sm:max-w-[50%] lg:basis-1/4 lg:max-w-[25%]'>
          <div className='bg-white rounded-2xl shadow dark:bg-secondary-dark-bg'>
            <div className='p-4 flex w-full items-center'>
              <div className='w-2/3'>
                <p className='text-sm font-bold text-[#67748e] dark:text-gray-300'>
                  Income
                </p>
                <span className='text-[#344767] text-xl font-bold dark:text-white '>
                  Rp{numberFormat.format(1034300)}
                </span>
                <span className='text-[#82d616] text-sm font-bold ml-1'>
                  +3%
                </span>
              </div>
              <div className='w-1/3'>
                <div className='w-12 h-12 flex justify-center items-center bg-[#03C9D7] ml-auto rounded-lg text-white shadow-md text-xl'>
                  <FaMoneyBillWaveAlt />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='pl-6 pt-6 basis-full max-w-full sm:basis-1/2 sm:max-w-[50%] lg:basis-1/4 lg:max-w-[25%]'>
          <div className='bg-white rounded-2xl shadow dark:bg-secondary-dark-bg'>
            <div className='p-4 flex w-full items-center'>
              <div className='w-2/3'>
                <p className='text-sm font-bold text-[#67748e] dark:text-gray-300'>
                  Profit
                </p>
                <span className='text-[#344767] text-xl font-bold dark:text-white'>
                  Rp{numberFormat.format(530000)}
                </span>
                <span className='text-[#82d616] text-sm font-bold ml-1'>
                  +5%
                </span>
              </div>
              <div className='w-1/3'>
                <div className='w-12 h-12 flex justify-center items-center bg-[#03C9D7] ml-auto rounded-lg text-white shadow-md text-xl'>
                  <FaWallet />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='pl-6 pt-6 basis-full max-w-full sm:basis-1/2 sm:max-w-[50%] lg:basis-1/4 lg:max-w-[25%]'>
          <div className='bg-white rounded-2xl shadow dark:bg-secondary-dark-bg'>
            <div className='p-4 flex w-full items-center'>
              <div className='w-2/3'>
                <p className='text-sm font-bold text-[#67748e] dark:text-gray-300'>
                  Best Selling Category
                </p>
                <span className='text-[#344767] text-xl font-bold dark:text-white'>
                  Saltnic
                </span>
              </div>
              <div className='w-1/3'>
                <div className='w-12 h-12 flex justify-center items-center bg-[#03C9D7] ml-auto rounded-lg text-white shadow-md text-xl'>
                  <BiCategory />
                </div>
              </div>
            </div>
          </div>
        </div>
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
        <div className='pl-6 pt-6 w-full lg:w-1/2'>
          <div className='bg-white rounded-2xl shadow dark:bg-secondary-dark-bg'>
            <div className='p-4'>
              <div className='text-xl font-semibold text-[#344767] mb-4 dark:text-gray-300'>
                Income
              </div>
              <div className='w-full'>
                <ForecastingChart id='income-chart' data={incomeData} label='RP {value}' title='Income (in Thousand)' />
              </div>
            </div>
          </div>
        </div>
        <div className='pl-6 pt-6 w-full lg:w-1/2'>
          <div className='bg-white rounded-2xl shadow dark:bg-secondary-dark-bg'>
            <div className='p-4'>
              <div className='text-xl font-semibold text-[#344767] mb-4 dark:text-gray-300'>
                Freebase
              </div>
              <div className='w-full'>
                <ForecastingChart id='freebas-chart' data={categoryData} label='{value}' />
              </div>
            </div>
          </div>
        </div>
        <div className='pl-6 pt-6 w-full lg:w-1/2'>
          <div className='bg-white rounded-2xl shadow dark:bg-secondary-dark-bg'>
            <div className='p-4'>
              <div className='text-xl font-semibold text-[#344767] mb-4 dark:text-gray-300'>
                Saltnic
              </div>
              <div className='w-full'>
                <ForecastingChart id='saltnic-chart' data={categoryData} label='{value}' />
              </div>
            </div>
          </div>
        </div>
        <div className='pl-6 pt-6 w-full lg:w-1/2'>
          <div className='bg-white rounded-2xl shadow dark:bg-secondary-dark-bg'>
            <div className='p-4'>
              <div className='text-xl font-semibold text-[#344767] mb-4 dark:text-gray-300'>
                Pod
              </div>
              <div className='w-full'>
                <ForecastingChart id='pod-chart' data={categoryData} label='{value}' />
              </div>
            </div>
          </div>
        </div>
        <div className='pl-6 pt-6 w-full lg:w-1/2'>
          <div className='bg-white rounded-2xl shadow dark:bg-secondary-dark-bg'>
            <div className='p-4'>
              <div className='text-xl font-semibold text-[#344767] mb-4 dark:text-gray-300'>
                Mod
              </div>
              <div className='w-full'>
                <ForecastingChart id='mod-chart' data={categoryData} label='{value}' />
              </div>
            </div>
          </div>
        </div>
        <div className='pl-6 pt-6 w-full lg:w-1/2'>
          <div className='bg-white rounded-2xl shadow dark:bg-secondary-dark-bg'>
            <div className='p-4'>
              <div className='text-xl font-semibold text-[#344767] mb-4 dark:text-gray-300'>
                Coil
              </div>
              <div className='w-full'>
                <ForecastingChart id='coil-chart' data={categoryData} label='{value}' />
              </div>
            </div>
          </div>
        </div>
        <div className='pl-6 pt-6 w-full lg:w-1/2'>
          <div className='bg-white rounded-2xl shadow dark:bg-secondary-dark-bg'>
            <div className='p-4'>
              <div className='text-xl font-semibold text-[#344767] mb-4 dark:text-gray-300'>
                Accessories
              </div>
              <div className='w-full'>
                <ForecastingChart id='accessories-chart' data={categoryData} label='{value}' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
