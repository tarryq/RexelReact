import React, { useState, useEffect } from 'react';
import { accounts } from '../data-schemas/accountsData';
import { stores } from '../data-schemas/storeData';
import { locations } from '../data-schemas/locationData'; // Ensure you import locations data
import Navbar from './Navbar';
import AccountMaintenance from './AccountMaintenance';
import StoreMaintenance from './StoreMaintenance';
import LocationMaintenance from './LocationMaintenance';

export default function ManageAccount(props) {
  const [selectedStore, setSelectedStore] = useState('');
  const [availableAccounts, setAvailableAccounts] = useState([]);
  const [availableStores, setAvailableStores] = useState([]);
  const [availableLocations, setAvailableLocations] = useState([]); // New state for locations
  const [activeTab, setActiveTab] = useState('Products');

  const [selectedAccount, setSelectedAccount] = useState('');
  const { currentUser } = props;

  useEffect(() => {
    if (currentUser && accounts && stores && locations) { // Ensure locations data is checked here
      if (currentUser.usertype === 'admin') {
        setAvailableAccounts(accounts);
        const defaultAccount = accounts[0] || {};
        setSelectedAccount(defaultAccount.account || '');

        const filteredStores = stores.filter(store => store.accountId === defaultAccount.accountId);
        setAvailableStores(filteredStores);
        setSelectedStore(filteredStores[0]?.storeName || '');

        const filteredLocations = locations.filter(location => location.accountId === defaultAccount.accountId);
        setAvailableLocations(filteredLocations); // Set available locations based on account

      } else if (currentUser.usertype === 'account') {
        const userAccount = accounts.find(acc => acc.account === currentUser.accountname);
        if (userAccount) {
          setAvailableAccounts([userAccount]);
          setSelectedAccount(userAccount.account);

          const filteredStores = stores.filter(store => store.accountId === userAccount.accountId);
          setAvailableStores(filteredStores);
          setSelectedStore(filteredStores[0]?.storeName || '');

          const filteredLocations = locations.filter(location => location.accountId === userAccount.accountId);
          setAvailableLocations(filteredLocations); // Set available locations based on account
        }

      } else if (currentUser.usertype === 'store') {
        const userAccount = accounts.find(acc => acc.account === currentUser.accountname);
        if (userAccount) {
          setAvailableAccounts([userAccount]);
          setSelectedAccount(userAccount.account);

          const userStore = stores.find(store => store.storeName === currentUser.storename && store.accountId === userAccount.accountId);
          setAvailableStores([userStore]);
          setSelectedStore(userStore?.storeName || '');

          const filteredLocations = locations.filter(location => location.storeId === userStore.storeId);
          setAvailableLocations(filteredLocations); // Set available locations based on store
        }
      }
    }
  }, [currentUser, accounts, stores, locations]);

  const handleAccountChange = (event) => {
    const newSelectedAccount = event.target.value;
    setSelectedAccount(newSelectedAccount);
    const account = accounts.find((acc) => acc.account === newSelectedAccount);
    if (account) {
      const filteredStores = stores.filter((store) => store.accountId === account.accountId);
      setAvailableStores(filteredStores);
      setSelectedStore(filteredStores[0]?.storeName || ''); // Set to first store or empty

      const filteredLocations = locations.filter((location) => location.accountId === account.accountId);
      setAvailableLocations(filteredLocations); // Update available locations based on the selected account

    } else {
      setAvailableStores([]);
      setAvailableLocations([]); // Clear locations if no account is found
      setSelectedStore('');
    }
  };

  const handleSaveAccount = (updatedAccountDetails) => {
    const updatedAccounts = accounts.map((acc) => (acc.account === selectedAccount ? { ...acc, ...updatedAccountDetails } : acc));
    setAvailableAccounts(updatedAccounts);
  };

  const handleSaveLocation = (updatedLocationDetails) => {
    const updatedLocations = availableLocations.map((loc) => (loc.locationName === updatedLocationDetails.locationName ? { ...loc, ...updatedLocationDetails } : loc));
    setAvailableLocations(updatedLocations);
  };

  const handleSaveStore = (updatedStoreDetails) => {
    const updatedStores = availableStores.map((store) => (store.storeName === selectedStore ? { ...store, ...updatedStoreDetails } : store));
    setAvailableStores(updatedStores);
    const updatedStore = updatedStores.find((store) => store.storeName === selectedStore) || updatedStores[0];
    setSelectedStore(updatedStore.storeName);
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
        <div className='flex flex-col gap-2 justify-start xs:ml-4 min-w-[30%]'>
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
        </div>
      </div>

      <Navbar setActiveTab={setActiveTab} user={currentUser} menuTabs={currentUser?.menu} activeTab={activeTab} />
      <div className='p-6 mt-2'>
        {activeTab === 'Accounts' ? (
          <AccountMaintenance selectedAccount={selectedAccount} accounts={availableAccounts} onSave={handleSaveAccount} />
        ) : activeTab === 'Store' ? (
          <StoreMaintenance selectedStore={selectedStore} stores={availableStores} onSave={handleSaveStore} />
        ) : activeTab === 'Location' ? (
          <LocationMaintenance selectedAccount={selectedAccount} accounts={availableAccounts} locations={availableLocations} onSave={handleSaveLocation} />
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
