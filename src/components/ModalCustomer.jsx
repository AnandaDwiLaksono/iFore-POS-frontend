import React, { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { HiSearch } from 'react-icons/hi';

import { useStateContext } from '../contexts/ContextProvider';
import { TiUserAdd } from 'react-icons/ti';
import { toast } from 'react-toastify';

const ModalCustomer = () => {
  const { currentColor, setDataCustomer } = useStateContext();

  const [customers, setCustomers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [addCustomer, setAddCustomer] = useState(false);
  const [isCardClicked, setIsCardClicked] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone_number: '',
    email: '',
    address: '',
  });
  
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

  const addNewCustomer = useMutation({
    mutationFn: (data) => {
      return axios.post(`${process.env.REACT_APP_API_URL}/api/customers`, data);
    },
    onSuccess: () => {
      toast.success('Customer added successfully!');
      customers.push(newCustomer);
      setAddCustomer(false);
      setNewCustomer({
        name: '',
        phone_number: '',
        email: '',
        address: '',
      });
    },
    onError: () => {
      toast.error('Failed to add customer!');
    }
  });

  const editCustomer = useMutation({
    mutationFn: (data) => {
      return axios.put(`${process.env.REACT_APP_API_URL}/api/customers/${selectedCustomer.id}`, data);
    },
    onSuccess: () => {
      toast.success('Customer edited successfully!');
      customers.push(selectedCustomer);
      setIsCardClicked(false);
    },
    onError: () => {
      toast.error('Failed to edit customer!');
    }
  });

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box dark:bg-main-dark-bg bg-light-gray max-w-[60%]">
        <form method="dialog">
          <button className="btn btn-sm btn-ghost absolute right-2 top-2">✕</button>
        </form>
        {addCustomer === true ? (
          <div className='mt-5'>
            <div className='box-border flex flex-row flex-wrap'>
              <div className='md:px-6 pb-6 px-3 flex-grow-0 box-border basis-full max-w-full'>
                <div className='text-black text-opacity-[0.87] transition-shadow duration-300 delay-[0ms] overflow-hidden flex flex-col relative min-w-0 break-words bg-white box-border border-0 rounded-2xl shadow-md dark:bg-secondary-dark-bg'>
                  <div className='pt-4 px-4 text-[#344767] dark:text-white'>
                    <h6 className='text-base leading-relaxed tracking-[0.0075em] font-medium'>
                      Add New Customer
                    </h6>
                  </div>
                  <label
                    className='px-4 pt-4 text-sm leading-normal tracking-[0.02857em] text-[#344767] dark:text-white font-bold'
                  >
                    Name
                  </label>
                  <div className='pt-1 px-4'>
                    <input
                      type='text'
                      className='border-solid border-1 w-[50%] bg-transparent dark:text-white'
                      onChange={(e) => {
                        setNewCustomer({ ...newCustomer, name: e.target.value });
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
                        onChange={(e) => {
                          setNewCustomer({ ...newCustomer, phone_number: e.target.value });
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
                      onChange={(e) => {
                        setNewCustomer({ ...newCustomer, email: e.target.value });
                      }}
                    />
                  </div>
                  <label
                    className='px-4 pt-4 text-sm leading-normal tracking-[0.02857em] text-[#344767] dark:text-white font-bold'
                  >
                    Addres
                  </label>
                  <div className='pt-1 px-4 pb-4'>
                    <textarea
                      className='border-solid border-1 w-[50%] dark:text-white bg-transparent'
                      onChange={(e) => {
                        setNewCustomer({ ...newCustomer, address: e.target.value });
                      }}
                    />
                  </div>
                  <div className='flex justify-end gap-2 p-4'>
                    <button
                      type='button'
                      className='bg-red-300 rounded-lg px-4 py-1 text-red-700 text-base tracking-wider font-semibold shadow-md hover:scale-105 hover:bg-red-200 hover:text-red-600'
                      onClick={() => setAddCustomer(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type='button'
                      className='bg-green-300 rounded-lg px-4 py-1 text-green-700 text-base tracking-wider font-semibold shadow-md hover:scale-105 hover:bg-green-200 hover:text-green-600'
                      onClick={() => {
                        const validation = customers.filter(customer => customer.name === newCustomer.name || customer.phone_number === newCustomer.phone_number).length;
                        if (validation === 0) {
                          addNewCustomer.mutate(newCustomer);
                        } else if (newCustomer.name === '' || newCustomer.phone_number === '') {
                          toast.error('Name and phone number must be filled!');
                        } else {
                          toast.error('Customer already exists!');
                        }
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (isCardClicked === true ? (
          <div className='mt-5'>
            <div className='box-border flex flex-row flex-wrap'>
              <div className='md:px-6 pb-6 px-3 flex-grow-0 box-border basis-full max-w-full'>
                <div className='text-black text-opacity-[0.87] transition-shadow duration-300 delay-[0ms] overflow-hidden flex flex-col relative min-w-0 break-words bg-white box-border border-0 rounded-2xl shadow-md dark:bg-secondary-dark-bg'>
                  <div className='pt-4 px-4 text-[#344767] dark:text-white'>
                    <h6 className='text-base leading-relaxed tracking-[0.0075em] font-medium'>
                      Customer Information
                    </h6>
                  </div>
                  <label
                    className='px-4 pt-4 text-sm leading-normal tracking-[0.02857em] text-[#344767] dark:text-white font-bold'
                  >
                    Name
                  </label>
                  <div className='pt-1 px-4'>
                    <input
                      type='text'
                      className='border-solid border-1 w-[50%] bg-transparent dark:text-white'
                      defaultValue={selectedCustomer.name}
                      onChange={(e) => {
                        setSelectedCustomer({ ...selectedCustomer, name: e.target.value });
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
                        defaultValue={selectedCustomer.phone_number}
                        onChange={(e) => {
                          setSelectedCustomer({ ...selectedCustomer, phone_number: e.target.value });
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
                      defaultValue={selectedCustomer.email}
                      onChange={(e) => {
                        setSelectedCustomer({ ...selectedCustomer, email: e.target.value });
                      }}
                    />
                  </div>
                  <label
                    className='px-4 pt-4 text-sm leading-normal tracking-[0.02857em] text-[#344767] dark:text-white font-bold'
                  >
                    Addres
                  </label>
                  <div className='pt-1 px-4 pb-4'>
                    <textarea
                      className='border-solid border-1 w-[50%] dark:text-white bg-transparent'
                      defaultValue={selectedCustomer.address}
                      onChange={(e) => {
                        setSelectedCustomer({ ...selectedCustomer, address: e.target.value });
                      }}
                    />
                  </div>
                  <div className='flex justify-between p-4'>
                    <button
                      type='button'
                      className='bg-red-300 rounded-lg px-4 py-1 text-red-700 text-base tracking-wider font-semibold shadow-md hover:scale-105 hover:bg-red-200 hover:text-red-600'
                      onClick={() => setIsCardClicked(false)}
                    >
                      Cancel
                    </button>
                    <div className='flex justify-end gap-2'>
                      <button
                        type='button'
                        className='bg-yellow-300 rounded-lg px-4 py-1 text-yellow-700 text-base tracking-wider font-semibold shadow-md hover:scale-105 hover:bg-yellow-200 hover:text-yellow-600'
                        onClick={() => {
                          console.log(selectedCustomer);
                          const index = customers.findIndex(customer => customer.id === selectedCustomer.id);
                          customers.splice(index, 1);
                          const validation = customers.filter(customer => customer.name === selectedCustomer.name || customer.phone_number === selectedCustomer.phone_number).length;
                          if (validation > 0) {
                            toast.error('Customer already exists!');
                          } else if (selectedCustomer.name === '' || selectedCustomer.phone_number === '') {
                            toast.error('Name and phone number must be filled!');
                          } else {
                            editCustomer.mutate(selectedCustomer);
                          }
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type='button'
                        className='bg-green-300 rounded-lg px-4 py-1 text-green-700 text-base tracking-wider font-semibold shadow-md hover:scale-105 hover:bg-green-200 hover:text-green-600'
                        onClick={() => {
                          setDataCustomer(selectedCustomer)
                          setIsCardClicked(false)
                        }}
                      >
                        Choose
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
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
            <div className='flex mt-3 flex-wrap gap-3 items-center'>
              {customers.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()) || item.phone_number.includes(searchValue)).map((customer) => (
                <button
                  key={customer.id}
                  className='bg-white dark:bg-secondary-dark-bg shadow rounded-lg w-36 h-[216px] hover:drop-shadow-xl'
                  onClick={() => {
                    setIsCardClicked(true)
                    setSelectedCustomer(customer)
                  }}
                >
                  <div 
                    className='text-6xl w-36 h-28 font-medium rounded-t-lg text-white text-center py-6'
                    style={{backgroundColor: currentColor}}
                  >
                    {customer.name.split(' ').slice(0,2).map(word => word.charAt(0))}
                  </div>
                  <div className='flex flex-col justify-between h-[104px] text-[#344767] dark:text-gray-200'>
                    <div className='mx-2 mt-2 text-center text-sm font-medium'>
                      <span className='text-base font-bold'>{customer.name}</span>
                      <span className='block text-xs'>{customer.phone_number}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        ))}
      </div>
    </dialog>
  )
}

export default ModalCustomer;
