import React, { useEffect, useState } from 'react';

function Home() {
  const [featuredArtisans, setFeaturedArtisans] = useState([]);

  // Récupère les données JSON
  useEffect(() => {
    fetch('/datas.json')
      .then((response) => response.json())
      .then((data) => {
        // Filtrer les artisans vedettes (top = true)
        const topArtisans = data.filter((artisan) => artisan.top);
        setFeaturedArtisans(topArtisans.slice(0, 3)); // Limite à 3 artisans
      })
      .catch((error) => console.error("Erreur lors du chargement des données :", error));
  }, []);

  // Fonction pour afficher les étoiles de notation
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} style={{ color: index < rating ? '#FFD700' : '#ccc' }}>★</span>
    ));
  };

  return (
    <main>
      <section>
        <h1>Bienvenue sur Trouve Ton Artisan</h1>
        
        {/* Section "Comment trouver mon artisan ?" */}
        <section>
          <h2>Comment trouver mon artisan ?</h2>
          <ol>
            <li>Choisir la catégorie d’artisanat dans le menu.</li>
            <li>Choisir un artisan parmi la liste.</li>
            <li>Le contacter via le formulaire de contact.</li>
            <li>Une réponse sera apportée sous 48h.</li>
          </ol>
        </section>

        {/* Section "Artisans du mois" */}
        <section>
          <h2>Artisans du Mois</h2>
          <div style={{ display: 'flex', gap: '20px' }}>
            {featuredArtisans.map((artisan) => (
              <div key={artisan.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', width: '200px' }}>
                <h3>{artisan.name}</h3>
                <p>Spécialité : {artisan.specialty}</p>
                <p>Localisation : {artisan.location}</p>
                <div>Note : {renderStars(Math.round(artisan.note))}</div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default Home;
