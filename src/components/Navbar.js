import React from 'react';
import { Divider } from '@mui/material';

export default function Navbar(props) {
  return (
    <div className='w-full flex justify-center'>
      <ul className='flex flex-wrap text-sm text-white font-medium text-center border-b bg-[#4B449D] rounded-lg h-[46px]'>
        {(props.menuTabs || []).map((tab, index, array) => (
          <>
            <li key={tab}>
              <a href='#' className={`rounded-lg text-white btn border-none bg-[#4B449D] btn-sm h-full ${props.activeTab === tab ? 'border-b-2 border-indigo-600' : 'hover:bg-[#38327D]'}`} onClick={() => props.setActiveTab(tab)}>
                {tab}
              </a>
            </li>
            {index !== array.length - 1 && <Divider orientation='vertical' variant='middle' flexItem sx={{ borderWidth: '1px', borderColor: 'white', marginRight: '5px', marginLeft: '5px' }} />}
          </>
        ))}
      </ul>
    </div>
  );
}
