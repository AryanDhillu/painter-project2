import React, { useEffect } from 'react';
import ExteriorPainting from './ExteriorPainting';

const VinylAluminum = () => {
  useEffect(() => {
    document.title = 'Vinyl & Aluminum Siding | The Painter Guys Pros';
    document.querySelector('meta[name="description"]')?.setAttribute('content',
      'Vinyl and aluminum siding painting and restoration by The Painter Guys Pros. Boost curb appeal and protection.'
    );
  }, []);

  return (
    <ExteriorPainting
      heroTitle="Vinyl & Aluminum Siding"
      heroSubtitle="Refresh and protect your home’s exterior with professional siding painting and restoration."
      heroImageSrc="/assets/vinyl-siding-hero.jpg"
      galleryService="exterior"
      galleryCategory="Vinyl and Aluminum Siding"
    />
  );
};

export default VinylAluminum;