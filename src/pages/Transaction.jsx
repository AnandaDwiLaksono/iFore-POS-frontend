import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { HiSearch } from 'react-icons/hi';
import { MdCancel } from 'react-icons/md';
import { BsCash, BsCreditCard } from 'react-icons/bs';
import { AiOutlineQrcode } from 'react-icons/ai';

import { useStateContext } from '../contexts/ContextProvider';
import { AddOrderList } from '../components';

const inventoryData = [
  {
      ItemID: 123456,
      Name: 'Oxva Velocity',
      Category: 'AIO',
      Purchase: 400000,
      Selling: 500000,
      QtyStock: 5,
      InventoryImage: null,
      Note: ''
  },
  {
      ItemID: 123457,
      Name: 'Oxva Unipro Coil',
      Category: 'Coil',
      Purchase: 25000,
      Selling: 45000,
      QtyStock: 20,
      InventoryImage:
      'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
      Note: ''
  },
  {
      ItemID: 123458,
      Name: 'Baterai VTC6 18650',
      Category: 'Baterai',
      Purchase: 80000,
      Selling: 100000,
      QtyStock: 5,
      InventoryImage: null,
      Note: ''
  },
  {
      ItemID: 123459,
      Name: 'Hotcig R233',
      Category: 'Mod',
      Purchase: 400000,
      Selling: 500000,
      QtyStock: 5,
      InventoryImage:
      'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
      Note: ''
  },
  {
      ItemID: 123460,
      Name: 'RDA Nitrous',
      Category: 'RDA',
      Purchase: 280000,
      Selling: 330000,
      QtyStock: 5,
      InventoryImage: null,
      Note: ''
  },
  {
      ItemID: 123461,
      Name: 'Max Coil',
      Category: 'Coil',
      Purchase: 25000,
      Selling: 35000,
      QtyStock: 15,
      InventoryImage:
      'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
      Note: ''
  },
  {
      ItemID: 123462,
      Name: 'B1 Coil',
      Category: 'Coil',
      Purchase: 45000,
      Selling: 65000,
      QtyStock: 15,
      InventoryImage: null,
      Note: ''
  },
  {
      ItemID: 123463,
      Name: 'Secret Tiramisu Nic 3',
      Category: 'Freebase',
      Purchase: 120000,
      Selling: 140000,
      QtyStock: 5,
      InventoryImage:
      'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
      Note: ''
  },
  {
      ItemID: 123464,
      Name: 'Blondies Bread Butter Buns Nic 3',
      Category: 'Freebase',
      Purchase: 120000,
      Selling: 140000,
      QtyStock: 5,
      InventoryImage: null,
      Note: ''
  },
  {
      ItemID: 123465,
      Name: 'Secret Tiramisu Nic 6',
      Category: 'Freebase',
      Purchase: 120000,
      Selling: 140000,
      QtyStock: 5,
      InventoryImage:
      'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
      Note: ''
  },
  {
      ItemID: 123466,
      Name: 'Blondies Bread Butter Buns Nic 6',
      Category: 'Freebase',
      Purchase: 120000,
      Selling: 140000,
      QtyStock: 5,
      InventoryImage: null,
      Note: ''
  },
  {
      ItemID: 123467,
      Name: 'A La Carte Cream Caramel Nic 6 60 ml',
      Category: 'Freebase',
      Purchase: 120000,
      Selling: 140000,
      QtyStock: 5,
      InventoryImage: null,
      Note: ''
  },
  {
      ItemID: 123468,
      Name: 'Caliburn AK2',
      Category: 'POD',
      Purchase: 200000,
      Selling: 150000,
      QtyStock: 5,
      InventoryImage: null,
      Note: 'Warna pink tinggal 1, warna oren ada 3, warna hitam tinggal 1'
  },
  {
      ItemID: 123469,
      Name: 'Dotpod Nano by Dotmod',
      Category: 'POD',
      Purchase: 320000,
      Selling: 300000,
      QtyStock: 5,
      InventoryImage:
      'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
      Note: ''
  },
  {
      ItemID: 123470,
      Name: 'Catridge Dotpod',
      Category: 'Coil',
      Purchase: 45000,
      Selling: 50000,
      QtyStock: 5,
      InventoryImage: null,
      Note: ''
  },
  {
      ItemID: 123471,
      Name: 'Ketan Jinak 60 ml',
      Category: 'Freebase',
      Purchase: 100000,
      Selling: 110000,
      QtyStock: 5,
      InventoryImage:
      'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
      Note: ''
  },
  {
      ItemID: 123472,
      Name: 'Foom Bacco Series 30 ml',
      Category: 'Saltnic',
      Purchase: 100000,
      Selling: 110000,
      QtyStock: 5,
      InventoryImage: null,
      Note: ''
  },
  {
      ItemID: 123473,
      Name: 'Secret Banana 60 ml',
      Category: 'Freebase',
      Purchase: 1200000,
      Selling: 140000,
      QtyStock: 5,
      InventoryImage:
      'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
      Note: ''
  }
];

