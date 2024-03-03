import React, { useCallback, useEffect, useState } from 'react';
import { IoCartSharp } from 'react-icons/io5';
import { FaMoneyBillWaveAlt, FaWallet } from 'react-icons/fa';
import { BiCategory, BiFilterAlt } from 'react-icons/bi';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';

import { useStateContext } from '../contexts/ContextProvider';
import { Card, CategoryPie, ErrorAnimation, ForecastingChart, IncomeProfit, LoadingAnimation } from '../components';

const Dashboard = () => {
  const { numberFormat } = useStateContext();

  const [selectedDate, setSelectedDate] = useState([new Date(), new Date()]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [predictionDatas, setPredictionDatas] = useState([]);
  const [actualDatas, setActualDatas] = useState([]);

  const { data: dataCard, isLoading: cardLoading, isError: cardError, refetch: refetchCard } = useQuery(
    ['card', selectedDate],
    () => axios.post(`${process.env.REACT_APP_API_URL}/api/dashboard/card`, { startDate: selectedDate[0], endDate: selectedDate[1] }),
    { enabled: selectedDate !== null }
  );
  
  const { data: dataIncomeProfit, isLoading: incomeProfitLoading, isError: incomeProfitError, refetch: refetchIncomeProfit } = useQuery(
    ['incomeProfit', selectedCategory],
    () => axios.post(`${process.env.REACT_APP_API_URL}/api/dashboard/income-profit`, { categories: selectedCategory }),
    { enabled: selectedCategory !== null }
  );
  
  const { data: dataCategory, isLoading: categoryLoading, isError: categoryError, refetch: refetchCategory } = useQuery(
    ['category', selectedDate],
    () => axios.post(`${process.env.REACT_APP_API_URL}/api/dashboard/category`, { startDate: selectedDate[0], endDate: selectedDate[1] }),
    { enabled: selectedDate !== null }
  );
  
  const { data: dataPrediction, isLoading: predictionLoading, isError: predictionError, refetch:refetchPrediction } = useQuery(
    ['prediction'],
    () => axios.get(`${process.env.REACT_APP_API_URL}/api/dashboard/prediction`),
    { enabled: true }
  );

  const dataPredictions = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/model-forecasting`, data);
      
      return [response.data, data.category];
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    }
  });
  
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
        nEstimators: 103,
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
        maxFeatures: 5,
        replacement: false,
        nEstimators: 57,
        selectionMethod: 'median'
      }
    },
    {
      category: 'Accessories',
      parameter: {
        seed: 0,
        maxFeatures: 3,
        replacement: false,
        nEstimators: 217,
        selectionMethod: 'median'
      }
    }
  ]

  const formattedDate = useCallback((date) => {
    const newDate = new Date(date);
  
    const day = String(newDate.getDate()).padStart(2, '0');
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const year = newDate.getFullYear();
  
    return `${year}-${month}-${day}`;
  }, []);

  useEffect(() => {
    if (selectedDate) {
      refetchCard();
      refetchCategory();
    }
  
    if (selectedCategory) {
      refetchIncomeProfit();
    }

    if (!dataPrediction) {
      refetchPrediction();
    }

    dataPredictions.mutate(payload[0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, selectedCategory, refetchCard, refetchCategory, refetchIncomeProfit, refetchPrediction, dataPrediction]);

  if (cardLoading || incomeProfitLoading || categoryLoading || predictionLoading) return (<LoadingAnimation />);

  if (cardError || incomeProfitError || categoryError || predictionError) return (<ErrorAnimation />);

  if (dataCard && dataIncomeProfit && dataCategory && dataPrediction) {
    const cardData = dataCard.data.data;
    const incomeProfitData = dataIncomeProfit.data.data;
    const categoryData = dataCategory.data.data;
    const predictionData = dataPrediction.data.data;

    console.log(predictionData);
    console.log(incomeProfitData);
    console.log(categoryData);
    console.log(cardData);

    const categories = categoryData.map(item => item.name);

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
                <div className='flex justify-between items-center flex-wrap'>
                  <div className='text-xl font-semibold text-[#344767] mb-4 dark:text-gray-300'>
                    Income & Profit Overview
                  </div>
                  <div className='sm:w-1/3 w-4/5 flex text-2xl gap-2 text-black text-opacity-50 dark:text-gray-300'>
                    <BiFilterAlt />
                    <MultiSelectComponent
                      id="mtselement"
                      dataSource={categories}
                      placeholder="Filter category"
                      onChange={(e) => setSelectedCategory(e.value)}
                    />
                  </div>
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
