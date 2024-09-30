import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">GameShow</Link>
      </div>
      <div className="navbar-links">
        <Link to="/about">About</Link>
        <Link to="/library">Library</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="navbar-auth">
        <Link to="/login" className="btn btn-login">Login</Link>
        <Link to="/signup" className="btn btn-signup">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