inventoryData.sort((a, b) => a.Name.localeCompare(b.Name));

const orderData = {
  OrderItems: [
    {
      ItemID: 123467,
      Name: 'A La Carte Cream Caramel Nic 6 60 ml',
      Category: 'Freebase',
      Price: 140000,
      Quantity: 1,
      Discount: 10000,
      Total: 140000
    },
    {
      ItemID: 123472,
      Name: 'Foom Bacco Series 30 ml',
      Category: 'Saltnic',
      Price: 110000,
      Quantity: 1,
      Discount: 0,
      Total: 110000
    },
    {
      ItemID: 123471,
      Name: 'Ketan Jinak 60 ml',
      Category: 'Freebase',
      Price: 110000,
      Quantity: 1,
      Discount: 0,
      Total: 110000
    },
    {
      ItemID: 123470,
      Name: 'Catridge Dotpod',
      Category: 'Coil',
      Price: 50000,
      Quantity: 2,
      Discount: 0,
      Total: 100000
    },
    {
      ItemID: 123473,
      Name: 'Secret Banana 60 ml',
      Category: 'Freebase',
      Price: 140000,
      Quantity: 1,
      Discount: 10000,
      Total: 140000
    }
  ],
  PaymentType: 'Cash',
  SubTotal: 600000,
  TotalDiscount: 20000,
  TotalAmount: 580000
};

