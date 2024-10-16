import React, { useState, useEffect } from 'react';
import { accounts } from '../data-schemas/accountsData';
import Navbar from './Navbar';

export default function ManageAccount(props) {
  const [selectedStore, setSelectedStore] = useState('');
  const [availableAccounts, setAvailableAccounts] = useState([]);
  const [availableStores, setAvailableStores] = useState([]);
  const [activeTab, setActiveTab] = useState('Products');

  const [selectedAccount, setSelectedAccount] = useState('');
  const { currentUser } = props;

  useEffect(() => {
    if (currentUser) {
      if (currentUser.usertype === 'admin') {
        setAvailableAccounts(accounts);
        setSelectedAccount(accounts[0].account);
        setAvailableStores(accounts[0].store);
        setSelectedStore(accounts[0].store[0]);
      } else if (currentUser.usertype === 'account') {
        const userAccount = accounts.find((acc) => acc.account === currentUser.accountname);
        setAvailableAccounts([userAccount]);
        setSelectedAccount(userAccount.account);
        setAvailableStores(userAccount.store);
        setSelectedStore(userAccount.store[0]);
      } else if (currentUser.usertype === 'store') {
        const userAccount = accounts.find((acc) => acc.account === currentUser.accountname);
        setAvailableAccounts([userAccount]);
        setSelectedAccount(userAccount.account);
        setAvailableStores([currentUser.storename]);
        setSelectedStore(currentUser.storename);
      }
    }
  }, [currentUser]);

  const handleAccountChange = (event) => {
    const newSelectedAccount = event.target.value;
    setSelectedAccount(newSelectedAccount);
    const account = accounts.find((acc) => acc.account === newSelectedAccount);
    if (account) {
      setAvailableStores(account.store);
      setSelectedStore(account.store[0]);
    } else {
      setAvailableStores([]);
      setSelectedStore('');
    }
  };

  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
  };

  const selectedAccountData = accounts.find((acc) => acc.account === selectedAccount);

  return (
    <div className='h-auto flex flex-col bg-gray-100 px-6'>

      {/* account dropdown in row */}

      {/* <div className='flex items-center justify-between mt-5' style={{ minHeight: '100px' }}>
        <div className='flex-1 flex justify-center items-center'>{selectedAccountData && selectedAccountData.logo && <div dangerouslySetInnerHTML={{ __html: selectedAccountData.logo }} />}</div>
        <div className='flex gap-10 items-center ml-auto'>
          <div className='form-control'>
            <span className='label-text'>Account</span>
            <select className='select select-bordered select-sm' style={{ width: '200px' }} value={selectedAccount} onChange={handleAccountChange} disabled={currentUser?.usertype !== 'admin'}>
              {availableAccounts.map((account) => (
                <option key={account.account} value={account.account}>
                  {account.account}
                </option>
              ))}
            </select>
          </div>
          <div className='form-control'>
            <span className='label-text'>Store</span>
            <select className='select select-bordered select-sm' style={{ width: '200px' }} value={selectedStore} onChange={handleStoreChange} disabled={currentUser?.usertype === 'store'}>
              {availableStores.map((store) => (
                <option key={store} value={store}>
                  {store}
                </option>
              ))}
            </select>
          </div>
          <div className='form-control items-center mt-4'>
            <div className='text-sm'>
              <p>
                Items In Cart: <span className='font-semibold'>0</span>
              </p>
              <p>
                Cart Subtotal: <span className='font-semibold'>$0.00</span>
              </p>
            </div>
          </div>
        </div>
      </div> */}
      

      {/*  account dropdown in column */}

      <div className='flex items-center justify-between mt-5 mb-2' style={{ minHeight: '100px' }}>
        <div className='w-1/2 md:w-2/3  flex justify-center items-center'>{selectedAccountData && selectedAccountData.logo && <div dangerouslySetInnerHTML={{ __html: selectedAccountData.logo }} />}</div>       
        <div className="flex w-1/2 md:w-1/3  flex-col gap-4 justify-start">
          <div className='flex items-center'>
            <label className="block text-sm font-medium text-gray-700 w-[140px]">Account :</label>
            <select
              className="block w-full border-gray-300 select select-bordered select-sm"
              value={selectedAccount}
              onChange={handleAccountChange}
              disabled={currentUser?.usertype !== 'admin'}
            >
              {availableAccounts.map((account) => (
                <option key={account.account} value={account.account}>
                  {account.account}
                </option>
              ))}
            </select>
          </div>

          <div className='flex items-center'>
            <label className="block text-sm font-medium text-gray-700 w-[140px]">Store :</label>
            <select
              className="block w-full border-gray-300 select select-bordered select-sm"
              value={selectedStore}
              onChange={handleStoreChange}
              disabled={currentUser?.usertype === 'store'}
            >
              {availableStores.map((store) => (
                <option key={store} value={store}>
                  {store}
                </option>
              ))}
            </select>
          </div>

          <div className='flex items-center'>
            <label className="block text-sm font-medium text-gray-700 w-[140px]">Items In Cart :</label>
            <p className="font-semibold">0</p>
          </div>

          <div className='flex items-center'>
            <label className="block text-sm font-medium text-gray-700 w-[140px]">Cart subtotal :</label>
            <p className="font-semibold">$0.00</p>
          </div>
        </div>
      </div>

      <Navbar setActiveTab={setActiveTab} menuTabs={currentUser?.menu} />

      <div className='bg-white shadow-md rounded-b-lg p-6 mt-2'>
        <h2 className='text-2xl font-bold mb-4'>Dashboard Content</h2>
        <p>Active Tab: {activeTab}</p>
        <p>Welcome, {currentUser?.name}!</p>
        <p>User Type: {currentUser?.usertype}</p>
        <p>Email: {currentUser?.email}</p>
      </div>
    </div>
  );
}
