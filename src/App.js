import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Navbar from './components/Navigation';
import ActivateAccount from './auth/ActivateAccount';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import Home from './components/Home';


function App(){
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/auth/activate/:token' element={<ActivateAccount />} />
      <Route path='/auth/password/forgot' element={<ForgotPassword />} />
      <Route path='/auth/password/reset/:token' element={<ResetPassword />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
