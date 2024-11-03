import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/img/Logo.png';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <div className="logo-container">
                <img src={logo} alt="Logo trouve ton artisan" className="logo" />
            </div>
            <nav className="nav">
                <Link to="/" className="nav-link">Accueil</Link>
                <Link to="/batiment" className="nav-link">Bâtiment</Link>
                <Link to="/services" className="nav-link">Service</Link>
                <Link to="/fabrication" className="nav-link">Fabrication</Link>
                <Link to="/alimentation" className="nav-link">Alimentation</Link>
            </nav>
        </header>
    )
}

export default Header;