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

    const randomForest = (data, variable) => {
      axios.post(`${API_URL}/api/predictions/randomforest`, data)
        .then((res) => {
          localStorage.setItem(variable, JSON.stringify(res.data.data));
        }
      );
    };

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
      };
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

    const dataTimeSeries = (args) => {
      let data = [];
      const days = moment().diff(moment('2023-07-09'), 'days') + 1;

      for (let i = -1; i < days; i++) {
        const transactionDataFiltered = transactionData.filter((item) => item.status === 'completed' && moment(formattedDate(item.createdAt)).isSameOrAfter(formattedDate(moment().subtract(i, 'days'))) && moment(formattedDate(item.createdAt)).isSameOrBefore(formattedDate(moment().subtract(i, 'days'))));
  
        const total = transactionDataFiltered.reduce((acc, curr) => acc + curr[args], 0);
  
        data.push({ x: new Date(moment().subtract(i, 'days')), y: total });
      };

      return data;
    };

    const dataCategoryTimeSeries = (args) => {
      let data = [];
      const days = moment().diff(moment('2023-07-09'), 'days') + 1;
      
      for (let i = -1; i < days; i++) {
        const transactionDataFiltered = transactionData.filter((item) => item.status === 'completed' && moment(formattedDate(item.createdAt)).isSameOrAfter(formattedDate(moment().subtract(i, 'days'))) && moment(formattedDate(item.createdAt)).isSameOrBefore(formattedDate(moment().subtract(i, 'days'))));
        
        let total = 0;
      
        transactionDataFiltered.forEach((item) => {
          item.order_items.forEach((orderItem) => {
            if (orderItem.inventory.category.name === args) {
              total += orderItem.qty;
            };
          });
        });
  
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

    const incomeDataActual = dataTimeSeries('total').slice(1,9).reverse();
    const incomeDataForecasting = [
      { x: new Date(moment()), y: 2000000 },
      { x: new Date(moment().add(1, 'days')), y: 2000000 },
      { x: new Date(moment().add(2, 'days')), y: 2000000 },
    ];
    const dataIncomeTrain = dataTimeSeries('total').slice(2).reverse().map((item) => item.y);
    randomForest({ salesData: dataIncomeTrain }, 'dataIncomeForecasting');
    const dataIncomeForecasting = JSON.parse(localStorage.getItem('dataIncomeForecasting'));
    if (dataIncomeForecasting) {
      for (let i = 0; i < 3; i++) {
        incomeDataForecasting[i].y = dataIncomeForecasting[i];
      }
    }

    const freebaseDataActual = dataCategoryTimeSeries('Freebase').slice(1,9).reverse();
    const freebaseDataForecasting = [
      { x: new Date(moment()), y: 2 },
      { x: new Date(moment().add(1, 'days')), y: 2 },
      { x: new Date(moment().add(2, 'days')), y: 2 },
    ];
    const dataFreebaseTrain = dataCategoryTimeSeries('Freebase').slice(2).reverse().map((item) => item.y);
    randomForest({ salesData: dataFreebaseTrain }, 'dataFreebaseForecasting');
    const dataFreebaseForecasting = JSON.parse(localStorage.getItem('dataFreebaseForecasting'));
    if (dataFreebaseForecasting) {
      for (let i = 0; i < 3; i++) {
        freebaseDataForecasting[i].y = dataFreebaseForecasting[i];
      }
    }

    const saltnicDataActual = dataCategoryTimeSeries('Saltnic').slice(1,9).reverse();
    const saltnicDataForecasting = [
      { x: new Date(moment()), y: 2 },
      { x: new Date(moment().add(1, 'days')), y: 2 },
      { x: new Date(moment().add(2, 'days')), y: 2 },
    ];
    const dataSaltnicTrain = dataCategoryTimeSeries('Saltnic').slice(2).reverse().map((item) => item.y);
    randomForest({ salesData: dataSaltnicTrain }, 'dataSaltnicForecasting');
    const dataSaltnicForecasting = JSON.parse(localStorage.getItem('dataSaltnicForecasting'));
    if (dataSaltnicForecasting) {
      for (let i = 0; i < 3; i++) {
        saltnicDataForecasting[i].y = dataSaltnicForecasting[i];
      }
    }

    const podDataActual = dataCategoryTimeSeries('Pod').slice(1,9).reverse();
    const podDataForecasting = [
      { x: new Date(moment()), y: 2 },
      { x: new Date(moment().add(1, 'days')), y: 2 },
      { x: new Date(moment().add(2, 'days')), y: 2 },
    ];
    const dataPodTrain = dataCategoryTimeSeries('Pod').slice(2).reverse().map((item) => item.y);
    randomForest({ salesData: dataPodTrain }, 'dataPodForecasting');
    const dataPodForecasting = JSON.parse(localStorage.getItem('dataPodForecasting'));
    if (dataPodForecasting) {
      for (let i = 0; i < 3; i++) {
        podDataForecasting[i].y = dataPodForecasting[i];
      }
    }

    const modDataActual = dataCategoryTimeSeries('Mod').slice(1,9).reverse();
    const modDataForecasting = [
      { x: new Date(moment()), y: 2 },
      { x: new Date(moment().add(1, 'days')), y: 2 },
      { x: new Date(moment().add(2, 'days')), y: 2 },
    ];
    const dataModTrain = dataCategoryTimeSeries('Mod').slice(2).reverse().map((item) => item.y);
    randomForest({ salesData: dataModTrain }, 'dataModForecasting');
    const dataModForecasting = JSON.parse(localStorage.getItem('dataModForecasting'));
    if (dataModForecasting) {
      for (let i = 0; i < 3; i++) {
        modDataForecasting[i].y = dataModForecasting[i];
      }
    }

    const coilDataActual = dataCategoryTimeSeries('Coil').slice(1,9).reverse();
    const coilDataForecasting = [
      { x: new Date(moment()), y: 2 },
      { x: new Date(moment().add(1, 'days')), y: 2 },
      { x: new Date(moment().add(2, 'days')), y: 2 },
    ];
    const dataCoilTrain = dataCategoryTimeSeries('Coil').slice(2).reverse().map((item) => item.y);
    randomForest({ salesData: dataCoilTrain }, 'dataCoilForecasting');
    const dataCoilForecasting = JSON.parse(localStorage.getItem('dataCoilForecasting'));
    if (dataCoilForecasting) {
      for (let i = 0; i < 3; i++) {
        coilDataForecasting[i].y = dataCoilForecasting[i];
      }
    }

    const accessoriesDataActual = dataCategoryTimeSeries('Accessories').slice(1,9).reverse();
    const accessoriesDataForecasting = [
      { x: new Date(moment()), y: 2 },
      { x: new Date(moment().add(1, 'days')), y: 2 },
      { x: new Date(moment().add(2, 'days')), y: 2 },
    ];
    const dataAccessoriesTrain = dataCategoryTimeSeries('Accessories').slice(2).reverse().map((item) => item.y);
    randomForest({ salesData: dataAccessoriesTrain }, 'dataAccessoriesForecasting');
    const dataAccessoriesForecasting = JSON.parse(localStorage.getItem('dataAccessoriesForecasting'));
    if (dataAccessoriesForecasting) {
      for (let i = 0; i < 3; i++) {
        accessoriesDataForecasting[i].y = dataAccessoriesForecasting[i];
      }
    }

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
                  <IncomeProfit dataIncome={dataTimeSeries('total')} dataProfit={dataTimeSeries('total_profit')} date={[formattedDate(selectedDate[0]), formattedDate(selectedDate[1]), formattedDate(new Date())]} />
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
          <ForecastingChart id='income-chart' data={[incomeDataActual, incomeDataForecasting]} label='RP {value}' title='Income' header='Income' interval={500000} />
          <ForecastingChart id='freebase-chart' data={[freebaseDataActual, freebaseDataForecasting]} label='{value}' header='Freebase' interval={2} />
          <ForecastingChart id='saltnic-chart' data={[saltnicDataActual, saltnicDataForecasting]} label='{value}' header='Saltnic' interval={2} />
          <ForecastingChart id='pod-chart' data={[podDataActual, podDataForecasting]} label='{value}' header='Pod' interval={2} />
          <ForecastingChart id='mod-chart' data={[modDataActual, modDataForecasting]} label='{value}' header='Mod' interval={2} />
          <ForecastingChart id='coil-chart' data={[coilDataActual, coilDataForecasting]} label='{value}' header='Coil' interval={2} />
          <ForecastingChart id='accessories-chart' data={[accessoriesDataActual, accessoriesDataForecasting]} label='{value}' header='Accessories' interval={2} />
        </div>
      </div>
    );
  };
};

export default Dashboard;
