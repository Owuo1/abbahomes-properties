import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes, FaPlus } from 'react-icons/fa'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [showAdminButton, setShowAdminButton] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Search Properties', path: '/properties' },
    { name: 'Contact Us', path: '/contact' }
  ]

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const toggleAdmin = () => {
    document.dispatchEvent(new CustomEvent('toggleAdmin'))
  }

  const handleLogoClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)

    if (newCount >= 5) {
      setShowAdminButton(true)
      setClickCount(0)
      alert('🔑 Admin mode activated! Click "Add Listing" to manage properties.')
    }

    clearTimeout(window.logoTimer)
    window.logoTimer = setTimeout(() => setClickCount(0), 3000)
  }

  return (
    <>
      <nav style={{
        background: '#FFF5E1',
        padding: '15px 30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 15px rgba(74, 53, 32, 0.15)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          <div
            className="logo-section"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer'
            }}
            onClick={handleLogoClick}
          >
            <img
              src="https://i.ibb.co/r2fhGBwb/abba-logo-removebg-preview.png"
              alt="Abba Homes & Properties"
              style={{ height: '45px', width: 'auto', flexShrink: 0 }}
            />
            <Link
              to="/"
              onClick={closeMenu}
              className="logo-text"
              style={{
                color: '#4A3520',
                fontSize: 'clamp(1rem, 2.5vw + 0.4rem, 1.5rem)',
                fontWeight: 'bold',
                textDecoration: 'none',
                whiteSpace: 'nowrap'
              }}
            >
              Abba Homes & Properties
            </Link>
          </div>

          <div
            className="hamburger"
            onClick={toggleMenu}
            style={{
              display: 'block',
              cursor: 'pointer'
            }}
          >
            {isOpen ? <FaTimes size={28} color="#4A3520" /> : <FaBars size={28} color="#4A3520" />}
          </div>
        </div>

        <div style={{
          display: isOpen ? 'flex' : 'none',
          flexDirection: 'column',
          width: '100%',
          gap: '25px',
          paddingTop: '20px',
          borderTop: '2px solid rgba(74, 53, 32, 0.1)',
          marginTop: '15px'
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
          
          {showAdminButton && (
            <button
              className="nav-admin-btn"
              onClick={() => {
                toggleAdmin()
                closeMenu()
              }}
              style={{
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
                width: '100%',
                animation: 'fadeIn 0.3s ease'
              }}
            >
              <FaPlus /> Add Listing
            </button>
          )}
        </div>
      </nav>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (min-width: 769px) {
          .hamburger {
            display: none !important;
          }
          
          nav {
            flex-direction: row !important;
            justify-content: space-between !important;
            flex-wrap: nowrap !important;
          }
          
          .logo-section {
            flex: 0 0 auto !important;
          }
          
          .nav-links {
            display: flex !important;
            flex-direction: row !important;
            width: auto !important;
            gap: 30px !important;
            padding-top: 0 !important;
            border-top: none !important;
            margin-top: 0 !important;
            flex: 1 1 auto !important;
            justify-content: flex-end !important;
            flex-wrap: nowrap !important;
          }
          
          .nav-links a {
            border-bottom: none !important;
            padding: 0 !important;
            width: auto !important;
            text-align: left !important;
            white-space: nowrap !important;
          }
          
          .nav-links button {
            width: auto !important;
            white-space: nowrap !important;
          }
        }
      `}</style>
    </>
  )
}

export default Navbar
