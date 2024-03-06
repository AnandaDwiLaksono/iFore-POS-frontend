import { useCallback, useState } from 'react';
import { IoCartSharp } from 'react-icons/io5';
import { FaMoneyBillWaveAlt, FaWallet } from 'react-icons/fa';
import { BiCategory, BiFilterAlt } from 'react-icons/bi';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';

import { Card, CategoryPie, ForecastingChart, IncomeProfit } from '../components';

const Dashboard = () => {

  const [selectedDate, setSelectedDate] = useState([new Date(), new Date()]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const formattedDate = useCallback((date) => {
    const newDate = new Date(date);
  
    const day = String(newDate.getDate()).padStart(2, '0');
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const year = newDate.getFullYear();
  
    return `${year}-${month}-${day}`;
  }, []);

  const categories = ['Freebase', 'Saltnic', 'Pod', 'Mod', 'Coil', 'Accessories'];

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
          value='transactionTotal'
          percentage='transactionTotalPercentage'
          icon={<IoCartSharp />}
          selectedDate={selectedDate}
        />
        <Card
          title='Income'
          value='incomeTotal'
          percentage='incomeTotalPercentage'
          icon={<FaMoneyBillWaveAlt />}
          selectedDate={selectedDate}
        />
        <Card
          title='Profit'
          value='profitTotal'
          percentage='profitTotalPercentage'
          icon={<FaWallet />}
          selectedDate={selectedDate}
        />
        <Card
          title='Best Selling Category'
          value='bestSellerCategory'
          icon={<BiCategory />}
          selectedDate={selectedDate}
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
                  date={[formattedDate(selectedDate[0]), formattedDate(selectedDate[1]), formattedDate(new Date())]}
                  selectedCategory={selectedCategory}
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
                <CategoryPie selectedDate={selectedDate} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='text-3xl font-bold text-[#344767] w-full dark:text-gray-200'>
        Forecasting
      </div>
      <div className='flex flex-wrap -ml-6 -mt-6 w-[calc(100%+24px)] justify-center'>
        <ForecastingChart id='income-chart' category='total' />
        <ForecastingChart id='freebase-chart' category='Freebase' />
        <ForecastingChart id='saltnic-chart' category='Saltnic' />
        <ForecastingChart id='pod-chart' category='Pod' />
        <ForecastingChart id='mod-chart' category='Mod' />
        <ForecastingChart id='coil-chart' category='Coil' />
        <ForecastingChart id='accessories-chart' category='Accessories' />
      </div>
    </div>
  );
};

export default Dashboard;
