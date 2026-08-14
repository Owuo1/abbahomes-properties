import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Properties', path: '/properties' },
    { name: 'Map', path: '/map' },
    { name: 'Contact', path: '/contact' }
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <>
      <nav style={{
        background: '#FFF5E1',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 15px rgba(74, 53, 32, 0.15)',
        flexWrap: 'wrap'
      }}>
        {/* Logo Section - LEFT SIDE */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          flex: '1 1 auto'  // ← FIX 1
        }}>
          <img 
            src="https://i.ibb.co/r2fhGBwb/abba-logo-removebg-preview.png" 
            alt="Abba Homes Properties" 
            style={{ height: '45px', width: 'auto' }}
          />
          <Link to="/" style={{ 
            color: '#4A3520', 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            textDecoration: 'none'
          }} onClick={closeMenu}>
            Abba Homes Properties
          </Link>
        </div>

        {/* Hamburger Icon - RIGHT SIDE */}
        <div 
          style={{ 
            display: 'block',
            cursor: 'pointer',
            flex: '0 0 auto'  // ← FIX 2
          }}
          className="hamburger" 
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes size={28} color="#4A3520" /> : <FaBars size={28} color="#4A3520" />}
        </div>

        {/* Navigation Links - HIDDEN UNTIL CLICKED */}
        <div style={{ 
          display: isOpen ? 'flex' : 'none',
          flexDirection: 'column',
          width: '100%',
          gap: '15px',
          paddingTop: '20px',
          borderTop: '2px solid rgba(74, 53, 32, 0.1)',
          marginTop: '15px',
          flex: '0 0 100%'  // ← FIX 3
        }} className="nav-links">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path}
              style={{ 
                color: '#4A3520', 
                textDecoration: 'none', 
                fontWeight: '500',
                padding: '10px 0',
                borderBottom: '1px solid rgba(74, 53, 32, 0.05)',
                textAlign: 'center',
                width: '100%'
              }}
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
          <button style={{
            background: '#e67e22',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '25px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%'
          }} onClick={closeMenu}>
            ➕ Add Listing
          </button>
        </div>
      </nav>

      <style>{`
        @media (min-width: 769px) {
          .hamburger {
            display: none !important;
          }
          nav {
            flex-wrap: nowrap !important;  /* ← FIX 4 */
          }
          .nav-links {
            display: flex !important;
            flex-direction: row !important;
            width: auto !important;
            gap: 30px !important;
            padding-top: 0 !important;
            border-top: none !important;
            margin-top: 0 !important;
            flex: 0 0 auto !important;  /* ← FIX 5 */
          }
          .nav-links a {
            border-bottom: none !important;
            padding: 0 !important;
            width: auto !important;
            text-align: left !important;
          }
          .nav-links button {
            width: auto !important;
          }
        }
      `}</style>
    </>
  )
}

export default Navbar
