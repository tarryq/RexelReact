import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Assuming you're using AuthContext for authentication


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the user exists in localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username === username) {
      // If user exists and credentials match, log them in
      login(); // Call login function from AuthContext (this will set user as authenticated)
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      // If user doesn't exist or credentials are wrong, show error
      setError('User not found or incorrect credentials');
    }
  };

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4'>

      <div className='bg-white rounded-lg shadow-lg px-8 py-4  w-full max-w-sm sm:max-w-md lg:max-w-lg transition-all duration-300 ease-in-out'>
        <div className='flex justify-center mb-2'>
          <img src='/assets/capitol_light_logo.jpg' alt='logo' className='w-40 h-30' />
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
            <input type='password' id='password' name='password' className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          {/* <div className='flex items-center justify-between mb-6'>
            <a href='/forgot-password' className='text-blue-500 btn btn-sm btn-link no-underline leading-none p-0 m-0 ml-2'>
              Forgot password?
            </a>
          </div> */}

          <button type='submit' className='btn btn-primary border-none w-full bg-gradient-to-r mt-3 from-purple-400 to-blue-500 text-white py-2 rounded-lg hover:from-purple-500 hover:to-blue-600'>
            Login
          </button>
        </form>

        <p className='text-center text-gray-500 text-sm mt-4'>
          Don't have an account?
          <a href='/sign-up' className='text-blue-500 btn btn-sm btn-link no-underline leading-none p-0 m-0 ml-2'>
            Create account
          </a>
        </p>

        <p className='text-center text-gray-500 text-sm mt-2 mb-4'>
          If you are still having any login questions or issues please contact
          <a className='text-blue-500 btn btn-sm btn-link no-underline leading-none p-0 m-0 ml-2'>
            1-800-329-8643
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
