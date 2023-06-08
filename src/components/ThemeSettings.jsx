import React from 'react';
import { GrClose } from 'react-icons/gr';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { BsCheck } from 'react-icons/bs';

import { useStateContext } from '../contexts/ContextProvider';

const themeColors = [
    {
        name: 'blue-theme',
        color: '#1A97F5',
    },
    {
        name: 'green-theme',
        color: '#03C9D7',
    },
    {
        name: 'purple-theme',
        color: '#7352FF',
    },
    {
        name: 'red-theme',
        color: '#FF5C8E',
    },
    {
        name: 'indigo-theme',
        color: '#1E4DB7',
    },
    {
        color: '#FB9678',
        name: 'orange-theme',
    }
];

const ThemeSettings = () => {
  const { setColor, setMode, currentMode, currentColor, setThemeSettings } = useStateContext();

  return (
    <div className='w-screen whitespace-nowrap fixed nav-item top-0 right-0'>
      <div className='float-right h-screen dark:text-gray-200 bg-white dark:bg-secondary-dark-bg w-[360px] px-[0.625rem] shadow-lg overflow-y-auto transition-[right] duration-[250ms] delay-[0ms] text-opacity-[0.87] text-[#344767] flex flex-col z-[1200] bg-opacity-80 backdrop-saturate-[200%] backdrop-blur-[1.875rem]'>
        <div className='flex justify-between items-baseline p-6 pb-[6.4px] text-[#344767] dark:text-gray-200'>
          <p className='font-medium text-xl leading-[1.375]'>Theme Settings</p>
          <button
            type='button'
            onClick={() => setThemeSettings(false)}
            className='text-base hover:drop-shadow-xl hover:bg-light-gray select-none w-[1em] h-[1em] overflow-hidden inline-block text-center flex-shrink-0 stroke-[#344767] stroke-[2px] cursor-pointer mt-4 font-bold'
          >
            <GrClose />
          </button>
        </div>
        <hr className='flex-shrink-0 border-0 h-[0.0625rem] my-4 bg-gradient-to-r from-[#34476700] via-[#34476780] to-[#34476700] opacity-25' />
        <div className='flex-col p-6 pt-[10px] text-[#344767] dark:text-gray-200'>
          <p className='font-medium text-base leading-[1.625] tracking-[0.0075em]'>
            Theme Options
          </p>
          <div className='mt-4'>
            <input
              type='radio'
              id='light'
              name='theme'
              value='Light'
              className='cursor-pointer'
              onChange={setMode}
              checked={currentMode === 'Light'}
            />
            <label
              htmlFor='light'
              className='ml-2 text-md cursor-pointer'
            >
              Light
            </label>
          </div>
          <div className='mt-4'>
            <input
              type='radio'
              id='dark'
              name='theme'
              value='Dark'
              className='cursor-pointer'
              onChange={setMode}
              checked={currentMode === 'Dark'}
            />
            <label
              htmlFor='dark'
              className='ml-2 text-md cursor-pointer'
            >
              Dark
            </label>
          </div>
        </div>
        <hr className='flex-shrink-0 border-0 h-[0.0625rem] my-4 bg-gradient-to-r from-[#34476700] via-[#34476780] to-[#34476700] opacity-25' />
        <div className='flex-col p-6 pt-[10px] text-[#344767] dark:text-gray-200'>
          <p className='font-medium text-base leading-[1.625] tracking-[0.0075em] mb-3'>
            Color Options
          </p>
          <div className='flex mb-1'>
            {themeColors.map((item, index) => (
              <TooltipComponent
                key={index}
                content={item.name}
                position='TopCenter'
              >
                <div className='relative cursor-pointer mr-2 inline-flex gap-5 items-center box-border outline-0 select-none align-middle appearance-none text-center text-2xl rounded-[50%] overflow-visible text-opacity-[0.54] w-10 h-10'>
                  <button
                    type='button'
                    className='h-10 w-10 rounded-full cursor-pointer'
                    style={{ backgroundColor: item.color }}
                    onClick={() => setColor(item.color)}
                  >
                    <BsCheck className={`ml-2 text-2xl text-white ${item.color === currentColor ? 'block' : 'hidden'}`} />
                  </button>
                </div>
              </TooltipComponent>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
