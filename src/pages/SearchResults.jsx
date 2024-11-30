import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function SearchResults() {
    const [filteredArtisans, setFilteredArtisans] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');

    // Fonction pour normaliser les chaînes (suppression des accents et mise en minuscule)
    const normalizeString = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    useEffect(() => {
        if (category) {
            console.log("Catégorie recherchée :", category);
            fetch('/datas.json')
                .then((response) => response.json())
                .then((data) => {
                   
                    // Afficher toutes les catégories des artisans pour vérifier le format
                    data.forEach(artisan => console.log("Catégorie de l'artisan:", artisan.category));

                    // Normalisation de la catégorie recherchée
                    const normalizedCategory = normalizeString(category);

                    // Filtrage avec comparaison moins stricte
                    const results = data.filter(artisan =>
                        artisan.category && normalizeString(artisan.category).includes(normalizedCategory)
                    );

                    setFilteredArtisans(results);
                })
                .catch(error => console.error("Erreur lors du chargement des données :", error));
        }
    }, [category]);

    return (
        <div>
            <h2>Résultats de recherche pour : {category}</h2>
            <ul>
                {filteredArtisans.length > 0 ? (
                    filteredArtisans.map(artisan => (
                        <li key={artisan.id}>
                            {/* Utilisation de `Link` pour naviguer vers ArtisanDetail avec l'ID */}
                            <Link to={`/artisan/${artisan.id}`}>
                                {artisan.name} - {artisan.specialty} - {artisan.location}
                            </Link>
                        </li>
                    ))
                ) : (
                    <p>Aucun artisan trouvé pour cette catégorie.</p>
                )}
            </ul>
        </div>
    );
}

export default SearchResults;
