import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage1 from './pages/login-screens/LoginDesign1';
import LoginPage2 from './pages/login-screens/LoginDesign2';
import LoginPage3 from './pages/login-screens/LoginDesign3';
import SignUpPage from './pages/SignUp';
import Dashboard from './pages/Main';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Navigate to="/sign-in-1" />} />
      <Route path='/sign-in-1' element={<LoginPage1 />} />
      <Route path='/sign-in-2' element={<LoginPage2 />} />
      <Route path='/sign-in-3' element={<LoginPage3 />} />
      <Route path='/sign-up' element={<SignUpPage />} />
      <Route
        path='/dashboard'
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
