// Header.jsx
import React from 'react';
import './Header.css';
import Navbar from '../NavBar/NavBar';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Card Game</div>
    <Navbar></Navbar>
    </header>
  );
};

export default Header;
