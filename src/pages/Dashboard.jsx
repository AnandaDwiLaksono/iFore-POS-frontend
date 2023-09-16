import React, { useEffect, useState } from 'react';
import { IoCartSharp } from 'react-icons/io5';
import { FaMoneyBillWaveAlt, FaWallet } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useStateContext } from '../contexts/ContextProvider';
import { Card, CategoryPie, ErrorAnimation, ForecastingChart, IncomeProfit, LoadingAnimation } from '../components';
import { API_URL } from '../config/apiConfig';

const Dashboard = () => {
  const { numberFormat } = useStateContext();

  const [selectedDate, setSelectedDate] = useState([new Date(), new Date()]);

  const fetchDataCard = useMutation({
    mutationFn: (data) => {
      return axios.post(`${API_URL}/api/dashboard/card`, data);
    },
  });

  const fetchDataIncomeProfit = useQuery({
    queryKey: ['incomeProfit'],
    queryFn: () => {
      return axios.get(`${API_URL}/api/dashboard/income-profit`);
    },
  });

  const fetchDataCategory = useMutation({
    mutationFn: (data) => {
      return axios.post(`${API_URL}/api/dashboard/category`, data);
    },
  });

  const fetchDataPrediction = useQuery({
    queryKey: ['prediction'],
    queryFn: () => {
      return axios.get(`${API_URL}/api/dashboard/prediction`);
    },
  });

  useEffect(() => {
    if (selectedDate) {
      const data = {
        startDate: selectedDate[0],
        endDate: selectedDate[1],
      };

      fetchDataCard.mutate(data);
      fetchDataCategory.mutate(data);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  if (fetchDataCard.isLoading && fetchDataIncomeProfit.isLoading && fetchDataCategory.isLoading && fetchDataPrediction.isLoading) return (<LoadingAnimation />);

  if (fetchDataCard.isError && fetchDataIncomeProfit.isError && fetchDataCategory.isError && fetchDataPrediction.isError) return (<ErrorAnimation />);

  if (fetchDataCard.isLoading && fetchDataIncomeProfit.isLoading && fetchDataCategory.isLoading && fetchDataPrediction.isLoading) {
    console.log('Loading...');
  } else if (fetchDataCard.isError && fetchDataIncomeProfit.isError && fetchDataCategory.isError && fetchDataPrediction.isError) {
    console.log('Error...');
  }

  if (fetchDataCard.isSuccess && fetchDataIncomeProfit.isSuccess && fetchDataCategory.isSuccess && fetchDataPrediction.isSuccess) {
    const cardData = fetchDataCard.data.data.data;
    const incomeProfitData = fetchDataIncomeProfit.data.data.data;
    const categoryData1 = fetchDataCategory.data.data.data;
    const predictionData = fetchDataPrediction.data.data.data;

    const formattedDate = (date) => {
      const newDate = new Date(date);

      const day = String(newDate.getDate()).padStart(2, '0');
      const month = String(newDate.getMonth() + 1).padStart(2, '0');
      const year = newDate.getFullYear();

      return `${year}-${month}-${day}`;
    };

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
          <Card
            title='Transaction'
            value={cardData.transactionTotal}
            percentage={cardData.transactionTotalPercentage}
            icon={<IoCartSharp />}
          />
          <Card
            title='Income'
            value={`Rp${numberFormat.format(cardData.incomeTotal)}`}
            percentage={cardData.incomeTotalPercentage}
            icon={<FaMoneyBillWaveAlt />}
          />
          <Card
            title='Profit'
            value={`Rp${numberFormat.format(cardData.profitTotal)}`}
            percentage={cardData.profitTotalPercentage}
            icon={<FaWallet />}
          />
          <Card
            title='Best Selling Category'
            value={cardData.bestSellerCategory}
            icon={<BiCategory />}
          />
        </div>
        <div className='flex flex-wrap -ml-6 -mt-6 w-[calc(100%+24px)]'>
          <div className='pl-6 pt-6 w-full lg:w-3/5'>
            <div className='bg-white rounded-2xl shadow dark:bg-secondary-dark-bg'>
              <div className='p-4'>
                <div className='text-xl font-semibold text-[#344767] mb-4 dark:text-gray-300'>
                  Income & Profit Overview
                </div>
                <div className='w-full'>
                  <IncomeProfit
                    dataIncome={incomeProfitData.dataIncome}
                    dataProfit={incomeProfitData.dataProfit}
                    date={[formattedDate(selectedDate[0]), formattedDate(selectedDate[1]), formattedDate(new Date())]}
                  />
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
                  <CategoryPie data={categoryData1} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='text-3xl font-bold text-[#344767] w-full dark:text-gray-200'>
          Forecasting
        </div>
        <div className='flex flex-wrap -ml-6 -mt-6 w-[calc(100%+24px)] justify-center'>
          <ForecastingChart id='income-chart' data={[predictionData.incomeDataActual, predictionData.incomeDataForecasting]} label='RP {value}' title='Income' header='Income' />
          <ForecastingChart id='freebase-chart' data={[predictionData.freebaseDataActual, predictionData.freebaseDataForecasting]} label='{value}' header='Freebase' />
          <ForecastingChart id='saltnic-chart' data={[predictionData.saltnicDataActual, predictionData.saltnicDataForecasting]} label='{value}' header='Saltnic' />
          <ForecastingChart id='pod-chart' data={[predictionData.podDataActual, predictionData.podDataForecasting]} label='{value}' header='Pod' />
          <ForecastingChart id='mod-chart' data={[predictionData.modDataActual, predictionData.modDataForecasting]} label='{value}' header='Mod' />
          <ForecastingChart id='coil-chart' data={[predictionData.coilDataActual, predictionData.coilDataForecasting]} label='{value}' header='Coil' />
          <ForecastingChart id='accessories-chart' data={[predictionData.accessoriesDataActual, predictionData.accessoriesDataForecasting]} label='{value}' header='Accessories' />
        </div>
      </div>
    );
  };
};

export default Dashboard;