const Transaction = () => {
  const { addOrderList, setAddOrderList, itemData, setItemData, numberFormat, currentColor } = useStateContext();

  return (
    <div className='flex flex-row mx-11 mb-3'>
      <div className='mr-6 basis-3/5 h-[calc(100vh-72px)] overflow-auto'>
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
            />
          </div>
        </div>
        <div className='flex mt-3 flex-wrap gap-3 items-center'>
          {inventoryData.map((item) => (
            <button
              key={item.ItemID}
              className='bg-white dark:bg-secondary-dark-bg shadow rounded-lg w-36 h-[216px] hover:drop-shadow-xl'
              onClick={() => {setAddOrderList(true); setItemData(item)}}
            >
              {item.InventoryImage === null ? (
                <div 
                  className='text-6xl w-36 h-28 font-medium rounded-t-lg text-white text-center py-6'
                  style={{backgroundColor: currentColor}}
                >
                  {item.Name.split(' ').slice(0,2).map(word => word.charAt(0))}
                </div>
              ) : (
                <img
                  className='w-36 h-28 rounded-t-lg'
                  src={item.InventoryImage}
                  alt={item.Name}
                />
              )}
              <div className='flex flex-col justify-between h-[104px] text-[#344767] dark:text-gray-200'>
                <div className='mx-2 mt-2 text-center text-sm font-medium'>
                  {item.Name}
                </div>
                <div className='flex mb-2 align-text-bottom'>
                  <div className='text-left basis-1/4 ml-2 text-sm'>
                    {item.QtyStock}
                  </div>
                  <div className='text-right w-full font-semibold text-sm mr-2 basis-3/4'>
                    Rp {numberFormat.format(item.Selling)}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className='bg-white rounded-lg w-full basis-2/5 text-[#344767] shadow dark:bg-secondary-dark-bg dark:text-gray-200 max-h-[calc(100vh-72px)] h-fit overflow-auto'>
        <div className='flex justify-end'>
          <div className='text-center text-xl font-bold my-4 basis-3/5 md:basis-4/5'>
            Order List
          </div>
          <div className='basis-1/5 md:basis-[10%] text-center flex flex-col justify-center'>
            <TooltipComponent content='Cancel Order' position='BottomCenter'>
              <button
                type='button' 
                className='text-2xl hover:drop-shadow-xl text-red-400 hover:text-red-300' 
                onClick={() => {}}
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
        {orderData?.OrderItems?.map((item) => (
          <div
            key={item.ItemID}
            className='flex flex-row justify-between px-3 py-2 border-b border-gray-200'
          >
            <div className='text-left text-sm basis-1/12'>
              1 x
            </div>
            <div className='text-left text-sm basis-5/12'>
              {item.Name}
              {(item.Discount > 0) && (
                <div className='text-xs text-right text-red-400'>
                  Discount
                </div>
              )}
            </div>
            <div className='text-right text-sm basis-5/12'>
              Rp {numberFormat.format(item.Price)}
              {(item.Discount > 0) && (
                <div className='text-xs text-red-400'> 
                  Rp {numberFormat.format(item.Discount)}
                </div>
              )}
            </div>
            <div className='w-1/12 flex flex-col justify-center items-center'>
              <TooltipComponent content='Edit Item' position='BottomCenter'>
                <button 
                  className='hover:text-gray-400 text-base'
                  onClick={() => {
                    setAddOrderList(true);
                    setItemData(inventoryData.find(data => data.ItemID === item.ItemID))
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
            Rp {numberFormat.format(orderData.SubTotal)}
          </div>
        </div>
        <div className='flex flex-row px-3 py-2 border-b border-gray-200 flex-wrap'>
          <div className='text-left font-semibold w-full sm:w-6/12'>
            Total Discount
          </div>
          <div className='text-right font-semibold w-full sm:w-5/12'>
            Rp {numberFormat.format(orderData.TotalDiscount)}
          </div>
        </div>
        <div className='flex flex-row px-3 py-2 mt-4 flex-wrap'>
          <div className='font-semibold basis-6/12'>
            Payment Type:
          </div>
          <div className='flex justify-center items-center w-full sm:w-2/12'>
            <TooltipComponent content='Cash' position='BottomCenter'>
              <button className='hover:drop-shadow-xl hover:bg-[#03C9D7] hover:text-white focus:bg-[#03C9D7] focus:text-white text-2xl rounded-md focus:drop-shadow-xl px-4 w-full align-middle'>
                <BsCash />
              </button>
            </TooltipComponent>
          </div>
          <div className='flex justify-center items-center w-full sm:w-2/12'>
            <TooltipComponent content='Debit / Transfer' position='BottomCenter'>
              <button className='hover:drop-shadow-xl hover:bg-[#03C9D7] hover:text-white focus:bg-[#03C9D7] focus:text-white text-2xl rounded-md focus:drop-shadow-xl px-4 w-full align-middle'>
                <BsCreditCard />
              </button>
            </TooltipComponent>
          </div>
          <div className='flex justify-center items-center w-full sm:w-2/12'>
            <TooltipComponent content='QRIS' position='BottomCenter'>
              <button className='hover:drop-shadow-xl hover:bg-[#03C9D7] hover:text-white focus:bg-[#03C9D7] focus:text-white text-2xl rounded-md focus:drop-shadow-xl px-4 w-full align-middle'>
                <AiOutlineQrcode />
              </button>
            </TooltipComponent>
          </div>
        </div>
        <button className='bg-green-500 text-white text-center text-xl font-bold py-3 rounded-b-lg w-full hover:bg-green-400 mt-4'>
          Rp {numberFormat.format(orderData.TotalAmount)}
        </button>
      </div>

      {addOrderList && <AddOrderList dataItem={itemData} />}
    </div>
  )
};

export default Transaction;
