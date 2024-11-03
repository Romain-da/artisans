import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ArtisanDetail.css';

function ArtisanDetail() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [showForm, setShowForm] = useState(false); // État pour afficher le formulaire
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    fetch('/datas.json')
      .then(response => response.json())
      .then(data => {
        const selectedArtisan = data.find(artisan => `${artisan.id}` === `${id}`);
        setArtisan(selectedArtisan);
      })
      .catch(error => console.error("Erreur lors du chargement des données :", error));
  }, [id]);

  if (!artisan) {
    return <div>Artisan non trouvé</div>;
  }

  // Gestion de l'affichage du formulaire
  const handleContactClick = () => {
    setShowForm(true);
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données du formulaire:", formData);
    // Ajoutez ici le code pour envoyer les données au backend ou par email

    // Réinitialiser le formulaire et masquer après l'envoi
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
    setShowForm(false);
  };

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="artisan-detail-container">
      <div className="artisan-detail-header">
        <h2 className="artisan-name">{artisan.name}</h2>
      </div>
      <p className="artisan-info">Catégorie : {artisan.category}</p>
      <p className="artisan-info">Spécialité : {artisan.specialty}</p>
      <p className="artisan-info">Note : {artisan.note}</p>
      <p className="artisan-info">Localisation : {artisan.location}</p>

      {/* Bouton de contact */}
      <button onClick={handleContactClick} className="contact-button">
        Contacter
      </button>

      {/* Formulaire de contact */}
      {showForm && (
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
  );
}

export default ArtisanDetail;
