import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // Base URL for APIs
  const BASE_URL = 'https://srms-b8gygwe8fuawdfh7.canadacentral-01.azurewebsites.net/api';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Step 1: Login Authentication
      const loginResponse = await fetch(`${BASE_URL}/authenticate/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        setError(errorData.message || 'Invalid username or password. Please try again.');
        return;
      }

      const loginData = await loginResponse.json();

      if (!loginData.loginResponse.success) {
        setError(loginData.loginResponse.errorMessage || 'Login failed. Please try again.');
        return;
      }

      // Step 2: Find User Account by Username
      const accountResponse = await fetch(
        `${BASE_URL}/account/FindAccountByUsername?userName=${username}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add authorization header if required
            // 'Authorization': `Bearer ${loginData.loginResponse.token}`
          }
        }
      );

      if (!accountResponse.ok) {
        const errorData = await accountResponse.json();
        setError(errorData.message || 'Failed to fetch user account. Please try again.');
        return;
      }

      const accountData = await accountResponse.json();

      // Create user object
      const userObject = {
        username: username,
        userId: accountData.id,
        displayName: loginData.loginResponse.displayName,
        accessLevel: loginData.loginResponse.accessLevel,
        token: loginData.loginResponse.token,
        // email: `${username}@example.com` // Adjust as needed
      };

      // Store user information
      localStorage.setItem('user', JSON.stringify(userObject));

      // Update auth context
      login(userObject);

      // Navigate to dashboard
      navigate('/dashboard');

    } catch (err) {
      setError('An error occurred while connecting to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4'>
      <div className='bg-white rounded-lg shadow-lg px-8 py-4 w-full max-w-sm sm:max-w-md lg:max-w-lg transition-all duration-300 ease-in-out'>
        <div className='flex justify-center'>
          <img src='/assets/capitol_light_logo.jpg' alt='logo' className='w-[100px] h-[100px]' />
        </div>
        <p className='text-gray-500 text-center mb-6'>The Capitol Light SRMS website requires user authentication. Please enter your details</p>
        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label htmlFor='username' className='block text-gray-600 text-sm font-medium mb-1'>
              Username
            </label>
            <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500' placeholder='Enter your username' required />
          </div>

          <div className='mb-4'>
            <label htmlFor='password' className='block text-gray-600 text-sm font-medium mb-1'>
              Password
            </label>
            <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500' placeholder='Enter your password' required />
          </div>

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <button type='submit' className='btn btn-primary border-none w-full bg-gradient-to-r mt-3 from-purple-400 to-blue-500 text-white py-2 rounded-lg hover:from-purple-500 hover:to-blue-600'>
            Login
          </button>
        </form>

        <div className='text-center mt-2'>
          <p className='text-sm text-red-600 font-medium'>For Service Channel, FM Pilot, Corrigo, Ariba users, please go back to your maintenance portal to access our webshop through punchout. You cannot log into the webshop from this screen.</p>
        </div>

        <p className='text-center text-gray-500 text-sm mt-2 mb-4'>
          If you are still having any login questions or issues please contact
          <a className='text-blue-500 btn btn-sm btn-link no-underline leading-none p-0 m-0 ml-2'>1-800-329-8643</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
