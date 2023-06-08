import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { SiShopware } from 'react-icons/si';
import { AiOutlineCalendar, AiOutlineHistory } from 'react-icons/ai';
import { BsKanban } from 'react-icons/bs';
import { RxDashboard } from 'react-icons/rx';
import { MdOutlineInventory2 } from 'react-icons/md';
import { IoCartOutline } from 'react-icons/io5'
import { GrClose } from 'react-icons/gr';

import { useStateContext } from '../contexts/ContextProvider';

const menus = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'dashboard',
        icon: <RxDashboard />
      },
    ],
  },
  {
    title: 'Pages',
    links: [
      {
        name: 'transaction',
        icon: <IoCartOutline />
      },
      {
        name: 'transaction history',
        icon: <AiOutlineHistory />
      },
      {
        name: 'inventory',
        icon: <MdOutlineInventory2 />
      }
    ],
  },
  {
    title: 'Apps',
    links: [
      {
        name: 'calendar',
        icon: <AiOutlineCalendar />
      },
      {
        name: 'kanban',
        icon: <BsKanban />
      }
    ],
  },
];

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, currentColor } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    };
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 shadow-xl';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
      {activeMenu && (<>
        <div className='flex justify-between items-center'>
          <Link to='/'
            onClick={handleCloseSideBar}
            className='items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900'
          >
            <SiShopware /> <span>iFORE</span>
          </Link>
          <TooltipComponent content='Menu' position='BottomCenter'>
            <button type='button'
              onClick={() => setActiveMenu((prevActionMenu) => !prevActionMenu)}
              className='text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden'
            >
              <GrClose />
            </button>
          </TooltipComponent>
        </div>
        <div className='mt-10'>
          {menus.map((menu) => (
            <div key={menu.title}>
              <p className='text-gray-400 m-3 mt-4 uppercase'>
                {menu.title}
              </p>
              {menu.links.map((link) => (
                <NavLink to={`/${link.name}`}
                  key={link.name}
                  onClick={handleCloseSideBar}
                  className={({ isActive }) => isActive ? activeLink : normalLink}
                  style={({ isActive }) => ({backgroundColor: isActive ? currentColor : ''})}
                >
                  {link.icon}
                  <span className='capitalize'>{link.name}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      </>)}
    </div>
  );
};

export default Sidebar;
