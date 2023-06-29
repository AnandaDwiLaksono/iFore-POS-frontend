import React, { useState } from 'react'
import { BsFileMinus, BsFilePlus } from 'react-icons/bs';
import { RiPercentFill } from 'react-icons/ri';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { useStateContext } from '../contexts/ContextProvider';
import { API_URL } from '../config/apiConfig';

const AddOrderList = ({ dataItem, dataOrder }) => {
  const { currencyFormat, icon, setIcon, setAddOrderList, currentColor, onOrder, setOnOrder } = useStateContext();

  const [qty, setQty] = useState(dataItem.qty ? dataItem.qty : (dataItem.qty_stock === 0 ? 0 : 1));
  const [discount, setDiscount] = useState(dataItem.discount ? dataItem.discount : 0);

  const addOrder = useMutation({
    mutationFn: (orderList) => {
      return axios.post(`${API_URL}/api/order_items`, orderList);
    },
    onSuccess: (data) => {
      dataOrder(data.data.order);
    },
    onError: () => {
      console.log('error');
    }
  });

  const editOrder = useMutation({
    mutationFn: (orderList) => {
      return axios.put(`${API_URL}/api/order_items/${dataItem.id}`, orderList);
    },
    onSuccess: (data) => {
      dataOrder(data.data.order);
    },
    onError: () => {
      console.log('error');
    }
  });

  const handleSave = () => {
    const discountItem = icon ? discount : discount / 100 * dataItem.selling_price;
    const profitItem = (dataItem.selling_price - dataItem.purchase_price) * qty;

    if (onOrder) {
      const orderItem = {
        item_id: dataItem.item_id,
        qty: qty,
        discount: discountItem,
        total: dataItem.selling_price * qty,
        profit: profitItem - discountItem,
      }

      editOrder.mutate(orderItem);
    } else {
      const orderItem = {
        item_id: dataItem.id,
        qty: qty,
        discount: discountItem,
        total: dataItem.selling_price * qty,
        profit: profitItem - discountItem,
      }
      addOrder.mutate(orderItem);
    }

    setAddOrderList(false);
    setIcon(true)
  }

  return (
    <div className='nav-item fixed bg-half-transparent dark:bg-white dark:bg-opacity-40 h-[calc(100vh-72px)] w-[calc(100vw-88px)] flex justify-center items-center dark:text-gray-200'>
      <div className='fixed bg-white dark:bg-secondary-dark-bg rounded-lg w-[calc(100vw-88px)] md:w-4/5 lg:w-1/2 h-fit'>
        <div className='flex m-3 flex-wrap justify-center'>
          <div className='flex justify-center items-center w-1/4 min-w-fit'>
            <div 
              className='text-6xl w-40 h-40 bg-[#03C9D7] font-medium rounded-lg text-white flex flex-col justify-center text-center'
              style={{backgroundColor: currentColor}}
            >
              {dataItem.name.split(' ').slice(0,2).map(word => word.charAt(0))}
            </div>
          </div>
          <div className='flex flex-col md:w-1/2 sm:w-2/5 w-fit px-3'>
            <p className='text-xl font-semibold'>
              {dataItem.name}
            </p>
            <p className='text-lg font-semibold text-gray-600 dark:text-gray-400'>
              {dataItem.category.name}
            </p>
            <p className='font-medium text-sm text-gray-600 dark:text-gray-400'>
              Stock: {dataItem.qty_stock}
            </p>
            <p className='text-xl font-bold'>
              {currencyFormat.format(dataItem.selling_price)}
            </p>
          </div>
          <div className='flex flex-col items-center gap-1 lg:w-1/4 min-w-fit'>
            <p className='text-lg font-semibold'>Quantity</p>
            <div className='flex justify-center items-center'>
              <button 
                className={`text-3xl ${qty === 0 ? 'text-gray-400' : 'text-red-400'}`}
                onClick={() => setQty(qty - 1)}
                disabled={qty === 0}
              >
                <BsFileMinus />
              </button>
              <input 
                className='text-lg font-semibold w-10 text-center focus:outline-none border-b-1 bg-transparent' 
                type='number' 
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
              <button
                className={`text-3xl ${qty === dataItem.qty_stock ? 'text-gray-400' : 'text-green-400'}`}
                onClick={() => setQty(qty + 1)}
                disabled={qty === dataItem.qty_stock}
              >
                <BsFilePlus />
              </button>
            </div>
            <p className='text-lg font-semibold mt-3'>Discount</p>
            <div className='flex justify-end items-center w-full'>
              <input 
                className='text-lg font-semibold w-24 text-center focus:outline-none border-b-1 bg-transparent'
                type='number'
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
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
            onClick={() => {
              handleSave();
              setOnOrder(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
};

export default AddOrderList;
