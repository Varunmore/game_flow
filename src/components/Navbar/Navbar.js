import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">GameFlow</Link>
      </div>
      <div className="navbar-links">
        <Link to="/library">Library</Link>
        <Link to="/Subscription">Subscription</Link>
      </div>
      <div className="navbar-auth">
        <Link to="/signup" className="btn btn-signup">Get Started</Link>
      </div>
    </nav>
  );
};

export default Navbar;
