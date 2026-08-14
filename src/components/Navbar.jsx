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

  return (
    <nav style={{
      background: '#FFF5E1',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 15px rgba(74, 53, 32, 0.15)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
        }}>
          Abba<span style={{ color: '#e67e22' }}>Homes</span>
        </Link>
      </div>
      
      <div style={{ 
        display: 'flex', 
        gap: '30px', 
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        {navLinks.map((link) => (
          <Link 
            key={link.name}
            to={link.path}
            style={{ 
              color: '#4A3520', 
              textDecoration: 'none', 
              fontWeight: '500',
              transition: 'color 0.3s'
            }}
          >
            {link.name}
          </Link>
        ))}
        <button style={{
          background: '#e67e22',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '25px',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          ➕ Add Listing
        </button>
      </div>
    </nav>
  )
}

export default Navbar
