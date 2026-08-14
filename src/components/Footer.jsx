import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer style={{
      background: '#1a1a2e',
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
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#e67e22' }}>
              🏠 Abba Homes
            </h4>
            <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
              Premier real estate agency in Nairobi, helping you find your dream home in Kenya's capital.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#e67e22' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
                  Home
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
                  About Us
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/services" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
                  Services
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/properties" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
                  Properties
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#e67e22' }}>
              Contact
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px', opacity: 0.8 }}>📞 +254 700 123 456</li>
              <li style={{ marginBottom: '10px', opacity: 0.8 }}>✉️ info@abbahomes.com</li>
              <li style={{ marginBottom: '10px', opacity: 0.8 }}>📍 Westlands, Nairobi</li>
            </ul>
          </div>
        </div>
        <div style={{ 
          textAlign: 'center', 
          paddingTop: '30px', 
          borderTop: '1px solid rgba(255,255,255,0.1)',
          opacity: 0.7,
          fontSize: '0.9rem'
        }}>
          &copy; {new Date().getFullYear()} Abba Homes Properties Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
