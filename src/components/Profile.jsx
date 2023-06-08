import React from 'react';

import avatar from '../assets/img/Logo_Unicloud.jpg';

const Profile = () => {
    return (
        <>
            <div className='p-6 relative'>
                <div className='flex items-center min-h-[18.75rem] bg-center bg-cover bg-profile rounded-2xl overflow-hidden'></div>
                <div className='text-black text-opacity-[0.87] transition-shadow duration-300 delay-[0ms] overflow-hidden flex flex-col min-w-0 break-words bg-clip-border border-0 rounded-2xl backdrop-saturate-200 backdrop-blur-[30px] bg-white bg-opacity-80 shadow-md -mt-[64px] mx-6 p-4'>
                    <div className='box-border flex flex-row flex-wrap items-center'>
                        <div className='justify-center leading-[1] select-none transition-all duration-200 ease-in-out delay-[0ms] rounded-xl font-bold shadow w-[4.625rem] h-[4.625rem] text-base'>
                            <img 
                                className='w-full text-center object-cover indent-[10000px] h-auto rounded-xl'
                                src={avatar}
                                alt='photo_profile'
                            />
                        </div>
                        <div className='h-full leading-[1] pl-6 text-[#344767]'>
                            <h5 className='text-xl leading-snug tracking-normal font-medium text-[#344767]'>
                                Unicloud
                            </h5>
                            <span className='text-sm leading-normal tracking-[0.02857em] text-[#344767] font-medium'>
                                Vape Store
                            </span>
                        </div>
                        <div className='md:pl-6 md:basis-1/2 flex-grow-0 md:max-w-[50%] box-border m-0 ml-auto basis-full max-w-full md:text-end text-center pt-6 md:pt-0'>
                            <button
                                type='button'
                                className=' bg-red-200 py-2 rounded-xl shadow-md text-red-500 md:w-[90px] w-[80%] hover:scale-105 font-semibold hover:bg-red-100 hover:text-red-400'
                            >
                                <a href='/auth/login'>Log out</a>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='mt-10 mb-6'>
                    <div className='box-border flex flex-row flex-wrap'>
                        <div className='md:px-6 pb-6 px-3 flex-grow-0 box-border basis-full max-w-full'>
                            <div className='text-black text-opacity-[0.87] transition-shadow duration-300 delay-[0ms] overflow-hidden flex flex-col relative min-w-0 break-words bg-white box-border border-0 rounded-2xl shadow-md'>
                                <div className='pt-4 px-4 text-[#344767]'>
                                    <h6 className='text-base leading-relaxed tracking-[0.0075em] font-medium'>
                                        Profile Settings
                                    </h6>
                                </div>
                                <div className='px-4 pt-4 leading-tight text-[#344767]'>
                                    <div className='flex flex-row gap-8 align-middle items-center'>
                                        <img 
                                            className='text-center object-cover indent-[10000px] rounded-xl shadow w-[4.625rem] h-[4.625rem]'
                                            src={avatar}
                                            alt='photo_profile'
                                        />
                                        <input
                                            type="file"
                                            id="img"
                                            name="img"
                                            accept="image/*"
                                        />
                                    </div>
                                </div>
                                <label
                                    for='name'
                                    className='px-4 pt-4 text-sm leading-normal tracking-[0.02857em] text-[#344767] font-bold'
                                >
                                    Shop Name
                                </label>
                                <div className='pt-1 px-4'>
                                    <input
                                        type='text'
                                        name='name'
                                        className='border-solid border-1 w-[50%]'
                                    />
                                </div>
                                <label
                                    for='no'
                                    className='px-4 pt-4 text-sm leading-normal tracking-[0.02857em] text-[#344767] font-bold'
                                >
                                    Phone Number
                                </label>
                                <div className='pt-1 px-4'>
                                    <input
                                        type='text'
                                        name='no'
                                        className='border-solid border-1 w-[50%]'
                                    />
                                </div>
                                <label
                                    for='email'
                                    className='px-4 pt-4 text-sm leading-normal tracking-[0.02857em] text-[#344767] font-bold'
                                >
                                    Email
                                </label>
                                <div className='pt-1 px-4'>
                                    <input
                                        type='numeric'
                                        name='email'
                                        className='border-solid border-1 w-[50%]'
                                    />
                                </div>
                                <label
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
                                </div>
                                <label
                                    className='px-4 pt-4 text-sm leading-normal tracking-[0.02857em] text-[#344767] font-bold'
                                >
                                    Addres
                                </label>
                                <div className='pt-1 px-4'>
                                    <textarea className='border-solid border-1 w-[50%]' />
                                </div>
                                <div className='p-4 text-right'>
                                    <button
                                        type='button'
                                        className='bg-green-300 rounded-lg px-4 py-1 text-green-700 text-base tracking-wider font-semibold shadow-md hover:scale-105 hover:bg-green-200 hover:text-green-600'
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
