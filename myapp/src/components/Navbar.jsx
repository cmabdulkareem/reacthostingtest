import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    
        <div className="container">
            <header className="d-flex justify-content-center py-3">
            <ul className="nav nav-pills">
                <li className="nav-item"><NavLink to="/" className="nav-link" aria-current="page">Home</NavLink></li>
                <li className="nav-item"><NavLink to="/aboutus" className="nav-link">About</NavLink></li>
                <li className="nav-item"><NavLink to="/products" className="nav-link">Products</NavLink></li>
                <li className="nav-item"><NavLink to="/addproducts" className="nav-link">Add Products</NavLink></li>
            </ul>
            </header>
        </div>
    </>
  )
}

export default Navbar
