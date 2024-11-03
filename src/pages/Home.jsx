import React, { useEffect, useState } from 'react';
import './Home.css';

function Home() {
  const [featuredArtisans, setFeaturedArtisans] = useState([]);
  const [showForm, setShowForm] = useState(null); // État pour afficher le formulaire de contact pour un artisan spécifique
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  // Récupère les données JSON
  useEffect(() => {
    fetch('/datas.json')
      .then((response) => response.json())
      .then((data) => {
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

  // Gestion de l'affichage du formulaire de contact
  const handleContactClick = (artisanId) => {
    setShowForm(artisanId); // Affiche le formulaire pour un artisan spécifique
  };

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données du formulaire:", formData);
    // Code pour envoyer les données au backend ici

    // Réinitialiser le formulaire et masquer après l'envoi
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
    setShowForm(null);
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

                {/* Bouton de contact */}
                <button onClick={() => handleContactClick(artisan.id)} className="contact-button">
                  Contacter
                </button>

                {/* Formulaire de contact conditionnel */}
                {showForm === artisan.id && (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <h3>Formulaire de Contact</h3>
                    <label>
                      Prénom :
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </label>
                    <label>
                      Nom :
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </label>
                    <label>
                      Adresse Email :
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </label>
                    <label>
                      Message :
                      <textarea name="message" value={formData.message} onChange={handleChange} required />
                    </label>
                    <button type="submit" className="submit-button">Envoyer</button>
                  </form>
                )}
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default Home;
