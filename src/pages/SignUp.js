import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const [error, setError] = useState(''); // State to hold the error message
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the user already exists in localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === formData.username) {
      // If user already exists, display an error
      setError('This username is already registered. Please use a different username.');
      return;
    }

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // If validation passes, store the user data and session expiration time in localStorage
    const expirationTime = Date.now() + 10 * 60 * 1000; // 10 minutes from now
    localStorage.setItem('user', JSON.stringify({ username: formData.username, expirationTime }));

    // Clear error message if successful
    setError('');

    // Redirect to the dashboard after successful signup
    navigate('/dashboard');
  };

  // Check if the session has expired and log the user out after 10 minutes
  useEffect(() => {
    const checkSessionTimeout = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser && Date.now() > storedUser.expirationTime) {
        // If session expired, clear localStorage and redirect to login
        localStorage.removeItem('user');
        navigate('/login');
      }
    };

    // Set an interval to check the session every 1 second
    const interval = setInterval(checkSessionTimeout, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4'>
      <div className='bg-white rounded-lg shadow-lg px-8 py-4 w-full max-w-sm sm:max-w-md lg:max-w-lg transition-all duration-300 ease-in-out'>
        <div className='flex justify-center'>
          <img src='/assets/capitol_light_logo.jpg' alt='logo' className='w-40 h-30' />
        </div>

        <p className='text-gray-500 text-center mb-4'>Please enter your details to create an account</p>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='username' className='block text-gray-600 text-sm font-medium mb-1'>
              Username
            </label>
            <input type='username' id='username' name='username' className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500' placeholder='Enter your username' value={formData.username} onChange={handleInputChange} required />
          </div>

          <div className='mb-4'>
            <label htmlFor='password' className='block text-gray-600 text-sm font-medium mb-1'>
              Password
            </label>
            <input type='password' id='password' name='password' className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500' placeholder='Enter your password' value={formData.password} onChange={handleInputChange} required />
          </div>

          <div className='mb-4'>
            <label htmlFor='confirmPassword' className='block text-gray-600 text-sm font-medium mb-1'>
              Confirm Password
            </label>
            <input type='password' id='confirmPassword' name='confirmPassword' className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500' placeholder='Confirm your password' value={formData.confirmPassword} onChange={handleInputChange} required />
          </div>

          <div>
            <label htmlFor='role' className='block text-gray-600 text-sm font-medium mb-1'>
              Select Role
            </label>
            <select name='role' value={formData.role} className='select select-info w-full border border-gray-300 focus:outline-none focus:border-blue-500' onChange={handleInputChange} required>
              <option disabled value=''>
                Please select one role
              </option>
              <option value='Admin'>Admin</option>
              <option value='Account User'>Account User</option>
              <option value='Store User'>Store User</option>
            </select>
          </div>

          {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}

          <button type='submit' className='mt-[30px] btn btn-primary border-none w-full bg-gradient-to-r from-purple-400 to-blue-500 text-white py-2 rounded-lg hover:from-purple-500 hover:to-blue-600'>
            Create Account
          </button>
        </form>

        <p className='text-center text-gray-500 text-sm mt-4'>
          Already have an account?
          <a href='/login' className='text-blue-500 btn btn-sm btn-link no-underline leading-none p-0 m-0 ml-2'>
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
