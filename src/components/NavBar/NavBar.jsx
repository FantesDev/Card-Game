import React from 'react';
import './NavBar.css'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <ul>
                <a href="#home">Home</a>
                <a href="#about">Sobre</a>
                <a href="#contact">Contato</a>
            </ul>
        </nav>
    );
};

export default Navbar;
