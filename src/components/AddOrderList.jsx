import React from 'react'
import { BsFileMinus, BsFilePlus } from 'react-icons/bs';
import { RiPercentFill } from 'react-icons/ri';

import { useStateContext } from '../contexts/ContextProvider';

const AddOrderList = ({ dataItem }) => {
  const { currencyFormat, icon, setIcon, setAddOrderList, currentColor } = useStateContext();

  return (
    <div className='nav-item fixed bg-half-transparent dark:bg-white dark:bg-opacity-40 h-[calc(100vh-72px)] w-[calc(100vw-88px)] flex justify-center items-center dark:text-gray-200'>
      <div className='fixed bg-white dark:bg-secondary-dark-bg rounded-lg w-[calc(100vw-88px)] md:w-4/5 lg:w-1/2 h-fit'>
        <div className='flex m-3 flex-wrap justify-center'>
          <div className='flex justify-center items-center w-1/4 min-w-fit'>
            {dataItem.InventoryImage === null ? (
                <div 
                  className='text-6xl w-40 h-40 bg-[#03C9D7] font-medium rounded-lg text-white flex flex-col justify-center text-center'
                  style={{backgroundColor: currentColor}}
                >
                  {dataItem.Name.split(' ').slice(0,2).map(word => word.charAt(0))}
                </div>
              ) : (
                <img
                  className='w-40 h-40 rounded-lg'
                  src={dataItem.InventoryImage}
                  alt={dataItem.Name}
                />
              )}
          </div>
          <div className='flex flex-col md:w-1/2 sm:w-2/5 w-fit px-3'>
            <p className='text-xl font-semibold'>
              {dataItem.Name}
            </p>
            <p className='text-lg font-semibold text-gray-600 dark:text-gray-400'>
              {dataItem.Category}
            </p>
            <p className='font-medium text-sm text-gray-600 dark:text-gray-400'>
              Stock: {dataItem.QtyStock}
            </p>
            <p className='text-xl font-bold'>
              {currencyFormat.format(dataItem.Selling)}
            </p>
          </div>
          <div className='flex flex-col items-center gap-1 lg:w-1/4 min-w-fit'>
            <p className='text-lg font-semibold'>Quantity</p>
            <div className='flex justify-center items-center'>
              <button className='text-3xl text-red-400'>
                <BsFileMinus />
              </button>
              <input 
                className='text-lg font-semibold w-10 text-center focus:outline-none border-b-1 bg-transparent' 
                type='number' 
                defaultValue='1' 
              />
              <button className='text-3xl text-green-400'>
                <BsFilePlus />
              </button>
            </div>
            <p className='text-lg font-semibold mt-3'>Discount</p>
            <div className='flex justify-end items-center w-full'>
              <input 
                className='text-lg font-semibold w-24 text-center focus:outline-none border-b-1 bg-transparent'
                type='number'
                defaultValue='0'
              />
              <button
                className='rounded-full w-[30px] h-[30px] bg-[#03C9D7] text-white flex justify-center items-center text-sm'
                onClick={() => setIcon(!icon)}
                style={{backgroundColor: currentColor}}
              >
                {icon ? ('Rp') : (<RiPercentFill />)}
              </button>
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center gap-5 mb-3'>
          <button 
            className='text-2xl font-bold text-white bg-red-500 rounded-lg w-32 h-10'
            onClick={() => setAddOrderList(false)}
          >
            Cancel
          </button>
          <button 
            className='text-2xl font-bold text-white bg-green-500 rounded-lg w-32 h-10'
            onClick={() => setAddOrderList(false)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
};

export default AddOrderList;