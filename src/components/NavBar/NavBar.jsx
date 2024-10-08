import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <ul>
            <Link to="/">Início</Link>
            <Link to="/regras">Regras do Jogo</Link>
            <Link to="/feedback">Sugestões</Link>
            <Link to="/search">Busca</Link>
            </ul>
        </nav>
    );
};

export default Navbar;
