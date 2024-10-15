import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Assuming you're using AuthContext for authentication

import { Select, MenuItem, Typography, TextField, FormControl, InputLabel } from '@mui/material';

import { users } from '../../data-schemas/userData';


const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [lang, setLang] = useState('english');

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
      setError('User not found or incorrect credentials');
    }
  };


    const handleChangeLanguage = (event) => {
      setLang(event.target.value); // Update the state when selection changes
    };


  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundImage: 'linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          backgroundColor: '#F5F6FA',
          borderRadius: '20px',
          divShadow: '0 10px 30px rgba(0,0,0,0.1)',
          padding: '50px 80px',
          display: 'flex',
          flexDirection: 'column',
          width: '80vw',
          height: '84vh'
        }}
      >
        <div style={{ width: '100%', height: '10%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src='/assets/capitol_light_logo.jpg' alt='logo' style={{ width: '60px', height: 'auto', marginRight: '12px' }} />
            <Typography variant='h5' style={{ fontWeight: 'bold', color: '#462B76' }}>
              Capitol Light SRMS
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel id="language-select-label">Language</InputLabel>
              <Select
                labelId="language-select-label"
                id="language-select"
                value={lang}
                onChange={handleChangeLanguage}
                label="Language"
                sx={{
                  borderWidth: '0px',
                  '& label': {
                    fontWeight: '500'
                  },
                  '& input': {
                    fontWeight: '700',
                    color: '#462B76'
                  }
                }}
              >
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="spanish">Spanish</MenuItem>
                <MenuItem value="french">French</MenuItem>
              </Select>
            </FormControl>
          </div>

        </div>
        <div className='' style={{ margin: 'auto', height: '80%', width: '80%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '50px' }}>
          <div style={{ width: '50%' }}>
            <Typography variant='h6' style={{ fontWeight: 'bold', color: '#462B76' }}>
              Login to your account
            </Typography>
            <form onSubmit={handleLogin} style={{ marginTop: '30px', width: '100%' }}>
              <TextField
                sx={{
                  borderWidth: '0px',
                  '& label': {                    
                    fontWeight: '500'
                  },
                  '& input': {                   
                    fontWeight: '700',
                    color: '#462B76'
                  }                 
                }}
                className="w-full rounded-[8px]"
                id="outlined-search"
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />



              <TextField sx={{
                borderWidth: '0px',
                marginTop: '20px',
                '& label': {
                  fontWeight: '500'
                },
                '& input': {
                  fontWeight: '700',
                  color: '#462B76'
                }
              }} className='w-full rounded-[8px]' id='outlined-search' label='Password' type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />

              {error && (
                <Typography variant='body2' style={{ color: 'red', marginBottom: '12px', fontSize: '0.8rem' }}>
                  {error}
                </Typography>
              )}
              <div className='mt-10' style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <button
                  className='btn btn-sm bg-[#4B449D] text-white hover:bg-[#7873B5] outline-none border-none'
                  type='submit'
                  style={{
                    height: '40px',
                    width: '100px',
                    borderRadius: '30px',
                    alignSelf: 'flex-end'
                  }}
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
          <div style={{ width: '50%', height: '100%' }}>
            <img src='/assets/login-image.svg' alt='login-user' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
        <div style={{ width: '50%', height: '10%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <nav style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Privacy Policy', 'T&C Of Use', 'T&C Of Sale', 'T&C of Purchase', 'Ethics / Code Of Conduct', 'Contact Us'].map((item) => (
              <a key={item} href='#' style={{ margin: '2px 4px', fontSize: '0.7rem', color: '#666', textDecoration: 'none' }}>
                {`${item} | `}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
