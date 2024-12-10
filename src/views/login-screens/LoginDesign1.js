import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Assuming you're using AuthContext for authentication
import {users} from '../../data-schemas/userData';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://srms-b8gygwe8fuawdfh7.canadacentral-01.azurewebsites.net/api/authenticate/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        const userData = await response.json();
        const userValid = users.find(
          (user) => user.name === userData.loginResponse.displayName && user.password === password
        );
        localStorage.setItem('user', JSON.stringify(userValid));
        login();
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid username or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while connecting to the server. Please try again.');
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
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Handle username input
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
              placeholder='Enter your username'
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='password' className='block text-gray-600 text-sm font-medium mb-1'>
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Handle password input
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
              placeholder='Enter your password'
              required
            />
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
