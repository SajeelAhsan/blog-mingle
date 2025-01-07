import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, Provider } from 'react-redux';
import './App.css';
import authService from './appwrite/auth.js';
import { login, logout } from './store/authSlice.js';
import { Header, Footer, } from './components/index.js';
import { Outlet } from 'react-router-dom';
import store from './store/store.js';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // This useEffect will handle the login and logout conditions of the user.
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({userData}));
        }
        else{
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false))

  }, [])
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between  border-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
         Todo:<Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
