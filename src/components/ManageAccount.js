import React, { useState, useEffect } from 'react';
import { accounts } from '../data-schemas/accountsData';
import { stores } from '../data-schemas/storeData';
import Navbar from './Navbar';
import AccountMaintenance from './AccountMaintenance'

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
        const defaultAccount = accounts[0];
        setSelectedAccount(defaultAccount.account);
        const filteredStores = stores.filter((store) => store.accountId === defaultAccount.accountId);
        setAvailableStores(filteredStores);
        setSelectedStore(filteredStores[0]?.storeName || '');
      } else if (currentUser.usertype === 'account') {
        const userAccount = accounts.find((acc) => acc.account === currentUser.accountname);
        setAvailableAccounts([userAccount]);
        setSelectedAccount(userAccount.account);
        // Filter stores based on account
        const filteredStores = stores.filter((store) => store.accountId === userAccount.accountId);
        setAvailableStores(filteredStores);
        setSelectedStore(filteredStores[0]?.storeName || '');
      } else if (currentUser.usertype === 'store') {
        const userAccount = accounts.find((acc) => acc.account === currentUser.accountname);
        setAvailableAccounts([userAccount]);
        setSelectedAccount(userAccount.account);
        // Find the specific store for the user
        const userStore = stores.find((store) => store.storeName === currentUser.storename && store.accountId === userAccount.accountId);
        setAvailableStores([userStore]);
        setSelectedStore(userStore?.storeName || '');
      }
    }
  }, [currentUser]);

  const handleAccountChange = (event) => {
    const newSelectedAccount = event.target.value;
    setSelectedAccount(newSelectedAccount);
    const account = accounts.find((acc) => acc.account === newSelectedAccount);
    if (account) {
      // Update available stores based on the selected account
      const filteredStores = stores.filter((store) => store.accountId === account.accountId);
      setAvailableStores(filteredStores);
      setSelectedStore(filteredStores[0]?.storeName || ''); // Set to first store or empty
    } else {
      setAvailableStores([]);
      setSelectedStore('');
    }
  };

  const handleSaveAccount = (updatedAccountDetails) => {
    // Update the account in your data source
    const updatedAccounts = accounts.map(acc =>
      acc.account === selectedAccount ? { ...acc, ...updatedAccountDetails } : acc
    );
    // You would typically send this update to your backend here
    console.log('Updated accounts:', updatedAccounts);
    // Update the local state if necessary
    setAvailableAccounts(updatedAccounts);
  };


  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
  };
  const selectedAccountData = accounts.find((acc) => acc.account === selectedAccount);

  return (
    <div className='min-h-[90vh] pb-4 h-auto flex flex-col bg-gray-100 px-6'>
      <div className='flex items-center justify-between my-4' style={{ minHeight: '100px' }}>
        <div className='w-[54%] flex flex-col'>
        <div className='self-end'>{selectedAccountData && selectedAccountData.logo && <div dangerouslySetInnerHTML={{ __html: selectedAccountData.logo }} />}</div>
        </div>
        <div className='flex flex-col gap-4 justify-start xs:ml-4 min-w-[30%]'>
          <div className='flex items-center'>
            <label className='block text-sm font-medium text-gray-700 w-[140px]'>Account :</label>
            <select className='block w-full border-gray-300 select select-bordered select-sm' value={selectedAccount} onChange={handleAccountChange} disabled={currentUser?.usertype !== 'admin'}>
              {availableAccounts.map((account) => (
                <option key={account.account} value={account.account}>
                  {account.account}
                </option>
              ))}
            </select>
          </div>

          <div className='flex items-center'>
            <label className='block text-sm font-medium text-gray-700 w-[140px]'>Store :</label>
            <select className='block w-full border-gray-300 select select-bordered select-sm' value={selectedStore} onChange={handleStoreChange} disabled={currentUser?.usertype === 'store'}>
              {availableStores.map((store) => (
                <option key={store.storeId} value={store.storeName}>
                  {store.storeName}
                </option>
              ))}
            </select>
          </div>

          <div className='flex items-center'>
            <label className='block text-sm font-medium text-gray-700 w-[140px]'>Items In Cart :</label>
            <p className='font-semibold'>0</p>
          </div>

          <div className='flex items-center'>
            <label className='block text-sm font-medium text-gray-700 w-[140px]'>Cart subtotal :</label>
            <p className='font-semibold'>$0.00</p>
          </div>
        </div>
      </div>

      <Navbar setActiveTab={setActiveTab} user={currentUser} menuTabs={currentUser?.menu} activeTab={activeTab} />
      <div className='p-6 mt-2'>
        {activeTab === 'Accounts' ? (
          <AccountMaintenance
            selectedAccount={selectedAccount}
            accounts={availableAccounts}
            onSave={handleSaveAccount}
            activeTab={activeTab}
          />
        ) : (
          <div className='bg-white p-6 rounded-md'>
            <h2 className='text-2xl font-bold mb-4'>Dashboard Content</h2>
            <p>Active Tab: {activeTab}</p>
            <p>Welcome, {currentUser?.name}!</p>
            <p>User Type: {currentUser?.usertype}</p>
            <p>Email: {currentUser?.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
