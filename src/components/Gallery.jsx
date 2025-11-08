import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaTrash, FaEdit } from 'react-icons/fa';
import './Gallery.css';

const Gallery = ({ images = [], showFilters = true, limit = null, isAuthenticated = false, onOpenUploadModal, onDeleteImage, onEditImage, initialFilter, initialCategory }) => {
  const [filter, setFilter] = useState('all');
  const [selectedCategories, setSelectedCategories] = useState([]); // multi-select categories for interior/exterior
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const EXTERIOR_CATEGORIES = [
    'Power Washing',
    'Stucco Repair and Painting',
    'Vinyl and Aluminum Siding',
    'Deck & Fence Services',
    'Exterior Painting',
  ];

  const INTERIOR_CATEGORIES = [
    'Cabinet Refinishing/Repainting',
    'Wallpaper Removal',
    'Textured Wall & Ceiling Painting',
    'Woodwork and Trim Painting',
    'Interior Painting',
  ];

  const normalize = (s = '') => s.toString().trim().toLowerCase();
  const INTERIOR_N = INTERIOR_CATEGORIES.map(normalize);
  const EXTERIOR_N = EXTERIOR_CATEGORIES.map(normalize);

  // Seed initial filter/category from props (e.g., when navigated with query params)
  useEffect(() => {
    if (initialFilter) {
      const lf = initialFilter.toLowerCase();
      setFilter(lf);
      if (lf === 'interior') {
        setSelectedCategories(INTERIOR_N);
      } else if (lf === 'exterior') {
        setSelectedCategories(EXTERIOR_N);
      } else {
        setSelectedCategories([]);
      }
    }
    if (initialCategory) {
      const norm = normalize(initialCategory);
      setSelectedCategories(norm ? [norm] : []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtering logic based on serviceType and optional sub-category
  const filteredImages = images
    .slice() // copy array to avoid mutating original
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // sort by createdAt desc
    .filter(item => {
      const st = (item.serviceType || '').toLowerCase();
      const catNorm = normalize(item.category || '');
      if (filter === 'all') return true;
      if (filter === 'interior') {
        if (!st.includes('interior')) return false;
        // If none selected, hide all images
        if (selectedCategories.length === 0) return false;
        // Include items whose category is selected; include legacy unclassified only when all are selected
        if (catNorm) return selectedCategories.includes(catNorm);
        return selectedCategories.length === INTERIOR_N.length;
      }
      if (filter === 'exterior') {
        if (!st.includes('exterior')) return false;
        if (selectedCategories.length === 0) return false;
        if (catNorm) return selectedCategories.includes(catNorm);
        return selectedCategories.length === EXTERIOR_N.length;
      }
      if (filter === 'commercial') {
        return st.includes('commercial');
      }
      // fallback text search
      return st.includes(filter) || (item.caption && item.caption.toLowerCase().includes(filter));
    });

  const displayImages = limit ? filteredImages.slice(0, limit) : filteredImages;

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentIndex(0);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  const handleKeyDown = (e) => {
    if (selectedImage) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  const filterOptions = [
    { value: 'all', label: 'All Projects' },
    { value: 'interior', label: 'Interior' },
    { value: 'exterior', label: 'Exterior' },
    { value: 'commercial', label: 'Commercial' }
  ];
  
  const isInteriorOrExterior = filter === 'interior' || filter === 'exterior';
  const allList = filter === 'interior' ? INTERIOR_N : filter === 'exterior' ? EXTERIOR_N : [];
  const allSelected = isInteriorOrExterior && selectedCategories.length === allList.length;
  const noneSelected = isInteriorOrExterior && selectedCategories.length === 0;
  const masterCheckboxRef = useRef(null);

  useEffect(() => {
    if (masterCheckboxRef.current) {
      masterCheckboxRef.current.indeterminate = isInteriorOrExterior && !allSelected && !noneSelected;
    }
  }, [isInteriorOrExterior, allSelected, noneSelected, selectedCategories]);

  return (
    <div className="gallery-container">
      {showFilters && (
        <div className="gallery-header">
          <div className="gallery-filters">
            {filterOptions.map(option => (
              <button
                key={option.value}
                className={`filter-btn ${filter === option.value ? 'active' : ''}`}
                onClick={() => {
                  setFilter(option.value);
                  if (option.value === 'interior') {
                    setSelectedCategories(INTERIOR_N);
                  } else if (option.value === 'exterior') {
                    setSelectedCategories(EXTERIOR_N);
                  } else {
                    setSelectedCategories([]);
                  }
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
          {(filter === 'interior' || filter === 'exterior') && (
            <div className="gallery-subfilters">
              {/* Master checkbox control */}
              <label className="filter-btn filter-checkbox" title="Select categories to show images">
                <input
                  ref={masterCheckboxRef}
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories(allList);
                    } else {
                      setSelectedCategories([]);
                    }
                  }}
                />
                <span>Select a Category</span>
              </label>
              {(filter === 'interior' ? INTERIOR_CATEGORIES : EXTERIOR_CATEGORIES).map(opt => {
                const optNorm = normalize(opt);
                const active = selectedCategories.includes(optNorm);
                return (
                  <button
                    key={opt}
                    className={`filter-btn ${active ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategories(prev => {
                        const has = prev.includes(optNorm);
                        if (has) return prev.filter(c => c !== optNorm);
                        return [...prev, optNorm];
                      });
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div className="gallery-grid">
        <AnimatePresence>
          {displayImages.map((item, index) => (
            <motion.div
              key={item._id || item.id}
              className="gallery-item"
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="gallery-image-container" onClick={() => openLightbox(item, index)}>
                <img
                  src={item.imageUrl}
                  alt={item.caption}
                  className="gallery-image"
                  loading="lazy"
                />
                {/* Always-visible badge for category only */}
                <div className="image-badges">
                  {item.category && (
                    <span className="badge badge--category">{item.category}</span>
                  )}
                </div>

                {/* Hover overlay with caption and tags */}
                <div className="gallery-overlay">
                  <div className="gallery-overlay-content">
                    {item.caption && <h3>{item.caption}</h3>}
                    <div className="gallery-tags">
                      {item.category && <span className="tag">{item.category}</span>}
                    </div>
                  </div>
                </div>
                {/* Show edit and delete buttons on image if authenticated */}
                {isAuthenticated && (
                  <div style={{ position: "absolute", top: 8, right: 8, zIndex: 2, display: "flex", gap: "8px" }}>
                    <button
                      className="gallery-admin-action-btn gallery-edit-btn"
                      title="Edit Image"
                      style={{
                        background: "rgba(40,167,69,0.9)",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer"
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onEditImage) onEditImage(item);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="gallery-admin-action-btn gallery-delete-btn"
                      title="Delete Image"
                      style={{
                        background: "rgba(220,53,69,0.9)",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer"
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onDeleteImage) onDeleteImage(item._id || item.id);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {displayImages.length === 0 && (
        <div className="no-results">
          {isInteriorOrExterior && noneSelected ? (
            <>
              <h3>Select a category to display images</h3>
              <p>Use the checkbox or pick one or more categories above.</p>
            </>
          ) : (
            <>
              <h3>No projects found</h3>
              <p>Try adjusting your filter selection</p>
            </>
          )}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={closeLightbox}>
                <FaTimes />
              </button>

              <div className="lightbox-image-container">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.caption}
                  className="lightbox-image"
                />
                {filteredImages.length > 1 && (
                  <>
                    <button className="lightbox-nav prev" onClick={prevImage}>
                      <FaChevronLeft />
                    </button>
                    <button className="lightbox-nav next" onClick={nextImage}>
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </div>

              <div className="lightbox-counter">
                {currentIndex + 1} / {filteredImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;