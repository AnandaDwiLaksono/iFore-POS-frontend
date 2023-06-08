import React, { useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

import { FooterAuth } from '../components';

const SignIn = () => {
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);

    const onClickPasswordEye = (e) => {
        e.preventDefault();
        setIsPasswordHidden((prev) => {
          return !prev;
        });
    };

    return (
        <>
            <div className='box-border flex flex-row flex-wrap w-full justify-center min-h-[75vh] m-0'>
                <div className='basis-11/12 grow-0 max-w-[91.6667%] md:basis-5/12 md:max-w-[41.6667%] sm:basis-2/3 sm:max-w-[66.6667%]'>
                    <div className='mt-40'>
                        <div className='pt-6 px-6'>
                            <div className='mb-2'>
                                <h3 className='text-3xl leading-snug tracking-normal text-transparent font-bold bg-gradient-to-tl from-[#2152ff] to-[#21d4fd] inline-block bg-clip-text relative z-[1]'>
                                    Welcome back
                                </h3>
                            </div>
                            <p className='text-base leading-[1.6] tracking-[0.01071em] text-[#67748e] font-normal'>
                                Enter your email and password to sign in
                            </p>
                        </div>
                        <div className='p-6'>
                            <form>
                                <div className='mb-4'>
                                    <div className='mb-2 ml-1'>
                                        <label className='text-xs leading-tight tracking-[0.03333em] text-[#344767] font-bold'>
                                            Email
                                        </label>
                                    </div>
                                    <div className='tracking-[0.00938em] box-border relative cursor-text py-2 px-3 border-[0.0625rem] border-solid border-[#d2d6da] rounded-lg pointer-events-auto grid place-items-center w-full h-auto text-sm font-normal leading-[1.4] text-[#495057] bg-white bg-clip-padding appearance-none transition-all ease-in delay-[0s]'>
                                        <input 
                                            placeholder='Email'
                                            type='email'
                                            className='focus:outline-0 border-0 box-content m-0 block min-w-0 h-[1.375rem] w-full p-0 focus-visible:outline-offset-0'
                                        />
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <div className='mb-2 ml-1'>
                                        <label className='text-xs leading-tight tracking-[0.03333em] text-[#344767] font-bold'>
                                            Password
                                        </label>
                                    </div>
                                    <div className='tracking-[0.00938em] box-border relative cursor-text py-2 px-3 border-[0.0625rem] border-solid border-[#d2d6da] rounded-lg pointer-events-auto grid place-items-center w-full h-auto text-sm font-normal leading-[1.4] text-[#495057] bg-white bg-clip-padding appearance-none transition-all ease-in delay-[0s]'>
                                        <input 
                                            placeholder='Password'
                                            type={isPasswordHidden ? 'password' : 'text'}
                                            className='focus:outline-0 border-0 box-content m-0 block min-w-0 h-[1.375rem] w-full p-0 focus-visible:outline-offset-0'
                                        />
                                        <div
                                            className='absolute top-1/2 -translate-y-1/2 right-[4%] cursor-pointer'
                                            onClick={(e) => {onClickPasswordEye(e)}}
                                        >
                                            {isPasswordHidden ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-8 mb-2'>
                                    <button
                                        type='button'
                                        className='active:opacity-[0.85] active:shadow-md focus:active:opacity-[0.85] focus:active:shadow-md hover:active:opacity-[0.85] hover:active:shadow-md hover:bg-[#17c1e8] hover:scale-[1.02] relative box-border outline-0 border-0 m-0 cursor-pointer align-middle appearance-none tracking-[0.02857em] min-w-[64px] w-full inline-flex justify-center items-center text-xs font-bold rounded-lg leading-[1.4] text-center uppercase select-none transition-all ease-in delay-[0s] min-h-[2.5rem] py-3 px-6 bg-gradient-to-tl from-[#2152ff] to-[#21d4fd] text-white bg-cover shadow-md'
                                    >
                                        Sign in
                                    </button>
                                </div>
                                <div className='mt-6 text-center'>
                                    <span className='text-sm leading-normal tracking-[0.02857em] text-[#67748e] font-normal'>
                                        Don't have an account?&nbsp;
                                        <a
                                            className='text-transparent font-medium bg-gradient-to-tl from-[#2152ff] to-[#21d4fd] inline-block bg-clip-text relative z-[1] focus-visible:outline-offset-1'
                                            href='/auth/register'
                                        >Sign up</a>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='basis-full grow-0 max-w-full md:basis-5/12 md:max-w-[41.6667%] box-border m-0'>
                    <div className='md:block md:-right-48 h-full relative -mr-32 opacity-100 bg-transparent text-[#344767] -skew-x-[10deg] overflow-hidden rounded-bl-xl'>
                        <div className='-ml-16 h-full opacity-100 text-[#344767] skew-x-[10deg] bg-signin bg-cover'></div>
                    </div>
                </div>
            </div>
            <FooterAuth />
        </>
    );
};

export default SignIn;
