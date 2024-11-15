import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} GameFlow. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
