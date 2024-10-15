import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ManageAccount from '../components/ManageAccount';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/sign-in-1');
  };

  return (
    <div style={{ height: '100vh', width: '100%', position:'relative' }}>
      <Header currentUser={currentUser} handleLogout={handleLogout} />
      <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-2' role='alert'>
        <p className='text-sm'>
          <span className='font-bold mr-2'>Need assistance :</span>Please contact Mitzi Heath on Monday - Friday 8-4:30pm eastern standard at 860-520-2308 or via email: Mitzi.Heath@Capitollight.com
        </p>
      </div>
      <ManageAccount currentUser={currentUser} />
    </div>
  );
};

export default Dashboard;
