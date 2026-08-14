import React from 'react'

const Map = () => {
  return (
    <section style={{ padding: '80px 20px', background: '#f8f9fa', minHeight: '60vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', color: '#1a1a2e' }}>
          Search by <span style={{ color: '#e67e22' }}>Map</span>
        </h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
          Visualize properties across Nairobi's neighborhoods
        </p>
        
        <div style={{ 
          background: '#e0e0e0', 
          height: '500px', 
          borderRadius: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: '#666'
        }}>
          <p style={{ fontSize: '1.5rem' }}>📍 Interactive Map Coming Soon</p>
          <p style={{ fontSize: '1rem', marginTop: '10px' }}>
            View properties on an interactive map of Nairobi
          </p>
          <p style={{ fontSize: '0.9rem', marginTop: '20px', opacity: 0.6 }}>
            We're working on bringing you the best map experience
          </p>
        </div>
      </div>
    </section>
  )
}

export default Map
