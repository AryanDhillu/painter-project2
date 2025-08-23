import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaChevronLeft, FaChevronRight, FaStar, FaArrowRight } from 'react-icons/fa';
import './ExteriorPainting.css';

const features = [
  'Full exterior house painting',
  'Siding, trim, doors, and more',
  'Deck and fence staining/painting',
  'Power washing and surface prep',
  'Weather-resistant, premium paints',
  'Clean-up and protection guaranteed',
];

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

const ExteriorPainting = () => {
  const [currentReview, setCurrentReview] = useState(0);
  
  const transformServices = [
    { image: "/assets/full-home-painting.png", title: "Full Home Painting" },
    { image: "/assets/deck-and-fence-finishing.png", title: "Deck & Fence Finishes" },
    { image: "/assets/vinyl-and-aluminium-painting.png", title: "Vinyl & Aluminum Painting" },
    { image: "/assets/powerwash-and-surfaceprep.png", title: "Power Washing & Surface Prep" }
  ];

  useEffect(() => {
    document.title = 'Exterior Painting | The Painter Guys Pros';
    document.querySelector('meta[name="description"]')?.setAttribute('content',
      'Boost curb appeal and protect your home with expert exterior painting by The Painter Guys Pros. Free estimates and premium finishes.'
    );
  }, []);

  const nextReview = () => setCurrentReview((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <div className="exterior-painting-page">
      <section className="exterior-hero">
        <img src="/assets/exterior-hero.png" alt="Exterior Painting Hero" className="exterior-hero-img" />
        <div className="exterior-hero-content">
          <h1>Exterior Painting That Protects & Impresses</h1>
          <p>Boost curb appeal and protect your home with long-lasting, expert-applied exterior paint.</p>
          <Link to="/free-quote" className="btn btn-estimate">Book Free Estimate</Link>
        </div>
      </section>

      <section className="investment-section">
        <div className="container">
          <div className="investment-header">
            <h2>We Don't Just Paint — We Protect Your Investment</h2>
            <p>We use Sherwin-Williams and Benjamin Moore paints, applied with precision, to ensure long-lasting beauty and weather resistance.</p>
          </div>
          
          <div className="investment-grid">
            <div className="investment-card">
              <div className="card-image">
                <img src="/assets/color-experts-at-work.png" alt="Color Experts at Work" />
              </div>
              <div className="card-content">
                <h3>Color Experts at Work</h3>
                <p>Guaranteed quality with free repairs for any workmanship issues.</p>
              </div>
            </div>

            <div className="investment-card">
              <div className="card-image">
                <img src="/assets/premium-paint-brands.png" alt="Premium Paint Brands" />
              </div>
              <div className="card-content">
                <h3>Premium Paint Brands</h3>
                <p>Sherwin-Williams & Benjamin Moore for vibrant, long-lasting finishes.</p>
              </div>
            </div>

            <div className="investment-card">
              <div className="card-image">
                <img src="/assets/on-time-on-budget.png" alt="On-Time, On-Budget" />
              </div>
              <div className="card-content">
                <h3>On-Time, On-Budget</h3>
                <p>We stick to our timelines and agreed pricing, every time.</p>
              </div>
            </div>

            <div className="investment-card">
              <div className="card-image">
                <img src="/assets/clean-and-respectful.png" alt="Clean & Respectful" />
              </div>
              <div className="card-content">
                <h3>Clean & Respectful</h3>
                <p>We protect your property and leave it spotless after every job.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transform Every Surface Section */}
      <section className="transform-section">
        <div className="transform-container">
          <motion.div 
            className="transform-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Every surface, Expertly covered</h2>
            <p>From living room to detailed trim work, our exterior painting services cover it all. Explore what we offer -- crafted to match your vision</p>
          </motion.div>
          
          <div className="transform-gallery">
            {transformServices.map((service, index) => (
              <motion.div 
                key={index}
                className="transform-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <img src={service.image} alt={service.title} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="reviews-container">
          <div className="reviews-header">
            <div className="reviews-title">
              <h2>What Our Customers Says</h2>
              <p>Don't just take our word for it — hear from homeowners and businesses who trusted us to transform their spaces.</p>
            </div>
          </div>
          
          <div className="reviews-wrapper">
            <div className="reviews-slider">
              <div className="reviews-track">
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
          </div>
        </div>
      </section>

  
    </div>
  );
};

export default ExteriorPainting; 