import React from 'react';

import { useStateContext } from '../contexts/ContextProvider';

const Card = ({ title, value, percentage, icon }) => {
  const { currentColor } = useStateContext();

  return (
    <div className='pl-6 pt-6 basis-full max-w-full sm:basis-1/2 sm:max-w-[50%] lg:basis-1/4 lg:max-w-[25%]'>
          <div className='bg-white rounded-2xl shadow dark:bg-secondary-dark-bg'>
            <div className='p-4 flex w-full items-center'>
              <div className='w-2/3'>
                <p className='text-sm font-bold text-[#67748e] dark:text-gray-300'>
                  {title}
                </p>
                <span className='text-[#344767] text-xl font-bold dark:text-white'>
                  {value}
                </span>
                {percentage === undefined ? null : 
                  <span className={percentage.startsWith('-') ? 'text-[#ea0606] text-sm font-bold ml-1' : 'text-[#82d616] text-sm font-bold ml-1'}>
                    {percentage}
                  </span>
                }
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
};

export default Card;
