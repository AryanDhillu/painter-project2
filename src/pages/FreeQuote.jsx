import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import QuoteForm from '../components/QuoteForm';
import './FreeQuote.css';

const FreeQuote = () => {
  const [initialData, setInitialData] = useState(null);
  const [showPreFillMessage, setShowPreFillMessage] = useState(false);

  useEffect(() => {
    document.title = 'Free Quote | The Painter Guys Pros';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      'Get a free painting quote from The Painter Guys Pros. No obligation estimate for residential and commercial painting services.'
    );

    // Check for pending quote data from home page
    const pendingData = localStorage.getItem('pendingQuoteData');
    if (pendingData) {
      try {
        const parsedData = JSON.parse(pendingData);
        setInitialData(parsedData);
        setShowPreFillMessage(true);
        // Clear the pending data after reading it
        localStorage.removeItem('pendingQuoteData');
        
        // Hide the message after 5 seconds
        setTimeout(() => setShowPreFillMessage(false), 5000);
      } catch (error) {
        console.error('Error parsing pending quote data:', error);
      }
    }
  }, []);

  return (
    <div className="free-quote-page">
      {showPreFillMessage && (
        <motion.div 
          className="pre-fill-notification"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: '#4CAF50',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '8px',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            maxWidth: '300px'
          }}
        >
          ✅ Your details have been pre-filled from the home page!
        </motion.div>
      )}
      
      <section className="hero-section" style={{
        backgroundImage: 'linear-gradient(rgba(1, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(/assets/contactus-hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Get Your Free Quote</h1>
            <p>Ready to refresh your space? Request a fast, no-obligation estimate from our friendly team. We respond within 24 hours!</p>
          </motion.div>
        </div>
      </section>

      <section className="quote-form-section">
        <div className="quote-form-flex">
          <div className="quote-form-container">
            <QuoteForm initialData={initialData} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreeQuote; 