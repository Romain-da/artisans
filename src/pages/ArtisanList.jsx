import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ArtisanList({ category }) {
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    fetch('/datas.json')
      .then(response => response.json())
      .then(data => {
        // Filtrer les artisans par catégorie
        const filteredArtisans = data.filter(artisan => artisan.category === category);
        setArtisans(filteredArtisans);
      })
      .catch(error => console.error("Erreur lors du chargement des données :", error));
  }, [category]);

  return (
    <div>
      <h2>Liste des Artisans - {category}</h2>
      <ul>
        {artisans.map(artisan => (
          <li key={artisan.id}>
            <Link to={`/artisan/${artisan.id}`}>{artisan.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArtisanList;

