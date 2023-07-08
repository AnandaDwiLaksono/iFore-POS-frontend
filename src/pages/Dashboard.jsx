import React, { useState } from 'react';
import { IoCartSharp } from 'react-icons/io5';
import { FaMoneyBillWaveAlt, FaWallet } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import moment from 'moment';

import { useStateContext } from '../contexts/ContextProvider';
import { Card, CategoryPie, ForecastingChart, IncomeProfit } from '../components';
import { API_URL } from '../config/apiConfig';

const Dashboard = () => {
  const { numberFormat } = useStateContext();

  const [selectedDate, setSelectedDate] = useState([new Date(), new Date()]);

  const fetchDataTransaction = useQuery({
    queryKey: ['transaction'],
    queryFn: () => {
      return axios.get(`${API_URL}/api/transaction_histories`);
    },
  });

  const fetchDataCategory = useQuery({
    queryKey: ['category'],
    queryFn: () => {
      return axios.get(`${API_URL}/api/categories`);
    },
  });

  if (!fetchDataTransaction.isLoading && !fetchDataCategory.isLoading) {
    const transactionData = fetchDataTransaction.data.data.data;
    const categoryData = fetchDataCategory.data.data.data;

    const formattedDate = (date) => {
      const newDate = new Date(date);

      const day = String(newDate.getDate()).padStart(2, '0');
      const month = String(newDate.getMonth() + 1).padStart(2, '0');
      const year = newDate.getFullYear();

      return `${year}-${month}-${day}`;
    };
    
    const diffDays = moment(formattedDate(selectedDate[1])).diff(moment(formattedDate(selectedDate[0])), 'days') + 1;

    const transactionDataFiltered = transactionData.filter((item) => item.status === 'completed' && moment(formattedDate(item.createdAt)).isSameOrAfter(formattedDate(selectedDate[0])) && moment(formattedDate(item.createdAt)).isSameOrBefore(formattedDate(selectedDate[1])));

    const transactionDataFilteredBefore = transactionData.filter((item) => item.status === 'completed' && moment(formattedDate(item.createdAt)).isSameOrAfter(formattedDate(moment(selectedDate[0]).subtract(diffDays, 'days'))) && moment(formattedDate(item.createdAt)).isSameOrBefore(formattedDate(moment(selectedDate[1]).subtract(diffDays, 'days'))));

    const percentage = (value, total) => {
      const result = (((value - total) / total) * 100).toFixed(0);

      if (result === 'Infinity' || result === 'NaN') {
        return '';
      } else if (result > 0) {
        return `+${result}%`;
      } else {
        return `${result}%`;
      }
    };

    for (let i = 0; i < categoryData.length; i++) {
      let qtyTotal = 0;
      
      transactionDataFiltered.forEach((item) => {
        item.order_items.forEach((orderItem) => {
          if (orderItem.inventory.category.id === categoryData[i].id) {
            qtyTotal += orderItem.qty;
          };
        });
      });

      categoryData[i] = {...categoryData[i], qty: qtyTotal};
    };

    const dataChart = (args) => {
      let data = [];

      for (let i = -1; i < 8; i++) {
        const transactionDataFiltered = transactionData.filter((item) => item.status === 'completed' && moment(formattedDate(item.createdAt)).isSameOrAfter(formattedDate(moment().subtract(i, 'days'))) && moment(formattedDate(item.createdAt)).isSameOrBefore(formattedDate(moment().subtract(i, 'days'))));
  
        const total = transactionDataFiltered.reduce((acc, curr) => acc + curr[args], 0);
  
        data.push({ x: new Date(moment().subtract(i, 'days')), y: total });
      };

      return data;
    };

    const transactionTotal = transactionDataFiltered.length;

    const transactionTotalBefore = transactionDataFilteredBefore.length;

    const transactionTotalPercentage = percentage(transactionTotal, transactionTotalBefore);

    const incomeTotal = transactionDataFiltered.reduce((acc, curr) => acc + curr.total, 0);

    const incomeTotalBefore = transactionDataFilteredBefore.reduce((acc, curr) => acc + curr.total, 0);

    const incomeTotalPercentage = percentage(incomeTotal, incomeTotalBefore);

    const profitTotal = transactionDataFiltered.reduce((acc, curr) => acc + curr.total_profit, 0);

    const profitTotalBefore = transactionDataFilteredBefore.reduce((acc, curr) => acc + curr.total_profit, 0);

    const profitTotalPercentage = percentage(profitTotal, profitTotalBefore);

    const bestSellerCategory = categoryData.sort((a, b) => b.qty - a.qty)[0];

    const incomeDataActual = dataChart('total').slice(1, 6).reverse().map((item) => item.y);

    console.log(incomeDataActual);
    // console.log(new Date(moment().subtract(1, 'days')));

    const incomeDatas = [
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
        { x: new Date(2023, 2, 12), y: 1000 },
        { x: new Date(2023, 2, 13), y: 1300 },
        { x: new Date(2023, 2, 14), y: 1100 },
        { x: new Date(2023, 2, 15), y: 1300 },
      ]
    ];

    const categoriesData = [
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
        { x: new Date(2023, 2, 12), y: 20 },
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
              onChange={(e) => e.value ? setSelectedDate(e.value) : setSelectedDate([new Date(), new Date()])}
            />
          </div>
        </div>
        <div className='box-border flex flex-wrap -mt-6 -ml-6 w-[calc(100%+24px)]'>
          <Card title='Transaction' value={transactionTotal} percentage={transactionTotalPercentage} icon={<IoCartSharp />} />
          <Card title='Income' value={`Rp${numberFormat.format(incomeTotal)}`} percentage={incomeTotalPercentage} icon={<FaMoneyBillWaveAlt />} />
          <Card title='Profit' value={`Rp${numberFormat.format(profitTotal)}`} percentage={profitTotalPercentage} icon={<FaWallet />} />
          <Card title='Best Selling Category' value={bestSellerCategory.name} icon={<BiCategory />} />
        </div>
        <div className='flex flex-wrap -ml-6 -mt-6 w-[calc(100%+24px)]'>
          <div className='pl-6 pt-6 w-full lg:w-3/5'>
            <div className='bg-white rounded-2xl shadow dark:bg-secondary-dark-bg'>
              <div className='p-4'>
                <div className='text-xl font-semibold text-[#344767] mb-4 dark:text-gray-300'>
                  Income & Profit Overview
                </div>
                <div className='w-full'>
                  <IncomeProfit dataIncome={dataChart('total')} dataProfit={dataChart('total_profit')} />
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
                  <CategoryPie data={categoryData} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='text-3xl font-bold text-[#344767] w-full dark:text-gray-200'>
          Forecasting
        </div>
        <div className='flex flex-wrap -ml-6 -mt-6 w-[calc(100%+24px)] justify-center'>
          <ForecastingChart id='income-chart' data={incomeDatas} label='RP {value}' title='Income' header='Income' />
          <ForecastingChart id='freebase-chart' data={categoriesData} label='{value}' header='Freebase' />
          <ForecastingChart id='saltnic-chart' data={categoriesData} label='{value}' header='Saltnic' />
          <ForecastingChart id='pod-chart' data={categoriesData} label='{value}' header='Pod' />
          <ForecastingChart id='mod-chart' data={categoriesData} label='{value}' header='Mod' />
          <ForecastingChart id='coil-chart' data={categoriesData} label='{value}' header='Coil' />
          <ForecastingChart id='accessories-chart' data={categoriesData} label='{value}' header='Accessories' />
        </div>
      </div>
    );
  };
};

export default Dashboard;
