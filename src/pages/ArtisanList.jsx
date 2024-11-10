import React, { useEffect, useState } from 'react';
import ArtisanDetail from './ArtisanDetail';

function ArtisanList({ category }) {
  const [artisans, setArtisans] = useState([]);
  const [selectedArtisan, setSelectedArtisan] = useState(null);

  useEffect(() => {
    fetch('/datas.json')
      .then(response => response.json())
      .then(data => {
        const filteredArtisans = data.filter(artisan => artisan.category === category);
        setArtisans(filteredArtisans);
      })
      .catch(error => console.error("Erreur lors du chargement des données :", error));
  }, [category]);

  const handleSelectArtisan = (artisan) => {
    setSelectedArtisan(artisan);
  };

  return (
    <div className="artisan-list-container" style={{ display: 'flex', gap: '20px' }}>
      {/* Liste des artisans */}
      <div className="artisan-list" style={{ flex: 1 }}>
        <h2>Liste des Artisans - {category}</h2>
        <ul>
          {artisans.map(artisan => (
            <li key={artisan.id}>
              <button onClick={() => handleSelectArtisan(artisan)} className="artisan-link">
                {artisan.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Détails de l'artisan sélectionné */}
      <div className="artisan-details" style={{ flex: 2 }}>
        {selectedArtisan ? (
          <ArtisanDetail artisan={selectedArtisan} />
        ) : (
          <p>Sélectionnez un artisan pour voir les détails</p>
        )}
      </div>
    </div>
  );
}

export default ArtisanList;
