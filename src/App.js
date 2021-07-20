import React, {useContext} from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import { Context } from '.';
import {useAuthState} from 'react-firebase-hooks/auth';
import Loaded from './components/Loaded';

function App() {
  const {auth} = useContext(Context);
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loaded/>
  }

  return (
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
