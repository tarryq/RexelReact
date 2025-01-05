import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage1 from './pages/login-screens/LoginDesign1';
import SignUpPage from './pages/SignUp';
import NotFoundPage from './pages/NotFoundPage';
import Dashboard from './pages/Main';
import Products from './components/Products';
import PrivateRoute from './components/PrivateRoute';
import Maintenance from './components/Maintenance';
import AccountMaintenance from './components/AccountMaintenance';
import StoreMaintenance from './components/StoreMaintenance';
import AccountCommunication from './components/AccountCommunication';
import AccountCustomFieldMaintenance from './components/AccountCustomFieldMaintenance';
import ImageMaintenance from './components/ImageMaintenance';
import LampGuide from './components/LampGuide';
import LampGuideDisplayOptions from './components/LampGuideDisplayOptions';
import LocationMaintenance from './components/LocationMaintenance';
import CustomGridColumnDefinitions from './components/CustomGridColumnDefinitions';
import MaxOrderValueMaintenance from './components/MaxOrderValueMaintenance';

const PrivateRouteWrapper = ({ element: Element, accounts, stores, selectedAccount, selectedStore }) => (
  <PrivateRoute>
    <Dashboard>
      <Element accounts={accounts} stores={stores} selectedAccount={selectedAccount} selectedStore={selectedStore} />
    </Dashboard>
  </PrivateRoute>
);

function App() {
  const { accounts = [], stores = [], selectedAccount = {}, selectedStore = {} } = useSelector((state) => state.accounts);

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/login' element={<LoginPage1 />} />
      <Route path='/sign-up' element={<SignUpPage />} />
      <Route path='/products' element={<PrivateRouteWrapper element={Products} />} />
      <Route path='/maintenance' element={<PrivateRouteWrapper element={Maintenance} />} />
      <Route path='/maintenance/account-maintenance' element={<PrivateRouteWrapper element={AccountMaintenance} accounts={accounts} stores={stores} selectedAccount={selectedAccount} selectedStore={selectedStore} />} />
      <Route path='/maintenance/account-communication' element={<PrivateRouteWrapper element={AccountCommunication} />} />
      <Route path='/maintenance/store-maintenance' element={<PrivateRouteWrapper element={StoreMaintenance} />} />
      <Route path='/maintenance/account-custom-field-maintenance' element={<PrivateRouteWrapper element={AccountCustomFieldMaintenance} />} />
      <Route path='/maintenance/image-maintenance' element={<PrivateRouteWrapper element={ImageMaintenance} />} />
      <Route path='/maintenance/lamp-guide' element={<PrivateRouteWrapper element={LampGuide} />} />
      <Route path='/maintenance/lamp-guide-display-options' element={<PrivateRouteWrapper element={LampGuideDisplayOptions} />} />
      <Route path='/maintenance/location-maintenance' element={<PrivateRouteWrapper element={LocationMaintenance} />} />
      <Route path='/maintenance/custom-grid-column-definitions' element={<PrivateRouteWrapper element={CustomGridColumnDefinitions} />} />
      <Route path='/maintenance/max-order-value-maintenance' element={<PrivateRouteWrapper element={MaxOrderValueMaintenance} />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
