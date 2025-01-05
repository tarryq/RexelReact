import React, { useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { selectAccount, selectStore } from '../store/reducers/index';
import { selectAccount, selectStore } from '../store/features/accounts/accountSlice';
import { fetchAccounts, fetchStores } from '../store/features/accounts/accountActions';
import Navbar from './Navbar';
import { DashboardSkeleton } from '../skeletons/skeleton';

export default function ManageAccount() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // Redux state selectors
  const { accounts, stores, selectedAccount, selectedStore, accountLoading, storeLoading, error } = useSelector((state) => state.accounts);

  // Fetch accounts when the component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch(fetchAccounts(user.userId));
    }
  }, [dispatch]);

  // Update query parameters when selectedAccount or selectedStore changes
  useEffect(() => {
    if (selectedAccount) {
      setSearchParams({
        account: selectedAccount.name || '',
        store: selectedStore?.storeName || ''
      });
    }
  }, [selectedAccount, selectedStore, setSearchParams]);

  // Handle account changes
  const handleAccountChange = (event) => {
    const accountId = parseInt(event.target.value, 10);
    const account = accounts.find((acc) => acc.id === accountId);
    dispatch(selectAccount(account));
    dispatch(fetchStores({ userId: JSON.parse(localStorage.getItem('user')).userId, accountId }));
  };

  // Handle store changes
  const handleStoreChange = (event) => {
    const storeId = parseInt(event.target.value, 10);
    const store = stores[selectedAccount?.id]?.find((s) => s.id === storeId);
    dispatch(selectStore(store));
  };

  const getMenuTabs = (user) => {
    const menuOptions = {
      99: ['Products', 'My Account', 'My Cart', 'Messages', 'Reports', 'Instructions', 'Invoicing', 'Maintenance', 'Tracking'],
      3: ['Products', 'My Account', 'My Cart', 'Messages', 'Reports', 'Instructions', 'Maintenance', 'Invoicing'],
      default: ['Products', 'My Account', 'My Cart', 'Messages', 'Invoicing']
    };
    return menuOptions[user?.accessLevel] || menuOptions.default;
  };

  if (accountLoading || storeLoading ) return <DashboardSkeleton />;

  if (error) {
    return (
      <div className='min-h-[90vh] flex flex-col justify-center items-center bg-gray-100'>
        <p className='text-lg text-gray-600'>{error}</p>
      </div>
    );
  }

  if (!accounts.length) {
    return (
      <div className='min-h-[90vh] flex flex-col justify-center items-center bg-gray-100'>
        <p className='text-lg text-gray-600'>No accounts found. Please contact support.</p>
      </div>
    );
  }

    return (
    <div className='min-h-[30vh] pb-4 h-auto flex flex-col bg-gray-100 px-6'>
      <div className='flex items-center justify-between my-4' style={{ minHeight: '100px' }}>
        <div className='w-[54%] flex flex-col'>{selectedAccount?.logo && <div className='self-end' dangerouslySetInnerHTML={{ __html: selectedAccount.logo }} />}</div>
        <div className='flex flex-col gap-2 justify-start xs:ml-4 min-w-[30%]'>
          <div className='flex items-center'>
            <label className='block text-sm font-medium text-gray-700 w-[140px]'>Account:</label>
            <select className='block w-full border-gray-300 select select-bordered select-sm' value={selectedAccount?.id || ''} onChange={handleAccountChange} disabled={!accounts.length}>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
          </div>
          <div className='flex items-center'>
            <label className='block text-sm font-medium text-gray-700 w-[140px]'>Store:</label>
            <select className='block w-full border-gray-300 select select-bordered select-sm' value={selectedStore?.id || ''} onChange={handleStoreChange} disabled={!selectedAccount}>
              {stores[selectedAccount?.id]?.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.storeName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Navbar setActiveTab={() => {}} user={JSON.parse(localStorage.getItem('user'))} menuTabs={getMenuTabs(JSON.parse(localStorage.getItem('user')))} />
    </div>
  );
}
