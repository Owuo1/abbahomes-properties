import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer style={{
      background: '#0B1F3A',
      color: 'white',
      padding: '60px 20px 30px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '40px', 
          marginBottom: '40px' 
        }}>

          {/* Logo & Brand Section */}
          <div style={{ 
            textAlign: 'center',
            background: '#FFFFFF',
            color: '#0B1F3A',
            padding: '20px',
            borderRadius: '8px'
          }}>
            {/* Logo */}
            <img 
              src="https://i.ibb.co/r2fhGBwb/abba-logo-removebg-preview.png" 
              alt="Abba Homes & Properties" 
              style={{ 
                height: '60px', 
                width: 'auto', 
                marginBottom: '0.75rem' 
              }} 
            />
            
            {/* Brand Name */}
            <h4 style={{ 
              fontSize: '1.2rem', 
              marginBottom: '0.5rem', 
              color: '#e67e22' 
            }}>
              Abba Homes Properties
            </h4>
            
            {/* Tagline */}
            <p style={{ 
              opacity: 0.8, 
              lineHeight: 1.6, 
              maxWidth: '300px', 
              margin: '0 auto',
              color: '#0B1F3A'
            }}>
              Premier real estate agency in Homa Bay County, helping you find your dream home in Kenya's capital.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ 
              fontSize: '1.2rem', 
              marginBottom: '1rem', 
              color: '#e67e22' 
            }}>
              Quick Links
            </h4>

            <ul style={{ listStyle: 'none', padding: 0 }}>
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

          {/* Contact */}
          <div>
            <h4 style={{ 
              fontSize: '1.2rem', 
              marginBottom: '1rem', 
              color: '#e67e22' 
            }}>
              Contact
            </h4>

            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px', opacity: 0.8 }}>
                +254 100 658430
              </li>
              <li style={{ marginBottom: '10px', opacity: 0.8 }}>
                info@abbahomes-properties.com
              </li>
              <li style={{ marginBottom: '10px', opacity: 0.8 }}>
                Homa Bay, Kenya
              </li>
            </ul>
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
