import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPalette, FaEye, FaLightbulb } from 'react-icons/fa';
import './ColorConsultation.css';

const ColorConsultation = () => {
  useEffect(() => {
    document.title = 'Color Consultation | The Painter Guys Pros';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      'Color consultation services coming soon from The Painter Guys Pros.'
    );
  }, []);

  return (
    <div className="color-consultation-page">
      <section className="hero-section">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Color Consultation</h1>
            <p>Coming Soon - Professional color consultation services will be avaible </p>
            
            <div className="consultation-features">
              <div className="feature-item">
                <FaPalette className="feature-icon" />
                <span>Expert Color Selection</span>
              </div>
              <div className="feature-item">
                <FaEye className="feature-icon" />
                <span>Visual Mockups</span>
              </div>
              <div className="feature-item">
                <FaLightbulb className="feature-icon" />
                <span>Creative Solutions</span>
              </div>
            </div>
            
            <Link to="/free-quote" className="btn btn-primary">
              Schedule Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ColorConsultation; 