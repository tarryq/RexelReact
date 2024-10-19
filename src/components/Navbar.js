import React, { useState } from 'react';
import { Divider } from '@mui/material';

export default function Menu(props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility

  const handleSubMenuClick = (subMenu) => {
    props.setActiveTab(subMenu);
    setIsDropdownOpen(false); // Close dropdown after clicking a submenu item
  };

  const { user, setActiveTab, activeTab, menuTabs } = props;

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState); // Toggle dropdown visibility
  };

  return (
    <div className='w-full flex justify-center'>
      <ul className='flex flex-wrap text-sm text-white font-medium text-center border-b bg-[#4B449D] rounded-lg min-h-[46px]'>
        {(menuTabs || []).map((tab, index, array) => (
          <React.Fragment key={tab}>
            <li className='relative'>
              {tab === 'Maintenance' ? (
                <div className='dropdown dropdown-hover h-full relative' onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                  <label tabIndex={0} onClick={toggleDropdown} className={`flex items-center rounded-lg text-white border-none bg-[#4B449D] h-full ${activeTab === tab ? 'bg-[#38327D]' : 'hover:bg-[#38327D]'}`}>
                    {tab}
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4 ml-1 inline-block'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                    </svg>
                  </label>
                  {(isDropdownOpen || true) && (
                    <ul className='dropdown-content menu p-2 shadow-md bg-[#f0f2f5] rounded-box w-40 text-[#4B449D] absolute'>
                      <li>
                        <a
                          onClick={() => handleSubMenuClick('Accounts')}
                          className={`block p-2 rounded-lg
                            ${activeTab === 'Accounts' ? 'bg-[#4B449D] text-white hover:text-[#4B449D]' : 'hover:bg-[#d1d5db] text-[#4B449D]'}
                            ${user?.usertype === 'account' || user?.usertype === 'store' ? 'pointer-events-none opacity-50' : ''}`}
                        >
                          Accounts
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => handleSubMenuClick('Store')}
                          className={`block p-2 rounded-lg
                            ${activeTab === 'Store' ? 'bg-[#4B449D] text-white hover:text-[#4B449D]' : 'hover:bg-[#d1d5db] text-[#4B449D]'}
                            ${user?.usertype === 'store' ? 'pointer-events-none opacity-50' : ''}`}
                        >
                          Store
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => handleSubMenuClick('Location')}
                          className={`block p-2 rounded-lg
                            ${activeTab === 'Location' ? 'bg-[#4B449D] text-white hover:text-[#4B449D]' : 'hover:bg-[#d1d5db] text-[#4B449D]'}
                            ${user?.usertype === 'Location' ? 'pointer-events-none opacity-50' : ''}`}
                        >
                          Location
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <button className={`rounded-lg text-white btn border-none bg-[#4B449D] btn-sm h-full ${activeTab === tab ? 'border-b-2 bg-[#38327D]' : 'hover:bg-[#38327D]'}`} onClick={() => setActiveTab(tab)}>
                  {tab}
                </button>
              )}
            </li>
            {index !== array.length - 1 && <Divider orientation='vertical' variant='middle' flexItem sx={{ borderWidth: '1px', borderColor: 'white', marginRight: '5px', marginLeft: '5px' }} />}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
