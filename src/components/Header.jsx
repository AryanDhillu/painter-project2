import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPaintBrush, FaHome, FaBuilding, FaCheckCircle, 
  FaStar, FaQuoteLeft, FaImages, FaPalette, FaCogs, FaPhone, FaChevronDown, FaBars, FaTimes, FaSearch, FaEnvelope } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import './Header.css';
import logoPainter from '../../public/assets/logo_painter.png';


// Dropdown structure
const residentialDropdown = {
  exterior: {
    title: 'Exterior Services',
    mainLink: '/exterior-painting',
    services: [
      { path: '/exterior-painting', label: 'Exterior Painting' },
      { path: '/power-washing', label: 'Power Washing' },
      { path: '/stucco-repair', label: 'Stucco Repair and Painting' },
      { path: '/vinyl-aluminum', label: 'Vinyl and Aluminum Siding' },
      { path: '/deck-fence', label: 'Deck & Fence Services' },
    ]
  },
  interior: {
    title: 'Interior Services',
    mainLink: '/interior-painting',
    services: [
      { path: '/interior-painting', label: 'Interior Painting' },
      { path: '/cabinet-refinishing', label: 'Cabinet Refinishing/Repainting' },
      { path: '/wallpaper-removal', label: 'Wallpaper Removal' },
      { path: '/textured-walls', label: 'Textured Wall & Ceiling Painting' },
      { path: '/woodwork-trim', label: 'Woodwork and Trim Painting' },
    ]
  }
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [resDropdownOpen, setResDropdownOpen] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setResDropdownOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleResDropdown = () => setResDropdownOpen((open) => !open);
  

  
  const handleLogout = () => {
    dispatch(logout());
  };

  const navLinks = [
    { path: '#', label: 'Residential', dropdown: true },
    { path: '/commercial', label: 'Commercial' },
    { path: '/reviews', label: 'Reviews' },
    { path: '/about', label: 'About Us' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/faq', label: 'FAQ' },
  ];

  const adminNavLinks = [
    { path: '/manage-users', label: 'Manage Users' },
    { path: '/view-quotes', label: 'View Quotes' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-content">
          <a href="tel:1-262-993-3465" className="contact-link">
            <FaPhone /> 1-262-993-3465
          </a>
          <a href="mailto:the.painter.guys@live.com" className="contact-link">
            <FaEnvelope /> the.painter.guys@live.com
          </a>
          <Link to="/free-quote" className="btn btn-cta btn-small">
            Book Free Visit
          </Link>
          {isAuthenticated && (
            <div className="admin-user-info">
              <button onClick={handleLogout} className="btn btn-logout btn-small">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Header */}
      <header className={`header${isScrolled ? ' scrolled' : ''}${isAuthenticated ? ' header-authenticated' : ''}`}> 
        <div className="header-content">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <img src={logoPainter} alt="The Painter Guys Pros Logo" className="logo-img" />
            </div>
            <div className="logo-text">
              <h1>The Painter Guys Pros</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              {navLinks
                .filter(link =>
                  !isAuthenticated ||
                  (link.label !== 'Residential' && link.label !== 'Commercial' && link.label !== 'About Us')
                )
                .map((link) => (
                  <li key={link.path} className={link.dropdown ? 'has-dropdown' : ''}
                      onMouseEnter={() => link.dropdown && setResDropdownOpen(true)}
                      onMouseLeave={() => link.dropdown && setResDropdownOpen(false)}>
                  {link.dropdown ? (
                    <>
                      <span className={location.pathname.startsWith('/interior-painting') || location.pathname.startsWith('/exterior-painting') ? 'active dropdown-trigger' : 'dropdown-trigger'}>
                        {link.label}
                      </span>
                      <div className={`dropdown-menu${resDropdownOpen ? ' open' : ''}`}>
                        <div className="dropdown-content">
                          {/* Exterior Services Column */}
                          <div className="dropdown-column">
                            <div className="dropdown-header">
                              <FaPaintBrush className="dropdown-icon-small" />
                              <h4>{residentialDropdown.exterior.title}</h4>
                              <Link to={residentialDropdown.exterior.mainLink} className="dropdown-main-link">
                                View All Exterior Services
                              </Link>
                            </div>
                            <ul className="dropdown-services">
                              {residentialDropdown.exterior.services.map((item) => (
                                <li key={item.path}>
                                  <Link to={item.path}>{item.label}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Interior Services Column */}
                          <div className="dropdown-column">
                            <div className="dropdown-header">
                              <FaHome className="dropdown-icon-small" />
                              <h4>{residentialDropdown.interior.title}</h4>
                              <Link to={residentialDropdown.interior.mainLink} className="dropdown-main-link">
                                View All Interior Services
                              </Link>
                            </div>
                            <ul className="dropdown-services">
                              {residentialDropdown.interior.services.map((item) => (
                                <li key={item.path}>
                                  <Link to={item.path}>{item.label}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link to={link.path} className={location.pathname === link.path ? 'active' : ''}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
              {/* Admin Navigation Links */}
              {isAuthenticated && adminNavLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={location.pathname === link.path ? 'active' : ''}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Show search bar only when not authenticated as admin */}
            {/* COMMENTED OUT: Search for color inspiration functionality
            {!isAuthenticated && (
              <div className="search-container">
                <input 
                  type="text" 
                  placeholder="Search for color inspiration" 
                  className="search-input"
                />
                <button className="search-icon" aria-label="Search">
                  <FaSearch />
                </button>
              </div>
            )}
            */}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {navLinks
            .filter(link =>
              !isAuthenticated ||
              (link.label !== 'Residential' && link.label !== 'Commercial' && link.label !== 'About Us')
            )
            .map((link) => (
              <li key={link.path}>
                {link.dropdown ? (
                  <>
                    <button 
                      className="dropdown-toggle"
                      onClick={toggleResDropdown}
                    >
                      {link.label}
                      <FaChevronDown className={`dropdown-icon ${resDropdownOpen ? 'rotated' : ''}`} />
                    </button>
                    <div className={`dropdown-menu ${resDropdownOpen ? 'open' : ''}`}>
                      {/* Exterior Services Section */}
                      <div className="mobile-dropdown-section">
                        <div className="mobile-dropdown-header">
                          <FaPaintBrush className="dropdown-icon-small" />
                          <h5>{residentialDropdown.exterior.title}</h5>
                        </div>
                        <ul className="mobile-dropdown-services">
                          <li>
                            <Link to={residentialDropdown.exterior.mainLink}>
                              View All Exterior Services
                            </Link>
                          </li>
                          {residentialDropdown.exterior.services.map((item) => (
                            <li key={item.path}>
                              <Link to={item.path}>{item.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Interior Services Section */}
                      <div className="mobile-dropdown-section">
                        <div className="mobile-dropdown-header">
                          <FaHome className="dropdown-icon-small" />
                          <h5>{residentialDropdown.interior.title}</h5>
                        </div>
                        <ul className="mobile-dropdown-services">
                          <li>
                            <Link to={residentialDropdown.interior.mainLink}>
                              View All Interior Services
                            </Link>
                          </li>
                          {residentialDropdown.interior.services.map((item) => (
                            <li key={item.path}>
                              <Link to={item.path}>{item.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link.path} className={location.pathname === link.path ? 'active' : ''}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          {/* Admin Navigation Links for Mobile */}
          {isAuthenticated && adminNavLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className={location.pathname === link.path ? 'active' : ''}>
                {link.label}
              </Link>
            </li>
          ))}
          
          {/* Mobile CTA Button */}
          <li>
            <Link to="/free-quote" className="btn btn-cta">
              Book Free Visit
            </Link>
          </li>
        </ul>
      </nav>
      

    </>
  );
};

export default Header;