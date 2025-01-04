import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage1 from './pages/login-screens/LoginDesign1';
import SignUpPage from './pages/SignUp';
import NotFoundPage from './pages/NotFoundPage';
import Dashboard from './pages/Main';
import Products from './components/Products2';
import PrivateRoute from './components/PrivateRoute';
import AccountMaintenance from './components/AccountMaintenance';
import AccountCustomFieldMaintenance from './components/AccountCustomFieldMaintenance';
import ImageMaintenance from './components/ImageMaintenance';
import LampGuide from './components/LampGuide';
import LampGuideDisplayOptions from './components/LampGuideDisplayOptions';

const PrivateRouteWrapper = ({ element: Element }) => (
  <PrivateRoute>
    <Dashboard>
      <Element />
    </Dashboard>
  </PrivateRoute>
);

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/login' element={<LoginPage1 />} />
      <Route path='/sign-up' element={<SignUpPage />} />
      <Route path='/products' element={<PrivateRouteWrapper element={Products} />} />
      <Route path='/account-maintenance' element={<PrivateRouteWrapper element={AccountMaintenance} />} />
      <Route path='/account-custom-field-maintenance' element={<PrivateRouteWrapper element={AccountCustomFieldMaintenance} />} />
      <Route path='/image-maintenance' element={<PrivateRouteWrapper element={ImageMaintenance} />} />
      <Route path='/lamp-guide' element={<PrivateRouteWrapper element={LampGuide} />} />
      <Route path='/lamp-guide-display-options' element={<PrivateRouteWrapper element={LampGuideDisplayOptions} />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
