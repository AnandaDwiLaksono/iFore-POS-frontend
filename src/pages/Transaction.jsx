import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { HiSearch } from 'react-icons/hi';
import { MdCancel } from 'react-icons/md';
import { BsCash, BsCreditCard } from 'react-icons/bs';
import { AiOutlineQrcode } from 'react-icons/ai';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import { TiUserAdd } from 'react-icons/ti';

import { useStateContext } from '../contexts/ContextProvider';
import { AddOrderList, ModalCustomer } from '../components';

const Transaction = () => {
  const { addOrderList, setAddOrderList, itemData, setItemData, numberFormat, currentColor, setOnOrder, dataCustomer, setDataCustomer } = useStateContext();

  const [inventories, setInventories] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [orderList, setOrderList] = useState([]);
  const [paymentType, setPaymentType] = useState('Cash');

  const subTotal = orderList.reduce((acc, curr) => acc + curr.total, 0);
  const totalDiscount = orderList.reduce((acc, curr) => acc + curr.discount, 0);
  
  useQuery({
    queryKey: ['inventory'],
    queryFn: () => {
      return axios.get(`${process.env.REACT_APP_API_URL}/api/inventories`);
    },
    onSuccess: (res) => {
      const data = res.data.data;
      data.sort((a, b) => a.name.localeCompare(b.name));
      
      setInventories(data);
    }
  });

  const deleteOrder = useMutation({
    mutationFn: (item) => {
      return axios.delete(`${process.env.REACT_APP_API_URL}/api/order_items/${item}`);
    }
  });
  
  const addTransaction = useMutation({
    mutationFn: (data) => {
      return axios.post(`${process.env.REACT_APP_API_URL}/api/transaction_histories`, data);
    }
  });

  const editInventory = useMutation({
    mutationFn: (newDataInventory) => {
      return axios.put(`${process.env.REACT_APP_API_URL}/api/inventories/${newDataInventory.id}`, newDataInventory);
    },
  });

  const addInventoryHistory = useMutation({
    mutationFn: (dataInventoryHistory) => {
      return axios.post(`${process.env.REACT_APP_API_URL}/api/inventory_histories`, dataInventoryHistory);
    }
  });
  
  const handleGetOrder = (item) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/order_items/${item.id}`)
      .then((res) => {
        if (res.data.data.qty === 0) {
          deleteOrder.mutate(res.data.data.id);
          orderList.splice(orderList.indexOf(item), 1);
        } else {
          for (let i = 0; i < orderList.length; i++) {
            if (orderList[i].id === res.data.data.id) {
              orderList.splice(i, 1);
            }
          }

          setOrderList([...orderList, res.data.data]);
        }
      })
      .catch((err) => {
        console.log(err);
      }
    );
  };

  const handleDeleteOrder = () => {
    orderList.forEach((item) => {
      deleteOrder.mutate(item.id);
    });

    setOrderList([]);
    setDataCustomer(null);
    toast.success('Order list deleted successfully');
  }

  const handleAddTransaction = () => {
    for (let i = 0; i < orderList.length; i++) {
      const dataInventory = {
        id: orderList[i].item_id,
        name: orderList[i].inventory.name,
        category_id: orderList[i].inventory.category.id,
        purchase_price: orderList[i].inventory.purchase_price,
        selling_price: orderList[i].inventory.selling_price,
        qty_stock: orderList[i].inventory.qty_stock - orderList[i].qty,
        note: orderList[i].inventory.note
      };

      const dataInventoryHistory = {
        item_id: orderList[i].item_id,
        change_type: 'out',
        quantity: orderList[i].qty,
        note: 'Sale'
      };

      editInventory.mutate(dataInventory);
      addInventoryHistory.mutate(dataInventoryHistory);
    };

    const dataTransaction = {
      payment_type: paymentType,
      order_items_id: orderList.map((item) => item.id),
      status: 'completed',
      subtotal: subTotal,
      total_discount: totalDiscount,
      total: subTotal - totalDiscount,
      total_profit: orderList.reduce((acc, curr) => acc + curr.profit, 0),
      note: '',
      customer_id: dataCustomer?.id,
    };

    addTransaction.mutate(dataTransaction);

    setOrderList([]);
    setDataCustomer(null);
    toast.success('Transaction added successfully');
  };

  return (
    <>
      <div className='flex sm:flex-row flex-col mx-11 mb-3'>
        <div className='mr-6 basis-3/5 sm:h-[calc(100vh-72px)] max-sm:max-h-screen overflow-auto'>
          <div className='flex items-center border-1 border-solid border-[#d2d6da] rounded-lg bg-white dark:bg-main-dark-bg'>
            <div className='px-2 py-2.5 w-10 h-full text-[#344767] dark:text-gray-200'>
              <span className='select-none w-[1em] h-[1em] overflow-hidden block text-center font-bold text-xl'>
                <HiSearch />
              </span>
            </div>
            <div className='tracking-[0.00938em] box-border relative cursor-text py-2 pr-3 border-1 border-solid border-transparent pointer-events-auto rounded-r-lg grid place-items-center w-full h-auto text-sm font-normal leading-[1.4] text-[#495057] bg-clip-padding appearance-none transition-all delay-[0s] focus-within:border-[#03C9D7] focus-within:px-3 focus-within:outline-0 focus-within:border-[3px]'>
              <input 
                placeholder='Type here...'
                className='h-5 text-current border-0 box-content bg-none m-0 block min-w-0 w-full p-0 focus:outline-0 bg-transparent'
                onChange={(e) => {setSearchValue(e.target.value)}}
              />
            </div>
          </div>
          <div className='flex mt-3 flex-wrap gap-3 items-center'>
            {inventories.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase())).map((item) => (
              <button
                key={item.id}
                className='bg-white dark:bg-secondary-dark-bg shadow rounded-lg w-36 h-[216px] hover:drop-shadow-xl'
                onClick={() => {setAddOrderList(true); setItemData(item)}}
              >
                <div 
                  className='text-6xl w-36 h-28 font-medium rounded-t-lg text-white text-center py-6'
                  style={{backgroundColor: currentColor}}
                >
                  {item.name.split(' ').slice(0,2).map(word => word.charAt(0))}
                </div>
                <div className='flex flex-col justify-between h-[104px] text-[#344767] dark:text-gray-200'>
                  <div className='mx-2 mt-2 text-center text-sm font-medium'>
                    {item.name}
                  </div>
                  <div className='flex mb-2 align-text-bottom'>
                    <div className='text-left basis-1/4 ml-2 text-sm'>
                      {item.qty_stock}
                    </div>
                    <div className='text-right w-full font-semibold text-sm mr-2 basis-3/4'>
                      Rp {numberFormat.format(item.selling_price)}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className='bg-white rounded-lg max-sm:mt-4 w-full basis-2/5 text-[#344767] shadow dark:bg-secondary-dark-bg dark:text-gray-200 max-h-[calc(100vh-72px)] h-fit overflow-auto'>
          <div className='flex justify-between'>
            <div className='basis-1/5 md:basis-[10%] text-center flex flex-col justify-center'>
              <TooltipComponent content='Add Customer' position='BottomCenter'>
                <button
                  type='button' 
                  className='p-1 text-lg hover:drop-shadow-xl text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-full border border-gray-400' 
                  onClick={() => document.getElementById('my_modal_3').showModal()}
                >
                  <TiUserAdd />
                </button>
              </TooltipComponent>
            </div>
            <div className='text-center text-xl font-bold my-4 basis-3/5 md:basis-4/5'>
              Order List
            </div>
            <div className='basis-1/5 md:basis-[10%] text-center flex flex-col justify-center'>
              <TooltipComponent content='Cancel Order' position='BottomCenter'>
                <button
                  type='button' 
                  className='text-2xl hover:drop-shadow-xl text-red-400 hover:text-red-300' 
                  onClick={handleDeleteOrder}
                >
                  <MdCancel />
                </button>
              </TooltipComponent>
            </div>
          </div>
          <div className='flex flex-row px-3 py-2 border-y-2 border-gray-500 text-center text-base font-semibold'>
            <div className='basis-6/12'>
              Item
            </div>
            <div className='basis-5/12'>
              Price
            </div>
          </div>
          {orderList?.map((item) => (
            <div
              key={item.id}
              className='flex flex-row justify-between px-3 py-2 border-b border-gray-200'
            >
              <div className='text-left text-sm basis-1/12'>
                {item.qty} x
              </div>
              <div className='text-left text-sm basis-5/12'>
                {item.inventory.name}
                {(item.discount > 0) && (
                  <div className='text-xs text-right text-red-400'>
                    Discount
                  </div>
                )}
              </div>
              <div className='text-right text-sm basis-5/12'>
                Rp {numberFormat.format(item.total)}
                {(item.discount > 0) && (
                  <div className='text-xs text-red-400'> 
                    Rp {numberFormat.format(item.discount)}
                  </div>
                )}
              </div>
              <div className='w-1/12 flex flex-col justify-center items-center'>
                <TooltipComponent content='Edit Item' position='BottomCenter'>
                  <button 
                    className='hover:text-gray-400 text-base'
                    onClick={() => {
                      setAddOrderList(true);
                      setItemData({
                        id: item.id,
                        item_id: item.item_id,
                        qty: item.qty,
                        total: item.total,
                        discount: item.discount,
                        profit: item.profit,
                        name: item.inventory.name,
                        selling_price: item.inventory.selling_price,
                        qty_stock: item.inventory.qty_stock,
                        category: item.inventory.category,
                        purchase_price: item.inventory.purchase_price,
                      });
                      setOnOrder(true);
                    }}
                  >
                    <FiEdit />
                  </button>
                </TooltipComponent>
              </div>
            </div>
          ))}
          <div className='flex flex-row px-3 py-2 flex-wrap'>
            <div className='text-left font-semibold w-full sm:w-6/12'>
              Subtotal
            </div>
            <div className='text-right font-semibold w-full sm:w-5/12'>
              Rp {numberFormat.format(subTotal)}
            </div>
          </div>
          <div className='flex flex-row px-3 py-2 flex-wrap'>
            <div className='text-left font-semibold w-full sm:w-6/12'>
              Total Discount
            </div>
            <div className='text-right font-semibold w-full sm:w-5/12'>
              Rp {numberFormat.format(totalDiscount)}
            </div>
          </div>
          <div className='flex flex-row px-3 py-2 border-b border-gray-200 flex-wrap'>
            <div className='text-left font-semibold w-full sm:w-6/12'>
              Customer:
            </div>
            <div className='text-right font-semibold w-full sm:w-5/12'>
              {dataCustomer !== null ? dataCustomer.name : ''}
            </div>
          </div>
          <div className='flex flex-row px-3 py-2 mt-4'>
            <div className='font-semibold basis-6/12'>
              Payment Type:
            </div>
            <div className='flex justify-center items-center w-full sm:w-2/12'>
              <TooltipComponent content='Cash' position='BottomCenter'>
                <button
                  className={`hover:drop-shadow-xl hover:bg-[#03C9D7] hover:text-white focus:bg-[#03C9D7] focus:text-white text-2xl rounded-md focus:drop-shadow-xl px-4 max-lg:px-1.5 w-full align-middle ${paymentType === 'Cash' ? 'bg-[#03C9D7] text-white' : ''}`}
                  onClick={() => setPaymentType('Cash')}
                  disabled={paymentType === 'Cash'}
                >
                  <BsCash />
                </button>
              </TooltipComponent>
            </div>
            <div className='flex justify-center items-center w-full sm:w-2/12'>
              <TooltipComponent content='BCA' position='BottomCenter'>
                <button
                  className={`hover:drop-shadow-xl hover:bg-[#03C9D7] hover:text-white focus:bg-[#03C9D7] focus:text-white text-2xl rounded-md focus:drop-shadow-xl px-4 max-lg:px-1.5 w-full align-middle ${paymentType === 'BCA' ? 'bg-[#03C9D7] text-white' : ''}`}
                  onClick={() => setPaymentType('BCA')}
                  disabled={paymentType === 'BCA'}
                >
                  <BsCreditCard />
                </button>
              </TooltipComponent>
            </div>
            <div className='flex justify-center items-center w-full sm:w-2/12'>
              <TooltipComponent content='QRIS' position='BottomCenter'>
                <button
                  className={`hover:drop-shadow-xl hover:bg-[#03C9D7] hover:text-white focus:bg-[#03C9D7] focus:text-white text-2xl rounded-md focus:drop-shadow-xl px-4 max-lg:px-1.5 w-full align-middle ${paymentType === 'QRIS' ? 'bg-[#03C9D7] text-white' : ''}`}
                  onClick={() => setPaymentType('QRIS')}
                  disabled={paymentType === 'QRIS'}
                >
                  <AiOutlineQrcode />
                </button>
              </TooltipComponent>
            </div>
          </div>
          <button
            className='bg-green-500 text-white text-center text-xl font-bold py-3 rounded-b-lg w-full hover:bg-green-400 mt-4'
            onClick={handleAddTransaction}
            disabled={orderList.length === 0}
          >
            Rp {numberFormat.format(subTotal - totalDiscount)}
          </button>
        </div>

        {addOrderList && <AddOrderList dataItem={itemData} dataOrder={handleGetOrder}/>}
      </div>

      <ModalCustomer />
    </>
  )
};

export default Transaction;
