import React from 'react';
import { Divider } from '@mui/material';

export default function Header(props) {
  const currentUser = props.currentUser;
  return (
    <div className='h-[10vh] w-full flex items-center justify-between px-5 bg-white shadow-md' style={{ position: 'sticky', top: 0, zIndex: '100' }}>
      <div className='flex items-center'>
        <div className='flex items-center'>
          <img src='/assets/capitol_light_logo.jpg' alt='Capitol Light logo' className='h-12 mr-3' />
          <h1 className='text-2xl font-bold mr-4' style={{ color: '#4B449D' }}>
            CAPITOL <span className='ml-1'>LIGHT</span>
          </h1>
          <Divider orientation='vertical' variant='middle' flexItem sx={{ borderWidth: '1px' }} />
          <h2 className='hidden md:block text-lg ml-4' style={{ color: '#4B449D' }}>
            Store Replenishment and Management System
          </h2>
        </div>
      </div>
      <div className='flex items-center space-x-4'>
        <div className='mr-2'>
          <div className='flex items-center'>
            <label className='block text-sm font-medium text-gray-700 w-[140px]'>Items In Cart :</label>
            <p className='font-semibold'>0</p>
          </div>

          <div className='flex items-center'>
            <label className='block text-sm font-medium text-gray-700 w-[140px]'>Cart subtotal :</label>
            <p className='font-semibold'>$0.00</p>
          </div>
        </div>

        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='w-auto cursor-pointer'>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                dangerouslySetInnerHTML={{
                  __html: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 3 3" enable-background="new 0 0 60 60" xml:space="preserve"><path fill="#CCCCCC" d="m2.418 2.539 0.013 0.015c-0.25 0.224 -0.58 0.361 -0.942 0.361s-0.692 -0.136 -0.942 -0.36l0.014 -0.017s0.165 -0.131 0.359 -0.179 0.282 -0.184 0.282 -0.184v-0.238s-0.141 -0.189 -0.121 -0.32c0 0 -0.175 -0.116 -0.053 -0.286 0 0 -0.281 -0.807 0.432 -0.815 0.181 -0.002 0.27 0.135 0.27 0.135 0.483 -0.048 0.224 0.68 0.224 0.68 0.121 0.17 -0.053 0.286 -0.053 0.286 0.02 0.131 -0.121 0.32 -0.121 0.32v0.238s0.088 0.136 0.282 0.184c0.194 0.048 0.359 0.179 0.359 0.179"/><path fill="none" stroke="#555555" stroke-width="0.15000000000000002" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M2.418 2.539s-0.165 -0.131 -0.359 -0.179 -0.282 -0.184 -0.282 -0.184v-0.238s0.141 -0.189 0.121 -0.32c0 0 0.175 -0.116 0.053 -0.286 0 0 0.258 -0.728 -0.224 -0.68 0 0 -0.09 -0.137 -0.27 -0.135 -0.713 0.008 -0.432 0.815 -0.432 0.815 -0.121 0.17 0.053 0.286 0.053 0.286 -0.02 0.131 0.121 0.32 0.121 0.32v0.238s-0.088 0.136 -0.282 0.184c-0.194 0.048 -0.359 0.179 -0.359 0.179"/><path fill="none" stroke="#555555" stroke-width="0.15000000000000002" stroke-miterlimit="10" d="M0.547 2.556C0.258 2.297 0.076 1.921 0.076 1.504c0 -0.78 0.632 -1.412 1.412 -1.412C2.267 0.092 2.9 0.724 2.9 1.504c0 0.418 -0.181 0.793 -0.47 1.051 -0.25 0.224 -0.58 0.361 -0.942 0.361s-0.692 -0.136 -0.942 -0.36z"/></svg>`
                }}
              />
              <span className='ml-2 font-bold flex items-center' style={{ color: '#4B449D' }}>
                Hi, {currentUser?.name}
              </span>
            </div>
          </label>
          <ul tabIndex={0} className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'>
            <li>
              <a>{currentUser?.email}</a>
            </li>
            <li>
              <a onClick={() => props.handleLogout()}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
