import React, { useEffect } from 'react';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { AiOutlineMenu } from 'react-icons/ai';

import { useStateContext } from '../contexts/ContextProvider';
import Logo from '../assets/img/Logo_Unicloud.jpg';
import { Link } from 'react-router-dom';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title}
    position='BottomCenter'
  >
    <button type='button'
      onClick={customFunc}
      style={{ color }}
      className='relative text-xl rounded-full p-3 hover:bg-light-gray'
    >
      <span style={{ background: dotColor }}
        className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { setActiveMenu, screenSize, setScreenSize, currentColor } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);
  

  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      <NavButton title='Menu' 
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />

      <Link to='/profile'>
        <div className='flex'>
          <TooltipComponent content='Profile'
            position='BottomCenter'
          >
            <div className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg'
              // onClick={() => setIsClicked(true)}
            >
              <img className='rounded-full w-8 h-8 shadow-md'
                src={Logo}
                alt='avatar'
              />
              <p className='text-gray-400 text-14 font-bold ml-1'>Unicloud</p>
              {/* <MdKeyboardArrowDown className='text-gray-400 text-14' /> */}
            </div>
          </TooltipComponent>

          {/* {isClicked && <UserProfile />} */}
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
