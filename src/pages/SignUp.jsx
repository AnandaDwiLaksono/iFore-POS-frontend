import React, { useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

import { FooterAuth } from '../components';

const SignUp = () => {
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);

    const onClickPasswordEye = (e) => {
        e.preventDefault();
        setIsPasswordHidden((prev) => {
          return !prev;
        });
    };

  return (
    <>
        <div className='min-h-[50vh] m-4 pt-12 pb-56 rounded-xl bg-signup bg-center bg-no-repeat bg-cover'>
            <div className='box-border flex flex-col flex-wrap justify-center text-center text-white'>
                <div className='mt-12 mb-2'>
                    <h1 className='text-5xl leading-tight font-bold'>
                        Welcome!
                    </h1>
                </div>
                <div className='mb-4'>
                    <p className='text-base leading-relaxed font-normal'>
                    Use iFORE for free to manage your store finances and increase your store sales.
                    </p>
                </div>
            </div>
        </div>
        <div className='-mt-52 px-4'>
            <div className='box-border flex flex-row flex-wrap justify-center'>
                <div className='text-[#344767] transition-shadow duration-300 overflow-hidden flex flex-col relative min-w-0 break-words bg-white bg-clip-border border-solid border-0 border-black rounded-2xl shadow-lg'>
                    <div className='p-6 mb-2 text-center'>
                        <h5 className='text-xl leading-snug font-medium'>
                            Register with
                        </h5>
                    </div>
                    <div className='mb-4 flex justify-center'>
                        <button className='flex gap-2 relative box-border outline-0 m-0 cursor-pointer align-middle appearance-none min-w-[64px] border border-solid border-[#e9ecef] text-xs font-bold rounded-lg leading-none items-center uppercase select-none transition-all ease-in delay-0 min-h-[2.625rem] py-3 px-6 hover:bg-transparent hover:bg-[#e9ecef] hover:opacity-75 hover:scale-[1.02] hover:border-1 hover:border-solid shadow-md'>
                            <svg width="24px" height="32px" viewBox="0 0 64 64" version="1.1">
                                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g transform="translate(3.000000, 2.000000)" fillRule="nonzero">
                                        <path
                                            d="M57.8123233,30.1515267 C57.8123233,27.7263183 57.6155321,25.9565533 57.1896408,24.1212666 L29.4960833,24.1212666 L29.4960833,35.0674653 L45.7515771,35.0674653 C45.4239683,37.7877475 43.6542033,41.8844383 39.7213169,44.6372555 L39.6661883,45.0037254 L48.4223791,51.7870338 L49.0290201,51.8475849 C54.6004021,46.7020943 57.8123233,39.1313952 57.8123233,30.1515267"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M29.4960833,58.9921667 C37.4599129,58.9921667 44.1456164,56.3701671 49.0290201,51.8475849 L39.7213169,44.6372555 C37.2305867,46.3742596 33.887622,47.5868638 29.4960833,47.5868638 C21.6960582,47.5868638 15.0758763,42.4415991 12.7159637,35.3297782 L12.3700541,35.3591501 L3.26524241,42.4054492 L3.14617358,42.736447 C7.9965904,52.3717589 17.959737,58.9921667 29.4960833,58.9921667"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M12.7159637,35.3297782 C12.0932812,33.4944915 11.7329116,31.5279353 11.7329116,29.4960833 C11.7329116,27.4640054 12.0932812,25.4976752 12.6832029,23.6623884 L12.6667095,23.2715173 L3.44779955,16.1120237 L3.14617358,16.2554937 C1.14708246,20.2539019 0,24.7439491 0,29.4960833 C0,34.2482175 1.14708246,38.7380388 3.14617358,42.736447 L12.7159637,35.3297782"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M29.4960833,11.4050769 C35.0347044,11.4050769 38.7707997,13.7975244 40.9011602,15.7968415 L49.2255853,7.66898166 C44.1130815,2.91684746 37.4599129,0 29.4960833,0 C17.959737,0 7.9965904,6.62018183 3.14617358,16.2554937 L12.6832029,23.6623884 C15.0758763,16.5505675 21.6960582,11.4050769 29.4960833,11.4050769"
                                            fill="#EB4335"
                                        />
                                    </g>
                                </g>
                            </svg>
                            <p className='text-[#344767]'>
                                Google Account
                            </p>
                        </button>
                    </div>
                    <div className='relative py-0.5 text-[#344767] px-6'>
                        <hr className='border-0 border-solid border-black border-opacity-[0.12] h-[1px] my-4 opacity-25 bg-gradient-to-r from-white via-slate-700 to-white' />
                        <div className='absolute top-1/2 left-1/2 px-3 leading-[1] -translate-x-1/2 -translate-y-[60%] bg-white'>
                            <span className='m-0 text-sm leading-[1.5] tracking-[0.02857em] text-[#8392ab] font-medium'>
                                or
                            </span>
                        </div>
                    </div>
                    <div className='p-6 pt-4'>
                        <form>
                            <div className='mb-4'>
                                <div className='tracking-[0.00938em] box-border relative cursor-text py-2 px-3 border border-solid border-gray-300 rounded-lg pointer-events-auto grid place-items-center w-full h-auto text-14 font-normal leading-[1.4] text-[#495057] bg-white bg-clip-padding appearance-none transition-all ease-in delay-[0s]'>
                                    <input 
                                        className='border-0 box-content m-0 block min-w-0 h-[1.375rem] w-full p-0 focus:outline-0 focus-visible:outline-offset-0'
                                        type='text'
                                        name='shopName'
                                        placeholder='Shop Name'
                                    />
                                </div>
                            </div>
                            <div className='mb-4'>
                                <div className='tracking-[0.00938em] box-border relative cursor-text py-2 px-3 border border-solid border-gray-300 rounded-lg pointer-events-auto grid place-items-center w-full h-auto text-14 font-normal leading-[1.4] text-[#495057] bg-white bg-clip-padding appearance-none transition-all ease-in delay-[0s]'>
                                    <input 
                                        className='border-0 box-content m-0 block min-w-0 h-[1.375rem] w-full p-0 focus:outline-0 focus-visible:outline-offset-0'
                                        type='text'
                                        name='phoneNumber'
                                        placeholder='Phone Number'
                                    />
                                </div>
                            </div>
                            <div className='mb-4'>
                                <div className='tracking-[0.00938em] box-border relative cursor-text py-2 px-3 border border-solid border-gray-300 rounded-lg pointer-events-auto grid place-items-center w-full h-auto text-14 font-normal leading-[1.4] text-[#495057] bg-white bg-clip-padding appearance-none transition-all ease-in delay-[0s]'>
                                    <input 
                                        className='border-0 box-content m-0 block min-w-0 h-[1.375rem] w-full p-0 focus:outline-0 focus-visible:outline-offset-0'
                                        type='email'
                                        name='email'
                                        placeholder='Email'
                                    />
                                </div>
                            </div>
                            <div className='mb-4'>
                                <div className='tracking-[0.00938em] box-border relative cursor-text py-2 px-3 border border-solid border-gray-300 rounded-lg pointer-events-auto grid place-items-center w-full h-auto text-14 font-normal leading-[1.4] text-[#495057] bg-white bg-clip-padding appearance-none transition-all ease-in delay-[0s]'>
                                    <input 
                                        className='border-0 box-content m-0 block min-w-0 h-[1.375rem] w-full p-0 focus:outline-0 focus-visible:outline-offset-0'
                                        type={isPasswordHidden ? 'password' : 'text'}
                                        name='password'
                                        placeholder='Password'
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
                                <button className='relative box-border outline-0 border-0 m-0 cursor-pointer align-middle appearance-none tracking-[0.02857em] min-w-[64px] w-full inline-flex justify-center items-center text-xs font-bold rounded-lg leading-[1.4] text-center uppercase select-none transition-all ease-in delay-[0s] min-h-[2.5rem] py-3 px-6 bg-gradient-to-tl from-[#141727] to-[#3a416f] text-white bg-cover active:opacity-[0.85] active:shadow-md active:focus:opacity-[0.85] active:focus:shadow-md active:hover:opacity-[0.85] active:hover:shadow-md hover:bg-[#17c1e8] hover:scale-[1.02] shadow-md'>
                                    sign up
                                </button>
                            </div>
                            <div className='mt-6 text-center text-[#344767]'>
                                <span className='m-0 text-sm leading-normal tracking-[0.02857em] opacity-100 transform-none text-[#67748e] font-normal'>
                                    Already have an account?&nbsp;
                                    <a
                                        className='text-transparent font-bold bg-gradient-to-tl from-[#141727] to-[#3a416f] inline-block bg-clip-text relative z-[1]'
                                        href='/auth/login'
                                    >
                                        Sign in
                                    </a>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <FooterAuth />
    </>
  );
};

export default SignUp;
