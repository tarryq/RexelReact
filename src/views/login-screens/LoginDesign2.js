import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

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

    const userValid = users.find((user) => user.username === username && user.password === password);

    if (userValid) {
      localStorage.setItem('user', JSON.stringify(userValid));
      login();
      navigate('/dashboard');
    } else {
      setError('Username not found or incorrect credentials');
    }
  };

  const handleChangeLanguage = (event) => {
    setLang(event.target.value);
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
          padding: '50px 60px 10px 60px',
          display: 'flex',
          flexDirection: 'column',
          width: '80vw',
          height: '86vh'
        }}
      >
        <div style={{ width: '100%', height: '10%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src='/assets/capitol_light_logo.jpg' alt='logo' style={{ width: '60px', height: 'auto', marginRight: '12px' }} />
            <Typography variant='h5' className="hidden md:block" style={{ fontWeight: 'bold', color: '#4B449D' }}>
              Capitol Light SRMS
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FormControl variant='outlined' sx={{ minWidth: 80 }}>
              <InputLabel
                id='language-select-label'
                sx={{
                  fontSize: '0.8rem',
                  '&.Mui-focused': {
                    color: '#4b449d'
                  }
                }}
              >
                Language
              </InputLabel>
              <Select
                labelId='language-select-label'
                id='language-select'
                value={lang}
                onChange={handleChangeLanguage}
                label='Language'
                sx={{
                  padding: '5px',
                  fontSize: '14px',
                  borderRadius: '4px',
                  '& .MuiOutlinedInput-input': {
                    padding: '8px 10px',
                    fontWeight: '600',
                  },
                  '& .MuiSelect-select': {
                    minWidth: '80px',
                    color: '#4B449D'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4b449d'
                  },
                  '&.Mui-focused .MuiInputLabel-root': {
                    color: '#4b449d'
                  }
                }}
              >
                <MenuItem value='english' sx={{ fontSize: '12px', padding: '6px 10px' }}>English</MenuItem>
                <MenuItem value='spanish' sx={{ fontSize: '12px', padding: '6px 10px' }}>Spanish</MenuItem>
                <MenuItem value='french' sx={{ fontSize: '12px', padding: '6px 10px' }}>French</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className='m-auto mb-2 h-[60%] w-[80%] flex justify-between items-center gap-[50px]'>
          <div className="w-full lg:w-1/2">
            <Typography variant='h6' style={{ fontWeight: 'bold', color: '#4B449D' }}>
              Login to your account
            </Typography>
            <form onSubmit={handleLogin} style={{ marginTop: '30px', width: '100%' }}>
              <TextField
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderWidth: '0px'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4B449D'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4B449D',
                    borderWidth: '1px'
                  },
                  '& label': {
                    fontWeight: '500',
                    '&.Mui-focused': {
                      color: '#4B449D'
                    }
                  },
                  '& input': {
                    fontWeight: '700',
                    color: '#4B449D',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    borderColor: '#4B449D'
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#4B449D'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4B449D'
                    }
                  }
                }}
                className='w-full rounded-[8px]'
                id='outlined-search'
                label='Username'
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderWidth: '0px'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4B449D'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4B449D',
                    borderWidth: '1px'
                  },
                  '& label': {
                    fontWeight: '500',
                    '&.Mui-focused': {
                      color: '#4B449D'
                    }
                  },
                  '& input': {
                    fontWeight: '700',
                    color: '#4B449D',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    borderColor: '#4B449D'
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#4B449D'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4B449D'
                    }
                  },
                  marginTop: '14px'
                }}
                className='w-full rounded-[8px]'
                id='outlined-search'
                label='Password'
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div style={{ minHeight: '24px', marginTop: '12px' }}>
                {error && (
                  <Typography variant='body2' style={{ color: '#ef4444', fontSize: '0.8rem' }}>                  {error}
                  </Typography>
                )}
              </div>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
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
          <div className="w-full h-full lg:w-1/2 hidden lg:block">
            <img src='/assets/login-image.svg' alt='login-user' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="text-center">
            <p className="text-xs text-red-500 mb-1">
              For Service Channel, FM Pilot, Corrigo, Ariba users, please go back to your maintenance portal to access our webshop through punchout. You cannot log into the webshop from this screen.
            </p>
          </div>
          <div className="text-center mt-2">
            <p className="text-xs text-gray-600">
              If you are having any login issues, please contact{' '}
              <a href="tel:1-800-329-8643" className="font-medium text-[#4B449D] hover:text-[#38327D]">
                1-800-329-8643
              </a>
            </p>
          </div>
        </div>

        <nav className="mt-4 flex flex-wrap justify-center w-full mx-auto lg:w-3/4">
          {['Privacy Policy', 'T&C Of Use', 'T&C Of Sale', 'T&C of Purchase', 'Ethics / Code Of Conduct', 'Contact Us'].map((item, index, array) => (
            <a
              key={item}
              href='#'
              className="text-xs text-[#4B449D] hover:text-[#38327D] mx-1"
            >
              {item}
              {index !== array.length - 1 && ' |'}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default LoginScreen;
