import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        color: 'white',
        padding: '120px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
            Find Your <span style={{ color: '#e67e22' }}>Dream Home and Land</span> in Homa Bay County
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '2rem' }}>
            Discover premium properties across Homa Bay County. From luxury villas, modern apartments to land,
            we have the perfect home for you.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/properties">
              <button style={{
                background: '#e67e22',
                color: 'white',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '30px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Browse Properties
              </button>
            </Link>
            <Link to="/contact">
              <button style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid #e67e22',
                padding: '12px 30px',
                borderRadius: '30px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#1a1a2e' }}>
            Welcome to <span style={{ color: '#e67e22' }}>Abba Homes</span>
          </h2>
          <p style={{ color: '#666', maxWidth: '700px', margin: '1rem auto 2rem', lineHeight: 1.8 }}>
            We are a premier real estate agency dedicated to helping you find the perfect property
            in Nairobi. With years of experience and a commitment to excellence, we make your
            property journey seamless and rewarding.
          </p>
          <Link to="/about">
            <button style={{
              background: '#e67e22',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '30px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Learn More About Us
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
