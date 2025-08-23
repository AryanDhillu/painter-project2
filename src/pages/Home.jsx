import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPaintBrush, FaHome, FaBuilding, FaCheckCircle, FaStar, FaQuoteLeft, FaImages, FaPalette, FaCogs, FaArrowRight } from 'react-icons/fa';
import './Home.css';
import AnnouncementBanner from '../components/AnnouncementBanner';
// Use public asset paths instead of imports
const heroImage = '/assets/hero-s1.jpg';
const heroImage2 = '/assets/hero-s2.jpg';
const heroImage3 = '/assets/hero-s3.jpg';
const howItWorks1 = '/assets/how-it-works1.png';
const howItWorks2 = '/assets/how-it-works2.png';
const howItWorks3 = '/assets/how-it-works3.png';
const bookSlotImage = '/assets/book-your-slot.png';
const ourWork1 = '/assets/our-work1.png';
const ourWork2 = '/assets/our-work2.png';
const ourWork3 = '/assets/our-work3.png';
const findColors1 = '/assets/find-your-colors1.png';
const swLogo = '/assets/sw.jpg';
const bmLogo = '/assets/bm.jpg';

const heroSlides = [
  {
    title: 'Excellence in Every Brushstroke',
    subtitle: 'Trusted Residential and Commercial Painting Services in Southeast Wisconsin',
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`, // Modern US house
    cta: 'Book Your Free Site Visit',
    ctaLink: '/free-quote',
  },
  {
    title: 'Book a Free Site Visit',
    subtitle: 'Expert Painting with Outstanding Service and Attention to Detail',
    background: `linear-gradient(135deg, rgba(1, 1, 1, 0.7), rgba(1, 1, 1, 0.7)), url(${bookSlotImage})`, // Book your slot image
    cta: 'Book Now',
    ctaLink: '/free-quote',
  },
  {
    title: 'Free Personalized Color Consultation',
    subtitle: 'Every estimate includes a free color consultation to help you select the perfect shades — confidently and stress-free.',
    background: `linear-gradient(135deg, rgba(1, 1, 1, 0.7), rgba(1, 1, 1, 0.7)), url(${heroImage3})`, // Suburban US house
    cta: 'Find Your Perfect Color',
    ctaLink: '/color-consultation',
  },
];

const steps = [
  { icon: <FaHome />, title: 'Step 1', desc: 'Request Your Free Estimate' },
  { icon: <FaCogs />, title: 'Step 2', desc: 'Approve Your Customized Proposal' },
  { icon: <FaPaintBrush />, title: 'Step 3', desc: 'Transform Your Space with Expert Craftsmanship' },
];

const stepDetails = {
  1: {
    title: "Step 1: Schedule Your Site Visit",
    description: "Our process begins with a personalized consultation. Fill out our quick form or call us to schedule your free site visit. Our experienced professionals will assess your painting needs, discuss your vision, and provide expert recommendations. We'll take measurements, evaluate surface conditions, and discuss color preferences to create a comprehensive plan tailored to your specific needs.",
    bgColor: "#4A3D55"
  },
  2: {
    title: "Step 2: Get Your Customized Quote",
    description: "Within 24 hours of your site visit, you'll receive a detailed, transparent quote with project scope, timeline, materials, and pricing.",
    bgColor: "#2B3674"
  },
  3: {
    title: "Step 3: Transform Your Space",
    description: "Once you approve the proposal, our expert team gets to work transforming your space. We handle everything from surface preparation to final cleanup, ensuring a flawless finish.",
    bgColor: "#F4C542"
  }
};

const galleryImages = [
  'https://images.unsplash.com/photo-1503389152951-9c3d0c6b7a5a?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
];

const serviceCards = [
  { icon: <FaHome />, title: 'Interior Painting', desc: 'Flawless finishes for every room.' },
  { icon: <FaBuilding />, title: 'Exterior Painting', desc: 'Curb appeal and protection.' },
  { icon: <FaPaintBrush />, title: 'Cabinet Refinishing', desc: 'Modernize your kitchen or bath.' },
  { icon: <FaCogs />, title: 'Power Washing', desc: 'Clean, prep, and restore surfaces.' },
  { icon: <FaCheckCircle />, title: 'Deck Services', desc: 'Stain, seal, and protect your deck.' },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    rating: 5,
    text: 'Excellent work! The team was professional, punctual, and the quality exceeded our expectations.',
    project: 'Interior Painting',
  },
  {
    name: 'Mike Chen',
    rating: 5,
    text: 'They transformed our office space completely. Great attention to detail and competitive pricing.',
    project: 'Commercial Painting',
  },
  {
    name: 'Lisa Rodriguez',
    rating: 5,
    text: 'The color consultation was invaluable. Our home looks amazing with the new paint scheme.',
    project: 'Color Consultation',
  },
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

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const [expandedStep, setExpandedStep] = useState(null);
  const [bookingData, setBookingData] = useState({
    fullName: '',
    phoneNo: '',
    email: '',
    address: '',
    serviceType: '',
    projectType: '',
    date: '',
    timeSlot: '',
    termsAccepted: false
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Remove auto-sliding for reviews
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const nextReview = () => setCurrentReview((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookingData.termsAccepted) {
      alert('Please accept the terms and conditions to proceed.');
      return;
    }

    // Store booking data for the FreeQuote page
    const quoteData = {
      name: bookingData.fullName,
      email: bookingData.email,
      phone: bookingData.phoneNo,
      address: bookingData.address,
      serviceType: bookingData.serviceType,
      projectType: bookingData.projectType,
      appointmentDate: bookingData.date,
      appointmentSlot: bookingData.timeSlot,
      // Add timestamp to identify this session
      timestamp: Date.now()
    };
    
    // Save to localStorage for the FreeQuote page
    localStorage.setItem('pendingQuoteData', JSON.stringify(quoteData));
    
    // Reset form
    setBookingData({
      fullName: '',
      phoneNo: '',
      email: '',
      address: '',
      serviceType: '',
      projectType: '',
      date: '',
      timeSlot: '',
      termsAccepted: false
    });
    
    // Navigate to FreeQuote page
    window.location.href = '/free-quote';
  };

  return (
    <div className="home">
      {/* Hero Slideshow */}
      <section className="hero-slideshow">
        <div className="slideshow-container">
          {heroSlides.map((slide, idx) => (
            <motion.div
              key={idx}
              className={`slide${idx === currentSlide ? ' active' : ''}`}
              style={{ background: slide.background }}
              initial={{ opacity: 0 }}
              animate={{ opacity: idx === currentSlide ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
                <div className="slide-content">
                  <motion.div
                    className="slide-text"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    <h1>{slide.title}</h1>
                    <h2>{slide.subtitle}</h2>
                    <Link to={slide.ctaLink} className="btn btn-cta btn-large">
                      {slide.cta}
                    </Link>
                  </motion.div>
              </div>
            </motion.div>
          ))}
          <button className="slide-nav prev" onClick={prevSlide}><FaChevronLeft /></button>
          <button className="slide-nav next" onClick={nextSlide}><FaChevronRight /></button>
          <div className="slide-indicators">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                className={`indicator${idx === currentSlide ? ' active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Announcement Banner below slider */}

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="how-it-works-container">
          <div className="how-it-works-header">
            <h2>How It Works</h2>
            <p>Your 3-Step Process</p>
            <p className="subtitle">It's Easy to Get Started with Painter Guys Pros & From free site visit to a beautifully painted space — here's how it works</p>
          </div>
          
          <div className="how-it-works-grid">
            <div 
              className={`how-it-works-card large ${expandedStep === 1 ? 'expanded' : ''}`}
              style={expandedStep === 1 ? { backgroundColor: stepDetails[1].bgColor, color: 'white' } : {}}
              onClick={() => setExpandedStep(expandedStep === 1 ? null : 1)}
            >
              {expandedStep === 1 ? (
                <div className="expanded-content">
                  <h3>{stepDetails[1].title}</h3>
                  <p>{stepDetails[1].description}</p>
                  <button 
                    className="close-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedStep(null);
                    }}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <>
                  <div className="image-container">
                    <img src={howItWorks1} alt="Step 1: Schedule your site visit" />
                  </div>
                  <div className="card-content">
                    <h3>Step 01</h3>
                    <p>Fill a quick form or call us to schedule your site visit.</p>
                    <span className="read-more">Read More →</span>
                  </div>
                </>
              )}
            </div>
            
            <div className="how-it-works-cards-right">
              <div 
                className={`how-it-works-card small ${expandedStep === 2 ? 'expanded' : ''}`}
                style={expandedStep === 2 ? { backgroundColor: stepDetails[2].bgColor, color: 'white' } : {}}
                onClick={() => setExpandedStep(expandedStep === 2 ? null : 2)}
              >
                {expandedStep === 2 ? (
                  <div className="expanded-content">
                    <h3>{stepDetails[2].title}</h3>
                    <p>{stepDetails[2].description}</p>
                    <button 
                      className="close-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedStep(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="image-container">
                      <img src={howItWorks2} alt="Step 2: Get your quote" />
                    </div>
                                      <div className="card-content">
                    <h3>Step 02</h3>
                    <p>Get a clear, customized quote with timeline and scope.</p>
                    <span className="read-more">Read More →</span>
                  </div>
                  </>
                )}
              </div>
              
              <div 
                className={`how-it-works-card small gold ${expandedStep === 3 ? 'expanded' : ''}`}
                style={expandedStep === 3 ? { backgroundColor: stepDetails[3].bgColor, color: 'white' } : {}}
                onClick={() => setExpandedStep(expandedStep === 3 ? null : 3)}
              >
                {expandedStep === 3 ? (
                  <div className="expanded-content">
                    <h3>{stepDetails[3].title}</h3>
                    <p>{stepDetails[3].description}</p>
                    <button 
                      className="close-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedStep(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="image-container">
                      <img src={howItWorks3} alt="Step 3: Transform your space" />
                    </div>
                                      <div className="card-content">
                    <h3>Step 03</h3>
                    <p>Sit back while our pros transform your space. Clean and on-time.</p>
                    <span className="read-more">Read More →</span>
                  </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Your Slot Section */}
      <section className="book-slot-section">
        <div className="book-slot-container">
          <div className="book-slot-content">
            <div className="book-slot-form">
              <h2>Book Your Free Site Visit</h2>
              <p>Select a one-hour slot between 9AM and 5PM — our professionals will visit your site for a free, no-obligation consultation.</p>
              
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your Full Name"
                    value={bookingData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="tel"
                    name="phoneNo"
                    placeholder="Enter your Phone No."
                    value={bookingData.phoneNo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Property Address"
                    value={bookingData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <select
                    name="serviceType"
                    value={bookingData.serviceType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Service Type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                  </select>
                  <select
                    name="projectType"
                    value={bookingData.projectType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Project Type</option>
                    <option value="interior">Interior</option>
                    <option value="exterior">Exterior</option>
                  </select>
                </div>
                
                <div className="form-row">
                  <input
                    type="date"
                    name="date"
                    value={bookingData.date}
                    onChange={handleInputChange}
                    required
                  />
                  <select
                    name="timeSlot"
                    value={bookingData.timeSlot}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Time Slot</option>
                    <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                    <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
                    <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
                    <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                    <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                    <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
                  </select>
                </div>
                
                <div className="form-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={bookingData.termsAccepted}
                      onChange={handleInputChange}
                    />
                    <span>I agree to the Terms of Service and Privacy Policy. Yes, I would like to receive important updates and notifications through calls, SMS, or e-mail.</span>
                  </label>
          </div>
                
                <button 
                  type="submit" 
                  className="btn-book-slot"
                  disabled={!bookingData.termsAccepted}
                >
                  Book Free Site Visit
                </button>
              </form>
          </div>
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section className="our-work-section">
        <div className="our-work-container">
          <div className="our-work-header">
            <div className="our-work-title">
              <h2>Our Work</h2>
              <h3>Speaks for Itself</h3>
              <p>From bold interiors to flawless exteriors, discover how we bring color and quality together.</p>
              <Link to="/gallery" className="btn-view-work">View Our Work</Link>
            </div>
          </div>
          
          <div className="our-work-grid">
            <Link to="/gallery" className="work-card">
              <img src={ourWork1} alt="Modern Living Room" />
              <div className="work-card-content">
                <h4>Modern<br />Living Room</h4>
                <FaArrowRight className="arrow-icon" />
              </div>
            </Link>

            <Link to="/gallery" className="work-card">
              <img src={ourWork2} alt="Classic Green Room" />
              <div className="work-card-content">
                <h4>Classic<br />Green Room</h4>
                <FaArrowRight className="arrow-icon" />
              </div>
            </Link>

            <Link to="/gallery" className="work-card">
              <img src={ourWork3} alt="Exterior Balcony" />
              <div className="work-card-content">
                <h4>Exterior<br />Balcony</h4>
                <FaArrowRight className="arrow-icon" />
              </div>
            </Link>
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

      {/* Find Your Perfect Color Section */}
      <section className="find-colors-section">
        <div className="find-colors-container">
          <div className="find-colors-content">
            <h2>Find Your Perfect Color — With Expert Help</h2>
            <p>We work exclusively with premium brands like Sherwin-Williams and Benjamin Moore to ensure long-lasting color and unmatched quality.</p>
            
            <div className="brand-buttons">
              <a href="https://www.sherwin-williams.com/visualizer" target="_blank" rel="noopener noreferrer" className="brand-button" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${swLogo})` }}>
                Sherwin-Williams
                <FaArrowRight className="arrow-icon" />
              </a>
              <a href="https://www.benjaminmoore.com/en-us/color-overview/find-your-color" target="_blank" rel="noopener noreferrer" className="brand-button" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bmLogo})` }}>
                Benjamin Moore
                <FaArrowRight className="arrow-icon" />
              </a>
            </div>

            <Link to="/free-quote" className="btn-estimate">
              Book Your Free Estimate
            </Link>
          </div>
          
          <div className="find-colors-image">
            <img src={findColors1} alt="Color consultation and design" />
          </div>
        </div>
      </section>

 
    </div>
  );
};

export default Home; 