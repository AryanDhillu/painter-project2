import React, { useEffect } from 'react';
import InteriorPainting from './InteriorPainting';

const TexturedWalls = () => {
  useEffect(() => {
    document.title = 'Textured Wall & Ceiling Painting | The Painter Guys Pros';
    document.querySelector('meta[name="description"]')?.setAttribute('content',
      'Textured wall and ceiling painting by The Painter Guys Pros. Add depth and style to your space.'
    );
  }, []);

  return (
    <InteriorPainting
      heroTitle="Textured Wall & Ceiling Painting"
      heroSubtitle="Add depth and style to your home with expert textured wall and ceiling painting."
  heroImageSrc="/assets/textured-walls-hero.jpg"
      galleryService="interior"
      galleryCategory="Textured Wall & Ceiling Painting"
    />
  );
};

export default TexturedWalls;