import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer style={{
      background: '#0B1F3A',
      color: 'white',
      padding: '60px 20px 30px'
    }}>
      <style>
        {`
          .footer-grid {
            grid-template-columns: 1fr;
          }

          /* Mobile & Tablet: Center all content uniformly */
          @media (max-width: 767px) {
            .footer-grid {
              justify-items: center;
              text-align: center;
            }
            
            .footer-grid > div {
              text-align: center !important;
              max-width: 100% !important;
            }
            
            .logo-wrapper {
              justify-content: center !important;
            }
            
            .logo-name {
              text-align: center !important;
            }
            
            .footer-text {
              text-align: center !important;
            }
            
            .contact-list li {
              justify-content: center !important;
            }
            
            .social-wrapper {
              display: flex !important;
              justify-content: center !important;
            }

            .quick-links-title {
              text-align: center !important;
            }

            .quick-links-list {
              text-align: center !important;
            }

            .quick-links-list li {
              text-align: center !important;
            }

            .contact-title {
              text-align: center !important;
            }

            /* Make all columns same width */
            .footer-column {
              width: 100% !important;
              max-width: 400px !important;
              justify-self: center !important;
            }
          }

          @media (min-width: 768px) {
            .footer-grid {
              grid-template-columns: 1.5fr 1fr 1fr;
              gap: 60px;
            }
          }
        `}
      </style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div 
          className="footer-grid"
          style={{ 
            display: 'grid', 
            gap: '40px', 
            marginBottom: '40px' 
          }}
        >

          {/* Logo & Brand Section */}
          <div 
            className="footer-column"
            style={{ 
              background: '#FFFFFF',
              color: '#0B1F3A',
              padding: '20px',
              borderRadius: '8px',
              width: '100%',
              maxWidth: '400px',
              justifySelf: 'center'
            }}
          >
            {/* Logo & Name - Side by Side */}
            <div 
              className="logo-wrapper"
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '12px'
              }}
            >
              <img 
                src="https://i.ibb.co/r2fhGBwb/abba-logo-removebg-preview.png" 
                alt="Abba Homes & Properties" 
                style={{ 
                  height: '55px', 
                  width: 'auto', 
                  flexShrink: 0
                }} 
              />
              
              <h4 
                className="logo-name"
                style={{ 
                  fontSize: '1.2rem', 
                  margin: 0, 
                  color: '#e67e22',
                  textAlign: 'left'
                }}
              >
                Abba Homes & Properties
              </h4>
            </div>
            
            {/* Content Below */}
            <p 
              className="footer-text"
              style={{ 
                opacity: 0.8, 
                lineHeight: 1.6, 
                color: '#0B1F3A',
                fontSize: '0.95rem',
                margin: 0,
                textAlign: 'left'
              }}
            >
              Premier real estate agency in Homa Bay County, helping you find your dream home in Kenya's capital.
            </p>
          </div>

          {/* Quick Links */}
          <div 
            className="footer-column"
            style={{ 
              width: '100%',
              maxWidth: '400px',
              justifySelf: 'center',
              textAlign: 'left'
            }}
          >
            <h4 
              className="quick-links-title"
              style={{ 
                fontSize: '1.2rem', 
                marginBottom: '1rem', 
                color: '#e67e22',
                textAlign: 'inherit'
              }}
            >
              Quick Links
            </h4>

            <ul 
              className="quick-links-list"
              style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0,
                textAlign: 'inherit'
              }}
            >
              <li style={{ marginBottom: '10px' }}>
                <Link to="/" style={{ 
                  color: 'rgba(255, 255, 255, 1)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>
                  Home
                </Link>
              </li>

              <li style={{ marginBottom: '10px' }}>
                <Link to="/about" style={{ 
                  color: 'rgba(255, 255, 255, 1)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>
                  About Us
                </Link>
              </li>

              <li style={{ marginBottom: '10px' }}>
                <Link to="/services" style={{ 
                  color: 'rgba(255, 255, 255, 1)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>
                  Services
                </Link>
              </li>

              <li style={{ marginBottom: '10px' }}>
                <Link to="/properties" style={{ 
                  color: 'rgba(255, 255, 255, 1)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>
                  Properties
                </Link>
              </li>

              <li style={{ marginBottom: '10px' }}>
                <Link to="/contact" style={{ 
                  color: 'rgba(255, 255, 255, 1)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div 
            className="footer-column"
            style={{ 
              width: '100%',
              maxWidth: '400px',
              justifySelf: 'center',
              textAlign: 'left'
            }}
          >
            <h4 
              className="contact-title"
              style={{ 
                fontSize: '1.2rem', 
                marginBottom: '1rem', 
                color: '#e67e22',
                textAlign: 'inherit'
              }}
            >
              Contact
            </h4>

            <ul 
              className="contact-list"
              style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0,
                textAlign: 'inherit'
              }}
            >
              <li style={{ 
                marginBottom: '10px', 
                opacity: 0.8,
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <FaPhone size={14} /> +254 100 658430
              </li>
              <li style={{ 
                marginBottom: '10px', 
                opacity: 0.8,
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <FaEnvelope size={14} /> info@abbahomes-properties.com
              </li>
              <li style={{ 
                marginBottom: '10px', 
                opacity: 0.8,
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <FaMapMarkerAlt size={14} /> Homa Bay, Kenya
              </li>
            </ul>

            {/* Facebook Icon Link */}
            <div 
              className="social-wrapper"
              style={{ marginTop: '20px' }}
            >
              <a 
                href="https://facebook.com/abbahomesproperties" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '45px',
                  height: '45px',
                  color: '#FFFFFF',
                  backgroundColor: '#1877F2',
                  borderRadius: '50%',
                  transition: 'background-color 0.3s ease, transform 0.3s ease',
                  fontSize: '1.5rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#145dbf'
                  e.target.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#1877F2'
                  e.target.style.transform = 'scale(1)'
                }}
                aria-label="Follow us on Facebook"
              >
                <FaFacebook />
              </a>
            </div>
          </div>

        </div>
        
        {/* Copyright */}
        <div style={{ 
          textAlign: 'center', 
          paddingTop: '30px', 
          borderTop: '1px solid rgba(255,255,255,0.1)',
          color: '#FFFFFF',
          fontSize: '0.9rem'
        }}>
          &copy; {new Date().getFullYear()} Abba Homes Properties Ltd. All Rights Reserved.
        </div>

      </div>
    </footer>
  )
}

export default Footer
