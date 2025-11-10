import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUpload, FaImage } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { uploadImage } from "../store/gallerySlice";
import './ImageUploadModal.css';

const ImageUploadModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector(state => state.auth);
  const { uploadLoading, uploadError } = useSelector(state => state.gallery);

  const [formData, setFormData] = useState({
    imageUrl: '',
    caption: '',
    serviceType: '',
    category: ''
  });
  const [error, setError] = useState("");

  const handleClose = useCallback(() => {
    setFormData({ imageUrl: '', caption: '', serviceType: '', category: '' });
    setError("");
    if (onClose) onClose();
  }, [onClose]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // If serviceType changes, reset category
    if (name === 'serviceType') {
      setFormData(prev => ({ ...prev, serviceType: value, category: '' }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  // Caption no longer required
  if (!formData.imageUrl || !formData.serviceType || !formData.category) return;

    setError("");
    dispatch(
      uploadImage({
        imageUrl: formData.imageUrl,
        caption: formData.caption,
        serviceType: formData.serviceType,
        token,
        category: formData.category
      })
    )
      .unwrap()
      .then(() => {
        handleClose();
      })
      .catch((err) => {
        setError(err || "Upload failed");
      });
  };

  if (!isOpen || !isAuthenticated) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="image-upload-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="image-upload-modal"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          onClick={e => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              handleClose();
            }
          }}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal-header">
            <h2 id="modal-title">Upload New Image</h2>
            <button
              type="button"
              className="close-button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClose();
              }}
              aria-label="Close modal"
              title="Close (Esc)"
            >
              <FaTimes />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="upload-form">
            <div className="form-group">
              <label htmlFor="imageUrl">
                <FaImage className="input-icon" />
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="Enter direct image URL"
                required
                disabled={uploadLoading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="caption">Caption <span style={{fontWeight:400, fontStyle:'italic'}}>(optional)</span></label>
              <input
                type="text"
                id="caption"
                name="caption"
                value={formData.caption}
                onChange={handleInputChange}
                placeholder="Enter caption (optional)"
                disabled={uploadLoading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="serviceType">
                Service Type
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                required
                disabled={uploadLoading}
              >
                <option value="">Select service type</option>
                <option value="Interior Painting">Interior Painting</option>
                <option value="Exterior Painting">Exterior Painting</option>
              </select>
            </div>

            {/* Category dependent on serviceType */}
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                disabled={uploadLoading || !formData.serviceType}
              >
                <option value="">Select category</option>
                {formData.serviceType === 'Exterior Painting' &&
                  EXTERIOR_CATEGORIES.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                {formData.serviceType === 'Interior Painting' &&
                  INTERIOR_CATEGORIES.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
              </select>
            </div>

            {(error || uploadError) && (
              <div className="upload-info">
                <strong>{error || uploadError}</strong>
              </div>
            )}

            <button
              type="submit"
              className="upload-button"
              disabled={uploadLoading}
            >
              {uploadLoading ? 'Uploading...' : (
                <>
                  <FaUpload /> Upload Image
                </>
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageUploadModal;
