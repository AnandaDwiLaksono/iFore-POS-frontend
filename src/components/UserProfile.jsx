import React from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';

import { Button } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../assets/img/Logo_Unicloud.jpg';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { currentColor, setIsClicked } = useStateContext();

  const userProfileData = [
    {
      icon: <BsCurrencyDollar />,
      title: 'profile',
      desc: 'Account Settings',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
    }
  ];

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 float-right dark:text-gray-200 shadow-lg overflow-y-auto transition-[right] duration-[250ms] delay-[0ms] text-opacity-[0.87] text-[#344767] bg-opacity-80 backdrop-saturate-[200%] backdrop-blur-[1.875rem] h-[80vh]">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-xl leading-[1.375] dark:text-gray-200">
          Store Profile
        </p>
        <Button
          icon={<GrClose />}
          color="#99aab4"
          bgHoverColor="light-gray"
          size="xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24 shadow"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            Unicloud
          </p>
          <p className="text-gray-500 text-base font-normal dark:text-gray-400">
            Vape Store
          </p>
          <p className="text-gray-500 text-xs font-extralight dark:text-gray-400">
            Jl. Pattimura Gg. 1 No. 1, RT 003 / RW 008, Kel. Sisir, Kec. Batu, Kota Batu, Jawa Timur (65315)
          </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <Link
            key={index}
            to={`/${item.title}`}
            onClick={() => setIsClicked(false)}
          >
            <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className=" text-xl rounded-lg p-3 shadow-md"
              >
                {item.icon}
              </button>

              <div>
                <p className="font-semibold dark:text-gray-200 capitalize">{item.title}</p>
                <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Login"
          borderRadius="10px"
          width="full"
        />
      </div>
    </div>
  );
};

export default UserProfile;
