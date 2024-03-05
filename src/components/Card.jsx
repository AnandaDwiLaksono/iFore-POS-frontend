import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';

import { useStateContext } from '../contexts/ContextProvider';
import { LoadingAnimation, ErrorAnimation } from '../components';

const Card = ({ title, value, percentage, icon, selectedDate }) => {
  const { currentColor } = useStateContext();

  const { data, isLoading, isSuccess, isError, refetch } = useQuery(
    ['card', selectedDate],
    () => axios.post(`${process.env.REACT_APP_API_URL}/api/dashboard/card`, { startDate: selectedDate[0], endDate: selectedDate[1] }),
    { enabled: selectedDate !== null }
  );

  console.log(data);

  useEffect(() => {
    if (selectedDate) {
      refetch();
    }
  }, [selectedDate, refetch]);

  if (isLoading) return <LoadingAnimation />;

  if (isError) return <ErrorAnimation />;

  if (isSuccess) {
    const dataCard = data?.data?.data;

    return (
      <div className='pl-6 pt-6 basis-full max-w-full sm:basis-1/2 sm:max-w-[50%] lg:basis-1/4 lg:max-w-[25%]'>
        <div className='bg-white rounded-2xl shadow dark:bg-secondary-dark-bg'>
          <div className='p-4 flex w-full items-center'>
            <div className='w-2/3'>
              <p className='text-sm font-bold text-[#67748e] dark:text-gray-300'>
                {title}
              </p>
              <span className='text-[#344767] text-xl font-bold dark:text-white'>
                Rp {(dataCard[value]).toLocaleString('id-ID')}
              </span>
              {percentage !== undefined && (
                <span className={dataCard[percentage].startsWith('-') ? 'text-[#ea0606] text-sm font-bold ml-1' : 'text-[#82d616] text-sm font-bold ml-1'}>
                  {dataCard[percentage]}
                </span>
              )}
            </div>
            <div className='w-1/3'>
            <div 
                className='w-12 h-12 flex justify-center items-center ml-auto rounded-lg text-white shadow-md text-xl'
                style={{ backgroundColor: currentColor }}
              >
                {icon}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Card;
