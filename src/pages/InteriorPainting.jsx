import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import residentialImage from '../../public/assets/residential.png';
import colorexpertsatwork from '../../public/assets/colorexpertsatwork.png';
import flawlessfinish from '../../public/assets/flawlessfinish.png';
import alwaysonschedule from '../../public/assets/alwaysonschedule.png';
import honestcommunication from '../../public/assets/honestcommunication.png';
import wallpainting from '../../public/assets/wallpainting.png';
import ceilingpainting from '../../public/assets/ceilingpainting.png';
import trimandmolding from '../../public/assets/trimandmolding.png';
import accentwalls from '../../public/assets/accentwalls.png';
import { 
  FaPhone,
  FaStar,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import './InteriorPainting.css';

const InteriorPainting = () => {
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    document.title = 'Interior Painting Services | The Painter Guys Pros';
    document.querySelector('meta[name="description"]')?.setAttribute('content',
      'Professional interior painting services. Transform your home with flawless interior painting, color consultation, and premium finishes. Licensed, insured, and guaranteed.'
    );
  }, []);

  const reviews = [
    {
      name: "Michael",
      project: "Exterior Painting",
      text: "Excellent work. Did exterior paint for condo association and did interior work,also would recommend them to anyone.Very neat, will use them again.",
      rating: 5
    },
    {
      name: "Kelly",
      project: "Interior Painting",
      text: "Sami and his crew were awesome! sami and christy were very responsive and answered all of our questions and concerns. the paint crew was respectable,efficient and showed pride in their work. The cost was reasonable and fair. The entire process was seamless and a pleasure. Thanks Painter guys!",
      rating: 5
    },
    {
      name: "Jennifer D",
      project: "Exterior Painting",
      text: "The painter guys delivered amazing quality work faster than we could have hoped fori sami was very professional, personable and easy to work with. Working with painter guys was a postivie experience and we're thankful we found them!",
      rating: 5
    },
    {
      name: "Donald S",
      project: "Exterior Painting",
      text: "They did an awesome job on our house and shed painting project. Sami was extremely knowledgeable, gave us all info about what they were using, and would give us the best results. his crew was very polite and cleaned up ater every shift. We would recommend them for any painting project.",
      rating: 5
    }
  ];

  const nextReview = () => setCurrentReview((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);


  return (
    <div className="interior-painting-page">
      {/* Hero Section */}
      <section 
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.25)),url(${residentialImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="container">
          <div className="hero-content-centered">
            <motion.div
              className="hero-text-centered"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 style={{ 
                color: '#ffffff !important',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                fontWeight: '500',
                fontSize: '3.2rem',
                filter: 'none',
                opacity: '1',
                background: 'transparent'
              }}>
                Interior Painting That Transforms Your Space
              </h1>
              <p style={{ 
                color: '#ffffff !important',
                textShadow: '0 1px 4px rgba(0,0,0,0.7)',
                opacity: '1',
                background: 'transparent'
              }}>
                From cozy bedrooms to bold feature walls — we bring life and elegance to every corner of your home.
              </p>
              <div className="hero-buttons">
                <Link to="/free-quote" className="btn btn-yellow" style={{ zIndex: 10, position: 'relative' }}>
                  Get Free Estimate
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="trust-container">
          <h2 className="trust-title">Why Homeowners Trust Painter Guys Pros</h2>
          <p className="trust-subtitle">
            From flawless finishes to on-time service, here's why clients across Southeast Wisconsin 
            choose us for their interior transformations.
          </p>
          
          <div className="trust-cards">
            <div className="trust-card">
              <div className="card-image">
                <img src={colorexpertsatwork} alt="Color Experts at Work" />
              </div>
              <div className="card-content">
                <h3 className="card-title">
                  Color Experts at Work
                  <span className="arrow-icon">↗</span>
                </h3>
              </div>
            </div>
            
            <div className="trust-card">
              <div className="card-image">
                <img src={flawlessfinish} alt="Flawless, Lasting Finish" />
              </div>
              <div className="card-content">
                <h3 className="card-title">
                  Flawless, Lasting Finish
                  <span className="arrow-icon">↗</span>
                </h3>
              </div>
            </div>
            
            <div className="trust-card">
              <div className="card-image">
                <img src={alwaysonschedule} alt="Always On Schedule" />
              </div>
              <div className="card-content">
                <h3 className="card-title">
                  Always On Schedule
                  <span className="arrow-icon">↗</span>
                </h3>
              </div>
            </div>
            
            <div className="trust-card">
              <div className="card-image">
                <img src={honestcommunication} alt="Honest Communication" />
              </div>
              <div className="card-content">
                <h3 className="card-title">
                  Honest Communication
                  <span className="arrow-icon">↗</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transform Every Room Section */}
      <section className="transform-section">
        <div className="transform-container">
          <motion.div 
            className="transform-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Transform Every Room — With Precision & Style</h2>
            <p>From living rooms to detailed trim work, our interior painting services cover it all. Explore what we offer — crafted to match your vision.</p>
          </motion.div>
          
          <div className="transform-gallery">
            <motion.div 
              className="transform-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <img src={wallpainting} alt="Wall Painting" />
            </motion.div>
            
            <motion.div 
              className="transform-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img src={ceilingpainting} alt="Ceiling Painting" />
            </motion.div>
            
            <motion.div 
              className="transform-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <img src={trimandmolding} alt="Trim & Molding Painting" />
            </motion.div>
            
            <motion.div 
              className="transform-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <img src={accentwalls} alt="Accent Walls" />
            </motion.div>
          </div>
        </div>
      </section>

       {/* Reviews Section */}
       <section className="reviews-section">
         <div className="reviews-container">
           <div className="reviews-header">
             <div className="reviews-title">
               <h2>What Our Customers Say</h2>
               <p>Don't just take our word for it — hear from homeowners and businesses who trusted us to transform their spaces.</p>
             </div>
           </div>
           
           <div className="reviews-wrapper">
             <div className="reviews-slider">
               <div className="reviews-track" style={{ transform: `translateX(-${currentReview * 420}px)` }}>
                 {reviews.map((review, idx) => (
                   <motion.div
                     key={idx}
                     className="review-card"
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: idx * 0.1 }}
                   >
                     <div className="review-content">
                       <div className="review-rating">
                         {[...Array(review.rating)].map((_, i) => (
                           <FaStar key={i} />
                         ))}
                       </div>
                       <p className="review-text">{review.text}</p>
                       <div className="review-author">
                         <h4>{review.name}</h4>
                         <span>{review.project}</span>
                       </div>
                     </div>
                   </motion.div>
                 ))}
                 <Link to="/reviews" className="review-link">
                   <div className="review-arrow">
                     <FaArrowRight />
                   </div>
                 </Link>
               </div>
             </div>
             
             <button className="review-nav prev" onClick={prevReview}>
               <FaChevronLeft />
             </button>
             <button className="review-nav next" onClick={nextReview}>
               <FaChevronRight />
             </button>
           </div>
        </div>
      </section>
    </div>
  );
};

export default InteriorPainting; 