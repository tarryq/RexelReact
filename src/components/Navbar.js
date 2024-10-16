import React from 'react';
import { Divider } from '@mui/material';

export default function Navbar(props) {
  const handleSubMenuClick = (subMenu) => {
    props.setActiveTab(subMenu);
  };

  return (
    <div className='w-full flex justify-center'>
      <ul className='flex flex-wrap text-sm text-white font-medium text-center border-b bg-[#4B449D] rounded-lg h-[46px]'>
        {(props.menuTabs || []).map((tab, index, array) => (
          <>
            <li key={tab}>
              {tab === 'Maintenance' ? (
                <div className="dropdown dropdown-hover h-full">
                  <label tabIndex={0} className={`flex items-center rounded-lg text-white btn border-none bg-[#4B449D] btn-sm h-full ${props.activeTab === tab ? 'border-b-2 border-indigo-600' : 'hover:bg-[#38327D]'
                    }`}>
                    {tab}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1 inline-block">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </label>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-md bg-[#f0f2f5] rounded-box w-40 text-[#4B449D]">
                    <li><a onClick={() => handleSubMenuClick('Accounts')}>Accounts</a></li>
                    <li><a onClick={() => handleSubMenuClick('Store')}>Store</a></li>
                  </ul>
                </div>
              ) : (
                <button
                  className={`rounded-lg text-white btn border-none bg-[#4B449D] btn-sm h-full ${props.activeTab === tab ? 'border-b-2 border-indigo-600' : 'hover:bg-[#38327D]'
                    }`}
                  onClick={() => props.setActiveTab(tab)}
                >
                  {tab}
                </button>
              )}
            </li>
            {index !== array.length - 1 && (
              <Divider orientation='vertical' variant='middle' flexItem sx={{ borderWidth: '1px', borderColor: 'white', marginRight: '5px', marginLeft: '5px' }} />
            )}
          </>
        ))}
      </ul>
    </div>
  );
}