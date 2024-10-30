import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import ArtisanList from './pages/ArtisanList';
import ArtisanDetail from './pages/ArtisanDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/batiment">Bâtiment</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/fabrication">Fabrication</Link></li>
            <li><Link to="/alimentation">Alimentation</Link></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/batiment" element={<ArtisanList category="Bâtiment" />} />
        <Route path="/services" element={<ArtisanList category="Services" />} />
        <Route path="/fabrication" element={<ArtisanList category="Fabrication" />} />
        <Route path="/alimentation" element={<ArtisanList category="Alimentation" />} />
        <Route path="/artisan/:id" element={<ArtisanDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;