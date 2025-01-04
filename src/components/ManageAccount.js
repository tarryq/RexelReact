import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import accountService from '../store/services';
import Navbar from './Navbar';
import Maintenance from './Maintenance';
import AccountMaintenance from './AccountMaintenance';
import StoreMaintenance from './StoreMaintenance';
import AccountCommunication from './AccountCommunication';
import LocationMaintenance from './LocationMaintenance';
import AccountCustomFieldMaintenance from './AccountCustomFieldMaintenance';
import CustomGridColumnDefinitions from './CustomGridColumnDefinitions';
import LampGuideDisplayOptions from './LampGuideDisplayOptions';
import MaxOrderValueMaintenance from './MaxOrderValueMaintenance';
import ImageMaintenance from './ImageMaintenance';
import LampGuide from './LampGuide';
import ProductLayout from './Products2';
import { DashboardSkeleton } from '../skeletons/skeleton';

export default function ManageAccount() {
  const [selectedStore, setSelectedStore] = useState(null);
  const [availableAccounts, setAvailableAccounts] = useState([]);
  const [availableStores, setAvailableStores] = useState([]);
  const [activeTab, setActiveTab] = useState('Products');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
      fetchAccounts(user.userId);
    }
  }, []);

  const fetchAccounts = useCallback(async (userId) => {
    if (!userId) {
      console.warn('userId is not defined. Cannot fetch accounts.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await accountService.getAccounts(userId);

      if (data?.length) {
        setAvailableAccounts(data);
        const defaultAccount = data[0];
        setSelectedAccount(defaultAccount);
        await fetchStores(defaultAccount.id); // Fetch stores for the default account
      } else {
        setAvailableAccounts([]);
        setSelectedAccount(null);
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchStores = useCallback(
    async (accountId) => {
      if (!currentUser || !currentUser.userId || !accountId) {
        console.warn('Missing currentUser or accountId. Cannot fetch stores.');
        return;
      }

      try {
        const data = await accountService.getStores(currentUser.userId, accountId);

        if (data?.length) {
          setAvailableStores(data);
          setSelectedStore(data[0]); // Default to the first store
        } else {
          setAvailableStores([]);
          setSelectedStore(null);
        }
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    },
    [currentUser]
  );

  const handleAccountChange = (event) => {
    const accountId = parseInt(event.target.value, 10);
    const account = availableAccounts.find((acc) => acc.id === accountId);
    setSelectedAccount(account);
    setAvailableStores([]);
    setSelectedStore(null);
    fetchStores(accountId);
  };

  const handleStoreChange = (event) => {
    const storeId = parseInt(event.target.value, 10);
    const store = availableStores.find((s) => s.id === storeId);
    setSelectedStore(store || null);
  };

  const getMenuTabs = (user) => {
    const menuOptions = {
      99: ['Products', 'My Account', 'My Cart', 'Messages', 'Reports', 'Instructions', 'Invoicing', 'Maintenance', 'Tracking'],
      3: ['Products', 'My Account', 'My Cart', 'Messages', 'Reports', 'Instructions', 'Maintenance', 'Invoicing'],
      default: ['Products', 'My Account', 'My Cart', 'Messages', 'Invoicing']
    };
    return menuOptions[user?.accessLevel] || menuOptions.default;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Maintenance':
        return <Maintenance setActiveTab={setActiveTab} />;
      case 'Accounts':
        return <AccountMaintenance selectedAccount={selectedAccount} accounts={availableAccounts} />;
      case 'Store':
        return <StoreMaintenance selectedStore={selectedStore} stores={availableStores} />;
      case 'Communication':
        return <AccountCommunication selectedAccount={selectedAccount} accounts={availableAccounts} />;
      case 'Location':
        return <LocationMaintenance selectedAccount={selectedAccount} accounts={availableAccounts} />;
      case 'AccountCustomField':
        return <AccountCustomFieldMaintenance />;
      case 'CustomGridColumnDefinitions':
        return <CustomGridColumnDefinitions />;
      case 'LampGuideDisplayOptions':
        return <LampGuideDisplayOptions />;
      case 'MaxOrderValueMaintenance':
        return <MaxOrderValueMaintenance />;
      case 'ImageMaintenance':
        return <ImageMaintenance />;
      case 'LampGuide':
        return <LampGuide />;
      case 'Products':
        return <ProductLayout user={currentUser} selectedAccount={selectedAccount} selectedStore={selectedStore} />;
      default:
        return (
          <div className='bg-white p-6 rounded-md'>
            <h2 className='text-2xl font-bold mb-4'>Dashboard Content</h2>
            <p>Welcome, {currentUser?.name}!</p>
          </div>
        );
    }
  };

  if (isLoading) return <DashboardSkeleton />;

  if (!availableAccounts.length) {
    return (
      <div className='min-h-[90vh] flex flex-col justify-center items-center bg-gray-100'>
        <p className='text-lg text-gray-600'>No accounts found. Please contact support.</p>
      </div>
    );
  }

  return (
    <div className='min-h-[90vh] pb-4 h-auto flex flex-col bg-gray-100 px-6'>
      <div className='flex items-center justify-between my-4' style={{ minHeight: '100px' }}>
        <div className='w-[54%] flex flex-col'>{selectedAccount?.logo && <div className='self-end' dangerouslySetInnerHTML={{ __html: selectedAccount.logo }} />}</div>
        <div className='flex flex-col gap-2 justify-start xs:ml-4 min-w-[30%]'>
          <div className='flex items-center'>
            <label className='block text-sm font-medium text-gray-700 w-[140px]'>Account:</label>
            <select className='block w-full border-gray-300 select select-bordered select-sm' value={selectedAccount?.id || ''} onChange={handleAccountChange} disabled={currentUser?.accessLevel !== 99}>
              {availableAccounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
          </div>
          <div className='flex items-center'>
            <label className='block text-sm font-medium text-gray-700 w-[140px]'>Store:</label>
            <select className='block w-full border-gray-300 select select-bordered select-sm' value={selectedStore?.id || ''} onChange={handleStoreChange} disabled={!selectedAccount || currentUser?.accessLevel < 3}>
              {availableStores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.storeName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Navbar setActiveTab={setActiveTab} user={currentUser} menuTabs={getMenuTabs(currentUser)} activeTab={activeTab} />
      <div className='p-6 mt-2'>{renderTabContent()}</div>
    </div>
  );
}
