import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import TheCompany from './components/TheCompany';
import TheTeam from './components/TheTeam';
import Navbar from './components/Navbar';
import UserProfile from './Pages/UserProfile';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';


function App() {


  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUs />}>
          <Route path="theteam" element={<TheTeam />} />
          <Route index element={<TheCompany />} />
        </Route>
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={ <PrivateRoute> <Dashboard/> </PrivateRoute>} />
        <Route path="/user" element={ <PrivateRoute> <UserProfile/> </PrivateRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
