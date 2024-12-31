import React, { useState, useEffect } from 'react';
import { accounts } from '../data-schemas/accountsData';
import { stores } from '../data-schemas/storeData';
import { locations } from '../data-schemas/locationData';
import Navbar from './Navbar';
import Maintenance from './Maintenance';
import AccountMaintenance from './AccountMaintenance';
import StoreMaintenance from './StoreMaintenance';
import AccountCommunication from './AccountCommunication';
import LocationMaintenance from './LocationMaintenance';
import AccountCustomFieldMaintenance from './AccountCustomFieldMaintenance';
import CustomGridColumnDefinitions from './CustomGridColumnDefinitions.js';
import LampGuideDisplayOptions from './LampGuideDisplayOptions.js';
import MaxOrderValueMaintenance from './MaxOrderValueMaintenance.js';
import ImageMaintenance from './ImageMaintenance';
import ProductLayout from './Products2';
import { DashboardSkeleton } from '../skeletons/skeleton.js';



export default function ManageAccount(props) {
  const [selectedStore, setSelectedStore] = useState('');
  const [availableAccounts, setAvailableAccounts] = useState([]);
  const [availableStores, setAvailableStores] = useState([]);
  const [activeTab, setActiveTab] = useState('Products');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = props;

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://srms-b8gygwe8fuawdfh7.canadacentral-01.azurewebsites.net/api/account/GetAccountsByUserId?userId=${currentUser.userId}`
      );
      const data = await response.json();
      setAvailableAccounts(data);

      if (data.length > 0) {
        setSelectedAccount(data[0]); // Default to the zeroth index account
        fetchStores(data[0].id); // Fetch stores for the default account
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStores = async (accountId) => {
    try {
      const response = await fetch(
        `https://srms-b8gygwe8fuawdfh7.canadacentral-01.azurewebsites.net/api/account/GetStoresForUser?userId=${currentUser.userId}&accountId=${accountId}`
      );
      const data = await response.json();
      setAvailableStores(data);

      if (data.length > 0) {
        setSelectedStore(data[0]); // Default to the zeroth index store
      }
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchAccounts();
    }
  }, [currentUser]);

  const handleAccountChange = (event) => {
    const accountId = event.target.value;
    const account = availableAccounts.find((acc) => acc.id === parseInt(accountId, 10));
    setSelectedAccount(account);
    fetchStores(account.id); // Fetch stores for the selected account
  };

  const handleStoreChange = (store) => {
    setSelectedStore(store);
  };

  // const handleSaveAccount = (updatedAccountDetails) => {
  //   const updatedAccounts = accounts.map((acc) => (acc.account === selectedAccount ? { ...acc, ...updatedAccountDetails } : acc));
  //   setAvailableAccounts(updatedAccounts);
  // };

  // const handleSaveLocation = (updatedLocationDetails) => {
  //   const updatedLocations = availableLocations.map((loc) => (loc.locationName === updatedLocationDetails.locationName ? { ...loc, ...updatedLocationDetails } : loc));
  //   setAvailableLocations(updatedLocations);
  // };

  // const handleSaveStore = (updatedStoreDetails) => {
  //   const updatedStores = availableStores.map((store) => (store.storeName === selectedStore ? { ...store, ...updatedStoreDetails } : store));
  //   setAvailableStores(updatedStores);
  //   const updatedStore = updatedStores.find((store) => store.storeName === selectedStore) || updatedStores[0];
  //   setSelectedStore(updatedStore.storeName);
  // };

  const menuOptions = {
    99: ['Products', 'My Account', 'My Cart', 'Messages', 'Reports', 'Instructions', 'Invoicing', 'Maintenance', 'Tracking'],
    3: ['Products', 'My Account', 'My Cart', 'Messages', 'Reports', 'Instructions', 'Maintenance', 'Invoicing'],
    default: ['Products', 'My Account', 'My Cart', 'Messages', 'Invoicing']
  };

  function getMenuTabs(currentUser) {
    switch (currentUser?.accessLevel) {
      case 99:
        return menuOptions[99];
      case 3:
        return menuOptions[3];
      default:
        return menuOptions.default;
    }
  }


  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const filteredStores = stores.filter((store) => store.accountId === accounts[0].accountId);
  const filteredLocations = locations.filter((location) => location.accountId === accounts[0].accountId);

  return (
    <div className='min-h-[90vh] pb-4 h-auto flex flex-col bg-gray-100 px-6'>


      <div className='flex items-center justify-between my-4' style={{ minHeight: '100px' }}>
        <div className='w-[54%] flex flex-col'>
          <div className='self-end'>{selectedAccount && selectedAccount.logo && <div dangerouslySetInnerHTML={{ __html: selectedAccount.logo }} />}</div>
        </div>

        <div className='flex flex-col gap-2 justify-start xs:ml-4 min-w-[30%]'>
          <div className='flex items-center'>
            <label className='block text-sm font-medium text-gray-700 w-[140px]'>Account :</label>
            <select className='block w-full border-gray-300 select select-bordered select-sm' value={selectedAccount?.id || ''} onChange={handleAccountChange} disabled={currentUser?.accessLevel !== 99}
            >
              {availableAccounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
          </div>

          <div className='flex items-center'>
            <label className='block text-sm font-medium text-gray-700 w-[140px]'>Store :</label>
            <select
              className='block w-full border-gray-300 select select-bordered select-sm'
              value={selectedStore.storeName}
              onChange={handleStoreChange}
              disabled={currentUser?.accessLevel !== (99 || 3)}
            >
              {availableStores.map((store) => (
                <option key={store.id} value={store.storeName}>
                  {store.storeName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <Navbar setActiveTab={setActiveTab} user={currentUser} menuTabs={getMenuTabs(currentUser)} activeTab={activeTab} />
      <div className='p-6 mt-2'>
        {activeTab === 'Maintenance' ?
          <Maintenance setActiveTab={setActiveTab} />
        : activeTab === 'Accounts' ? (
          <AccountMaintenance selectedAccount={accounts[0].account} accounts={accounts} />
        ) : activeTab === 'Store' ? (
          <StoreMaintenance selectedStore={filteredStores[0]?.storeName || ''} stores={filteredStores}  />
        ) : activeTab === 'Communication' ? (
          <AccountCommunication selectedAccount={accounts[0].account} accounts={accounts} locations={filteredLocations} />
        ) : activeTab === 'Location' ? (
                <LocationMaintenance selectedAccount={accounts[0].account} accounts={accounts} locations={filteredLocations} />
        ) : activeTab === 'AccountCustomField' ? (
          <AccountCustomFieldMaintenance />
        ) : activeTab === 'CustomGridColumnDefinitions' ? (
          <CustomGridColumnDefinitions />
        ) : activeTab === 'LampGuideDisplayOptions' ? (
          <LampGuideDisplayOptions />
        ) : activeTab === 'MaxOrderValueMaintenance' ? (
            <MaxOrderValueMaintenance />
        ) : activeTab === 'ImageMaintenance' ? (
            <ImageMaintenance />
        )       
        : activeTab === 'Products' ? (
        <ProductLayout user={currentUser} selectedAccount={selectedAccount} selectedStore = {selectedStore} />
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
