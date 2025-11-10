import React, { useEffect } from 'react';
import InteriorPainting from './InteriorPainting';

const WoodworkTrim = () => {
  useEffect(() => {
    document.title = 'Woodwork & Trim Painting | The Painter Guys Pros';
    document.querySelector('meta[name="description"]')?.setAttribute('content',
      'Woodwork and trim painting by The Painter Guys Pros. Crisp, clean lines and flawless finishes.'
    );
  }, []);

  return (
    <InteriorPainting
      heroTitle="Woodwork & Trim Painting"
      heroSubtitle="Crisp, clean lines and flawless finishes for all your woodwork and trim."
  heroImageSrc="/assets/woodwork-trim-hero.jpg"
      galleryService="interior"
      galleryCategory="Woodwork and Trim Painting"
    />
  );
};

export default WoodworkTrim;