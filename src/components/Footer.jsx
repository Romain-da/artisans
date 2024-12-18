import React from 'react';
import './Footer.css';
import Logo from '../assets/img/Logo.png';
import Facebook from '../assets/img/facebook.png';
import Twitter from '../assets/img/twitter.png';
import Instagram from '../assets/img/instagram.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h4>Contact</h4>
          <p>Adresse : 110 cours Charlemagne</p>
          <p>CS 2033</p>
          <p>69269 LYON CEDEX 02</p>
          <p>France</p>
          <p>Téléphone : +33 (0)4 26 73 40 00</p>
        </div>
        <div className="footer-column">
          <h4>Liens Rapides</h4>
          <a href="/terms">Conditions d'utilisation</a>
          <a href="/privacy">Politique de confidentialité</a>
          <a href="/help">Aide</a>
        </div>
        <div className="footer-column">
          <h4>Suivez-nous</h4>
          <div className="footer-socials">
            <a href="https://www.facebook.com/?locale=fr_FR" target="_blank"><img src={Facebook} alt='Logo facebook'></img></a>
            <a href="https://x.com/?lang=fr" target="_blank"><img src={Twitter} alt='Logo twitter'></img></a>
            <a href="https://www.instagram.com/" target="_blank"><img src={Instagram} alt='Logo twitter'></img></a>
          </div>
        </div>
      </div>
      <p>&copy; 2023 Trouve Ton Artisan - Tous droits réservés</p>
    </footer>
  );
}

export default Footer;