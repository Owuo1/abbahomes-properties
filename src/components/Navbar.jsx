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
    { name: 'Properties', path: '/properties' },
    { name: 'Map', path: '/map' },
    { name: 'Contact', path: '/contact' }
  ]

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const toggleAdmin = () => {
    document.dispatchEvent(new CustomEvent('toggleAdmin'))
  }

  // Secret logo click handler
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
      <nav className="navbar">

        {/* LOGO + NAME */}
        <div
          className="logo-section"
          onClick={handleLogoClick}
        >
          <img
            src="https://i.ibb.co/r2fhGBwb/abba-logo-removebg-preview.png"
            alt="Abba Homes & Properties"
            className="logo-image"
          />

          <Link
            to="/"
            onClick={closeMenu}
            className="logo-text"
          >
            Abba Homes & Properties
          </Link>
        </div>

        {/* DESKTOP NAVIGATION */}
        <div className={`nav-links ${isOpen ? 'mobile-open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={closeMenu}
              className="nav-link"
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
            >
              <FaPlus />
              Add Listing
            </button>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <div
          className="hamburger"
          onClick={toggleMenu}
        >
          {isOpen
            ? <FaTimes size={28} color="#4A3520" />
            : <FaBars size={28} color="#4A3520" />
          }
        </div>
      </nav>

      <style>{`
        .navbar {
          background: #FFF5E1;
          padding: 12px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          box-sizing: border-box;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 15px rgba(74, 53, 32, 0.15);
        }

        /* LOGO AND NAME STAY ON ONE LINE */
        .logo-section {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          flex-shrink: 0;
        }

        .logo-image {
          height: 45px;
          width: auto;
          display: block;
          flex-shrink: 0;
        }

        .logo-text {
          color: #4A3520;
          font-size: clamp(1rem, 2vw, 1.45rem);
          font-weight: bold;
          text-decoration: none;
          white-space: nowrap;
        }

        /* NAVIGATION SECTIONS IN ONE HORIZONTAL LINE */
        .nav-links {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 28px;
          margin-left: auto;
        }

        .nav-link {
          color: #4A3520;
          text-decoration: none;
          font-weight: 500;
          white-space: nowrap;
          padding: 8px 0;
          position: relative;
          transition: color 0.2s ease;
        }

        /* Small underline effect */
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background: #e67e22;
          transition: width 0.2s ease;
        }

        .nav-link:hover {
          color: #e67e22;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-admin-btn {
          background: #e67e22;
          color: white;
          border: none;
          padding: 9px 16px;
          border-radius: 25px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          white-space: nowrap;
          animation: fadeIn 0.3s ease;
        }

        .nav-admin-btn:hover {
          background: #cf6d19;
        }

        .hamburger {
          display: none;
          cursor: pointer;
          flex-shrink: 0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* TABLET */
        @media (max-width: 1050px) {
          .navbar {
            padding: 12px 20px;
          }

          .nav-links {
            gap: 18px;
          }

          .logo-text {
            font-size: 1.1rem;
          }
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .navbar {
            padding: 12px 18px;
            flex-wrap: wrap;
          }

          .logo-section {
            gap: 9px;
            max-width: calc(100% - 50px);
          }

          .logo-image {
            height: 42px;
          }

          .logo-text {
            font-size: 1rem;
          }

          .hamburger {
            display: block;
          }

          .nav-links {
            display: none;
            flex-direction: column;
            align-items: stretch;
            justify-content: flex-start;
            width: 100%;
            gap: 0;
            margin-left: 0;
            margin-top: 12px;
            padding-top: 10px;
            border-top: 1px solid rgba(74, 53, 32, 0.15);
          }

          .nav-links.mobile-open {
            display: flex;
          }

          .nav-link {
            width: 100%;
            text-align: center;
            padding: 12px 0;
            border-bottom: 1px solid rgba(74, 53, 32, 0.08);
          }

          .nav-link::after {
            display: none;
          }

          .nav-admin-btn {
            margin-top: 12px;
            width: 100%;
          }
        }

        /* VERY SMALL PHONES */
        @media (max-width: 400px) {
          .logo-text {
            font-size: 0.9rem;
          }

          .logo-image {
            height: 38px;
          }
        }
      `}</style>
    </>
  )
}

export default Navbar
