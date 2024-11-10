import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ArtisanDetail.css';

function ArtisanDetail({ artisan: propArtisan }) {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(propArtisan || null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  // Charge l'artisan si l'ID change dans l'URL et si aucune prop `artisan` n'est fournie
  useEffect(() => {
    if (!propArtisan && id) {
      fetch('/datas.json')
        .then(response => response.json())
        .then(data => {
          const selectedArtisan = data.find(a => `${a.id}` === id);
          setArtisan(selectedArtisan);
        })
        .catch(error => console.error("Erreur lors du chargement des données :", error));
    } else if (propArtisan) {
      // Met à jour l'artisan si `propArtisan` change
      setArtisan(propArtisan);
    }
  }, [id, propArtisan]);

  if (!artisan) {
    return <div>Artisan non trouvé</div>;
  }

  const handleContactClick = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données du formulaire:", formData);
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
    setShowForm(false);
  };

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
      <p className="artisan-info">À propos : {artisan.about}</p>
      <p className="artisan-info">Site internet : <a href={artisan.website} target='_blank' rel='noopener noreferrer'>{artisan.website}</a></p>
      <p className="artisan-info">Note : {artisan.note}</p>
      <p className="artisan-info">Localisation : {artisan.location}</p>

      <button onClick={handleContactClick} className="contact-button">Contacter</button>

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
