import React from 'react';
import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebookSquare, FaLinkedin, FaPinterestSquare, FaTwitterSquare } from 'react-icons/fa';

const FooterAuth = () => {
    return (
        <footer className='py-12'>
            <div className='box-border flex flex-row flex-wrap w-full justify-center'>
                <div className='basis-5/6 flex-grow-0 max-w-[83.3333%]'>
                    <div className='flex justify-center flex-wrap mb-6'>
                        <div className='mr-4'>
                            <a 
                                className='text-base font-normal leading-[1.6] tracking-[0.01071em] text-[#8392ab]'
                                href='/'
                            >
                                Company
                            </a>
                        </div>
                        <div className='mr-4'>
                            <a 
                                className='text-base font-normal leading-[1.6] tracking-[0.01071em] text-[#8392ab]'
                                href='/'
                            >
                                About Us
                            </a>
                        </div>
                        <div className='mr-4'>
                            <a 
                                className='text-base font-normal leading-[1.6] tracking-[0.01071em] text-[#8392ab]'
                                href='/'
                            >
                                Team Product
                            </a>
                        </div>
                        <div className='mr-4'>
                            <a 
                                className='text-base font-normal leading-[1.6] tracking-[0.01071em] text-[#8392ab]'
                                href='/'
                            >
                                Blog
                            </a>
                        </div>
                        <div className='mr-4'>
                            <a 
                                className='text-base font-normal leading-[1.6] tracking-[0.01071em] text-[#8392ab]'
                                href='/'
                            >
                                Pricing
                            </a>
                        </div>
                    </div>
                </div>
                <div className='basis-full flex-grow-0 max-w-full'>
                    <div className='flex justify-center mt-2 mb-6'>
                        <div className='mr-6 text-[#8392ab]'>
                            <FaFacebookSquare className='w-5 h-5'/>
                        </div>
                        <div className='mr-6 text-[#8392ab]'>
                            <FaTwitterSquare className='w-5 h-5'/>
                        </div>
                        <div className='mr-6 text-[#8392ab]'>
                            <AiFillInstagram className='w-5 h-5'/>
                        </div>
                        <div className='mr-6 text-[#8392ab]'>
                            <FaPinterestSquare className='w-5 h-5'/>
                        </div>
                        <div className='mr-6 text-[#8392ab]'>
                            <FaLinkedin className='w-5 h-5'/>
                        </div>
                    </div>
                </div>
                <div className='basis-full flex-grow-0 max-w-full text-center'>
                    <p className='text-base font-normal leading-[1.6] tracking-[0.01071em] text-[#8392ab]'>
                        Copyright © 2023 iFORE by Ananda Dwi Laksono.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default FooterAuth;
