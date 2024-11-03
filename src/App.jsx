import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ArtisanList from './pages/ArtisanList';
import ArtisanDetail from './pages/ArtisanDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Header />  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/batiment" element={<ArtisanList category="Bâtiment" />} />
        <Route path="/services" element={<ArtisanList category="Services" />} />
        <Route path="/fabrication" element={<ArtisanList category="Fabrication" />} />
        <Route path="/alimentation" element={<ArtisanList category="Alimentation" />} />
        <Route path="/artisan/:id" element={<ArtisanDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
