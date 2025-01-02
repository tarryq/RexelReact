
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; 
import { users } from '../../data-schemas/userData';


const CapitolLightLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [lang, setLang] = useState('english');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const userValid = users.find(
      (user) => user.username === username && user.password === password
    );

    if (userValid) {
      localStorage.setItem('user', JSON.stringify(userValid)); // Optionally store the user in localStorage
      login(); // Call login function from AuthContext (this will set user as authenticated)
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      // If user doesn't exist or credentials are wrong, show error
      setError('Username not found or incorrect credentials');
    }
  };

  const handleChangeLanguage = (event) => {
    setLang(event.target.value); // Update the state when selection changes
  };

  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col bg-cover bg-top bg-no-repeat" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%), radial-gradient(at 50% 0%, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.50) 50%)' }}>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <img className="h-8 sm:h-12 w-auto" src="/assets/capitol_light_logo.jpg" alt="Capitol Light Logo" />
            <h1 style={{ fontSize: 'clamp(10px,2vw,20px)' }} className="ml-4 text-xl sm:text-2xl font-bold text-indigo-900 text-center sm:text-left">
              Store Replenishment and Management System
            </h1>
          </div>
          <div className="relative">
            <select
              value={lang}
              onChange={handleChangeLanguage}
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-md space-y-6 bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <div>
            <h2 className=" text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
              Login!
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please enter your username and password assigned by Capitol Light.
            </p>
          </div>
          <form className="mt-4 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 mb-3 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full btn btn-sm bg-[#4B449D] text-white hover:bg-[#7873B5] outline-none border-none"
                style={{ height: '40px' }}
              >
                LOGIN
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-xs text-red-600 font-medium">
              For Service Channel, FM Pilot, Corrigo, Ariba users, please go back to your maintenance portal to access our webshop through punchout. You cannot log into the webshop from this screen.
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              If you are having any login issues, please contact{' '} <br />
              <a href="tel:1-800-329-8643" className="font-medium text-indigo-600 hover:text-indigo-500">
                1-800-329-8643
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center" aria-label="Footer">
            {['Privacy Policy', 'Terms And Conditions Of Use', 'Terms And Conditions Of Sale', 'Terms & Conditions of Purchase', 'Ethics / Code Of Conduct', 'Contact Us'].map((item) => (
              <div key={item} className="px-2 py-1 sm:px-5 sm:py-2">
                <a href="#" className="text-xs text-gray-500 hover:text-gray-900">
                  {item}
                </a>
              </div>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default CapitolLightLogin;
