import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { HiSearch } from 'react-icons/hi';

import { useStateContext } from '../contexts/ContextProvider';
import { TiUserAdd } from 'react-icons/ti';

const ModalCustomer = () => {
  const { setAddOrderList, setItemData, numberFormat, currentColor } = useStateContext();

  const [customers, setCustomers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [addCustomer, setAddCustomer] = useState(false);
  
  useQuery({
    queryKey: ['customers'],
    queryFn: () => {
      return axios.get(`${process.env.REACT_APP_API_URL}/api/customers`);
    },
    onSuccess: (res) => {
      const data = res.data.data;
      data.sort((a, b) => a.name.localeCompare(b.name));
      
      setCustomers(data);
    }
  });

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box dark:bg-main-dark-bg bg-light-gray max-w-[60%]">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg text-[#344767] mb-2">Customer List</h3>
        <div className='flex justify-between'>
          <div className='flex items-center border-1 border-solid border-[#d2d6da] rounded-lg bg-white dark:bg-main-dark-bg w-[90%]'>
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
          <button
            type='button'
            className='bg-green-300 rounded-lg px-4 py-1 text-green-700 text-xl tracking-wider font-semibold shadow-md hover:scale-105 hover:bg-green-200 hover:text-green-600'
            onClick={() => setAddCustomer(true)}
          >
            <TiUserAdd />
          </button>
        </div>
        {addCustomer === false ? (
          <div className='flex mt-3 flex-wrap gap-3 items-center'>
            {customers.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase())).map((item) => (
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
        ) : (
          <div className='mt-10 mb-6'>
            <div className='box-border flex flex-row flex-wrap'>
              <div className='md:px-6 pb-6 px-3 flex-grow-0 box-border basis-full max-w-full'>
                <div className='text-black text-opacity-[0.87] transition-shadow duration-300 delay-[0ms] overflow-hidden flex flex-col relative min-w-0 break-words bg-white box-border border-0 rounded-2xl shadow-md dark:bg-secondary-dark-bg'>
                  <div className='pt-4 px-4 text-[#344767] dark:text-white'>
                    <h6 className='text-base leading-relaxed tracking-[0.0075em] font-medium'>
                      Add New Customer
                    </h6>
                  </div>
                  <div className='px-4 pt-4 leading-tight text-[#344767]'>
                    <div className='flex flex-row gap-8 align-middle items-center'>
                      <img 
                        className='text-center object-cover indent-[10000px] rounded-xl shadow w-[4.625rem] h-[4.625rem]'
                        // src={user.logo}
                        alt='photo_profile'
                      />
                      <input
                        className='dark:text-white'
                        type="file"
                        id="img"
                        name="img"
                        accept="image/*"
                        // onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  <label
                    className='px-4 pt-4 text-sm leading-normal tracking-[0.02857em] text-[#344767] dark:text-white font-bold'
                  >
                    Store Name
                  </label>
                  <div className='pt-1 px-4'>
                    <input
                      type='text'
                      className='border-solid border-1 w-[50%] bg-transparent dark:text-white'
                      // defaultValue={user.name}
                      onChange={(e) => {
                        // setUser({ ...user, name: e.target.value });
                      }}
                    />
                  </div>
                  <label
                    className='px-4 pt-4 text-sm leading-normal tracking-[0.02857em] text-[#344767] dark:text-white font-bold'
                  >
                    Phone Number
                  </label>
                  <div className='pt-1 px-4'>
                      <input
                        type='text'
                        className='border-solid border-1 w-[50%] dark:text-white bg-transparent'
                        // defaultValue={user.phone_number}
                        onChange={(e) => {
                          // setUser({ ...user, phone_number: e.target.value });
                        }}
                      />
                  </div>
                  <label
                    className='px-4 pt-4 text-sm leading-normal tracking-[0.02857em] text-[#344767] dark:text-white font-bold'
                  >
                    Email
                  </label>
                  <div className='pt-1 px-4'>
                    <input
                      type='text'
                      className='border-solid border-1 w-[50%] dark:text-white bg-transparent'
                      // defaultValue={user.email}
                      onChange={(e) => {
                        // setUser({ ...user, email: e.target.value });
                      }}
                    />
                  </div>
                  {/* <label
                    className='px-4 pt-4 text-sm leading-normal tracking-[0.02857em] text-[#344767] font-bold'
                  >
                    Business Type
                  </label>
                  <div className='pt-1 px-4'>
                    <select className='border-solid border-1 w-[50%]'>
                      <option>Select</option>
                      <option>Accessories Shop</option>
                      <option>Alcohol Shop</option>
                      <option>Automotive</option>
                      <option>Baby & Kids Store</option>
                      <option>Bakery</option>
                      <option>Beverage Franchise</option>
                      <option>Bookstore</option>
                      <option>Boutique Store</option>
                      <option>Building Materials Store</option>
                      <option>Catering</option>
                      <option>Coffe Shop</option>
                      <option>Collection</option>
                      <option>Computer Store</option>
                      <option>Cosmetic Shop</option>
                      <option>Department Store</option>
                      <option>Electronic Store</option>
                      <option>Equiqment Stores</option>
                      <option>Farming</option>
                      <option>Fashion Shop</option>
                      <option>Fastfood</option>
                      <option>Florist</option>
                      <option>Food Franchise</option>
                      <option>Fruits Shop</option>
                      <option>Furniture Store</option>
                      <option>General Service</option>
                      <option>Gift Shop</option>
                      <option>Grocery & Beverage Shop</option>
                      <option>Grocery Store</option>
                      <option>Gym / Fitness Center</option>
                      <option>Handphone Store</option>
                      <option>Laundry</option>
                      <option>Frozen Food</option>
                      <option>Minimarket</option>
                      <option>Optik</option>
                      <option>Pet Store</option>
                      <option>Pharmacies / Medecines</option>
                      <option>Printing</option>
                      <option>Restaurants</option>
                      <option>Roadside Stall</option>
                      <option>Salon / Barber</option>
                      <option>Shoe Shop</option>
                      <option>Spa / Massage</option>
                      <option>Stationary</option>
                      <option>Vape Store</option>
                      <option>Toy Shop</option>
                    </select>
                  </div> */}
                  <label
                    className='px-4 pt-4 text-sm leading-normal tracking-[0.02857em] text-[#344767] dark:text-white font-bold'
                  >
                    Addres
                  </label>
                  <div className='pt-1 px-4 pb-4'>
                    <textarea
                      className='border-solid border-1 w-[50%] dark:text-white bg-transparent'
                      // defaultValue={user.address}
                      onChange={(e) => {
                        // setUser({ ...user, address: e.target.value });
                      }}
                    />
                  </div>
                  <div className='pt-4 px-4 text-[#344767] dark:text-white'>
                    <h6 className='text-base leading-relaxed tracking-[0.0075em] font-medium'>
                      Store Settings
                    </h6>
                  </div>
                  <label
                    className='px-4 pt-4 text-sm leading-normal tracking-[0.02857em] text-[#344767] dark:text-white font-bold'
                  >
                    Items Category
                  </label>
                  <div className='pt-1 px-4'>
                    <input
                      type='text'
                      className='border-solid border-1 w-[50%] dark:text-white bg-transparent'
                      // defaultValue={categories.map(category => category.name).join(', ')}
                      // onChange={handleChangeCategory}
                    />
                  </div>
                  <label
                    className='px-4 pt-4 text-sm leading-normal tracking-[0.02857em] text-[#344767] dark:text-white font-bold'
                  >
                    Payment Method
                  </label>
                  <div className='pt-1 px-4 pb-6'>
                    <input
                      type='text'
                      className='border-solid border-1 w-[50%] dark:text-white bg-transparent'
                      // defaultValue={payments.map(payment => payment.name).join(', ')}
                      // onChange={handleChangePayment}
                    />
                  </div>
                  <div className='p-4 text-right'>
                    <button
                      type='button'
                      className='bg-green-300 rounded-lg px-4 py-1 text-green-700 text-base tracking-wider font-semibold shadow-md hover:scale-105 hover:bg-green-200 hover:text-green-600'
                      // onClick={onClickSaveHandler}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </dialog>
  )
}

export default ModalCustomer;
