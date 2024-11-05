import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/img/Logo.png';
import './Header.css';

function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm) {
            navigate(`/search?category=${searchTerm}`);
        }
    };

    return (
        <header className="header">
            <div className="logo-container">
                {/* Enveloppez le logo dans un Link */}
                <Link to="/">
                    <img src={logo} alt="Logo trouve ton artisan" className="logo" />
                </Link>
            </div>
            <nav className="nav">
                <Link to="/" className="nav-link">Accueil</Link>
                
                {/* Menu Déroulant pour les Catégories */}
                <div className="dropdown">
                    <button className="dropbtn">Artisans</button>
                    <div className="dropdown-content">
                        <Link to="/batiment">Bâtiment</Link>
                        <Link to="/services">Service</Link>
                        <Link to="/fabrication">Fabrication</Link>
                        <Link to="/alimentation">Alimentation</Link>
                    </div>
                </div>

                {/* Barre de Recherche */}
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Rechercher une catégorie"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">Rechercher</button>
                </form>
            </nav>
        </header>
    );
}

export default Header;
