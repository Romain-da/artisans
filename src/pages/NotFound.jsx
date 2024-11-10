import React from 'react';
import notFound from '../assets/img/notfound.jpg'

function NotFound() {
  return (
    <div>
      <h2>Page non trouvée</h2>
      <p>La page que vous recherchez n'existe pas.</p>
      <img src={notFound} alt="Page non trouvée" className='NotFound' />
    </div>
  );
}

export default NotFound;
