import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AboutUs from './Pages/AboutUs';
import Products from './Pages/Products';
import TheCompany from './components/TheCompany';
import TheTeam from './components/TheTeam';
import Navbar from './components/Navbar';
import UserProfile from './Pages/UserProfile';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import AddProducts from './Pages/AddProducts';


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
        <Route path="/products" element={<Products />} />
        <Route path="/addproducts" element={<AddProducts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={ <PrivateRoute> <Dashboard/> </PrivateRoute>} />
        <Route path="/user" element={ <PrivateRoute> <UserProfile/> </PrivateRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
