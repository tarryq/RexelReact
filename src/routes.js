import React from 'react';
import { Route, Routes} from 'react-router-dom';
import LoginPage from './views/login-screens/LoginDesign2';
import SignUpPage from './views/SignUp';
import Dashboard from './views/Dashboard';
import NotFoundPage from './views/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <Routes>
      <Route path='/sign-in' element={<LoginPage />} />
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
