import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function SearchResults() {
    const [filteredArtisans, setFilteredArtisans] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');

    useEffect(() => {
        if (category) {
            fetch('/datas.json')
                .then((response) => response.json())
                .then((data) => {
                    // Filtrer les artisans par catégorie
                    const results = data.filter(artisan =>
                        artisan.category.toLowerCase().includes(category.toLowerCase())
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
