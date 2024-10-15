import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { accounts } from '../data-schemas/accountsData';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [availableAccounts, setAvailableAccounts] = useState([]);
  const [availableStores, setAvailableStores] = useState([]);

  useEffect(() => {
    // Fetch the logged-in user data from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(loggedInUser);

    // Set available accounts and stores based on user type
    if (loggedInUser) {
      if (loggedInUser.usertype === 'admin') {
        setAvailableAccounts(accounts);
        setSelectedAccount(accounts[0].account);
        setAvailableStores(accounts[0].store);
        setSelectedStore(accounts[0].store[0]);
      } else if (loggedInUser.usertype === 'account') {
        const userAccount = accounts.find(acc => acc.account === loggedInUser.accountname);
        setAvailableAccounts([userAccount]);
        setSelectedAccount(userAccount.account);
        setAvailableStores(userAccount.store);
        setSelectedStore(userAccount.store[0]);
      } else if (loggedInUser.usertype === 'store') {
        const userAccount = accounts.find(acc => acc.account === loggedInUser.accountname);
        setAvailableAccounts([userAccount]);
        setSelectedAccount(userAccount.account);
        setAvailableStores([loggedInUser.storename]);
        setSelectedStore(loggedInUser.storename);
      }
    }
  }, []);

  const handleAccountChange = (event) => {
    const newSelectedAccount = event.target.value;
    setSelectedAccount(newSelectedAccount);
    const account = accounts.find(acc => acc.account === newSelectedAccount);
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/sign-in-1');
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const selectedAccountData = accounts.find(acc => acc.account === selectedAccount);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/assets/capitol_light_logo.jpg" alt="Capitol Light logo" className="h-12" />
            {selectedAccountData && selectedAccountData.logo && (
              <img src={selectedAccountData.logo} alt={`${selectedAccount} logo`} className="h-10" />
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Account</span>
              </label>
              <select
                className="select select-bordered select-sm w-full max-w-xs"
                value={selectedAccount}
                onChange={handleAccountChange}
                disabled={currentUser.usertype !== 'admin'}
              >
                {availableAccounts.map(account => (
                  <option key={account.account} value={account.account}>{account.account}</option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Store</span>
              </label>
              <select
                className="select select-bordered select-sm w-full max-w-xs"
                value={selectedStore}
                onChange={handleStoreChange}
                disabled={currentUser.usertype === 'store'}
              >
                {availableStores.map(store => (
                  <option key={store} value={store}>{store}</option>
                ))}
              </select>
            </div>
            <div className="text-sm">
              <p>Username</p>
              <p className="font-semibold">{currentUser.name}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm">
                <p>Items In Cart: <span className="font-semibold">0</span></p>
                <p>Cart Subtotal: <span className="font-semibold">$0.00</span></p>
              </div>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div dangerouslySetInnerHTML={{ __html: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40px" height="40px" viewBox="0 0 3 3" enable-background="new 0 0 60 60" xml:space="preserve"><path fill="#CCCCCC" d="m2.418 2.539 0.013 0.015c-0.25 0.224 -0.58 0.361 -0.942 0.361s-0.692 -0.136 -0.942 -0.36l0.014 -0.017s0.165 -0.131 0.359 -0.179 0.282 -0.184 0.282 -0.184v-0.238s-0.141 -0.189 -0.121 -0.32c0 0 -0.175 -0.116 -0.053 -0.286 0 0 -0.281 -0.807 0.432 -0.815 0.181 -0.002 0.27 0.135 0.27 0.135 0.483 -0.048 0.224 0.68 0.224 0.68 0.121 0.17 -0.053 0.286 -0.053 0.286 0.02 0.131 -0.121 0.32 -0.121 0.32v0.238s0.088 0.136 0.282 0.184c0.194 0.048 0.359 0.179 0.359 0.179"/><path fill="none" stroke="#555555" stroke-width="0.15000000000000002" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M2.418 2.539s-0.165 -0.131 -0.359 -0.179 -0.282 -0.184 -0.282 -0.184v-0.238s0.141 -0.189 0.121 -0.32c0 0 0.175 -0.116 0.053 -0.286 0 0 0.258 -0.728 -0.224 -0.68 0 0 -0.09 -0.137 -0.27 -0.135 -0.713 0.008 -0.432 0.815 -0.432 0.815 -0.121 0.17 0.053 0.286 0.053 0.286 -0.02 0.131 0.121 0.32 0.121 0.32v0.238s-0.088 0.136 -0.282 0.184c-0.194 0.048 -0.359 0.179 -0.359 0.179"/><path fill="none" stroke="#555555" stroke-width="0.15000000000000002" stroke-miterlimit="10" d="M0.547 2.556C0.258 2.297 0.076 1.921 0.076 1.504c0 -0.78 0.632 -1.412 1.412 -1.412C2.267 0.092 2.9 0.724 2.9 1.504c0 0.418 -0.181 0.793 -0.47 1.051 -0.25 0.224 -0.58 0.361 -0.942 0.361s-0.692 -0.136 -0.942 -0.36z"/></svg>` }} />
                </label>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li><a onClick={handleLogout}>Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="container mx-auto px-4 py-4">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p className="font-bold">Need assistance:</p>
          <p className="text-sm">Please contact Mitzi Heath on Monday - Friday 8-4:30pm eastern standard at 860-520-2308 or via email: Mitzi.Heath@Capitollight.com</p>
        </div>

        <div className="bg-indigo-700 text-white rounded-t-lg shadow-md">
          <div className="container mx-auto px-4">
            <ul className="flex justify-between items-center h-12">
              {currentUser.menu.map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:bg-indigo-600 px-3 py-2 rounded">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-b-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Dashboard Content</h2>
          <p>Welcome, {currentUser.name}!</p>
          <p>User Type: {currentUser.usertype}</p>
          <p>Email: {currentUser.email}</p>
        </div>
      </div> 

    </div>
  );
};

export default Dashboard;

