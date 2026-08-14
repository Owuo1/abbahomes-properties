import React, { useState, useEffect } from 'react'

const Properties = () => {
  const [properties, setProperties] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const saved = localStorage.getItem('nairobiHomesProperties')
    if (saved) {
      setProperties(JSON.parse(saved))
    } else {
      const defaultProps = [
        {
          id: '1',
          title: 'Luxury Villa in Karen',
          price: 'KES 45,000,000',
          location: 'Karen, Nairobi',
          bedrooms: 5,
          bathrooms: 4,
          image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600',
          description: 'Stunning modern villa with panoramic views',
          type: 'sale'
        },
        {
          id: '2',
          title: 'Modern Apartment in Westlands',
          price: 'KES 120,000/month',
          location: 'Westlands, Nairobi',
          bedrooms: 3,
          bathrooms: 2,
          image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
          description: 'Contemporary apartment in prime location',
          type: 'rent'
        },
        {
          id: '3',
          title: 'Commercial Space in CBD',
          price: 'KES 250,000/month',
          location: 'CBD, Nairobi',
          bedrooms: 0,
          bathrooms: 2,
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
          description: 'Prime office space in the heart of Nairobi',
          type: 'commercial'
        }
      ]
      setProperties(defaultProps)
      localStorage.setItem('nairobiHomesProperties', JSON.stringify(defaultProps))
    }
  }, [])

  const filteredProperties = filter === 'all' 
    ? properties 
    : properties.filter(p => p.type === filter)

  const getBadgeClass = (type) => {
    const colors = {
      sale: { background: '#e67e22', text: 'white' },
      rent: { background: '#2ecc71', text: 'white' },
      commercial: { background: '#3498db', text: 'white' }
    }
    return colors[type] || { background: '#666', text: 'white' }
  }

  return (
    <section style={{ padding: '80px 20px', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', color: '#1a1a2e' }}>
          Property <span style={{ color: '#e67e22' }}>Search</span>
        </h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
          Find the perfect property in Nairobi
        </p>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
          {['all', 'sale', 'rent', 'commercial'].map((type) => (
            <button
              key={type}
              style={{
                padding: '10px 25px',
                border: `2px solid ${filter === type ? '#e67e22' : '#e0e0e0'}`,
                borderRadius: '25px',
                background: filter === type ? '#e67e22' : 'transparent',
                color: filter === type ? 'white' : '#666',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setFilter(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Property Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '30px' 
        }}>
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <div key={property.id} style={{
                background: 'white',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                border: '1px solid #eee'
              }}>
                <img 
                  src={property.image} 
                  alt={property.title} 
                  style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                />
                <div style={{ padding: '15px' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    background: getBadgeClass(property.type).background,
                    color: 'white',
                    marginBottom: '10px'
                  }}>
                    {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                  </span>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1a1a2e' }}>
                    {property.title}
                  </h3>
                  <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    📍 {property.location}
                  </p>
                  <p style={{ fontSize: '1.3rem', fontWeight: '700', color: '#e67e22', marginBottom: '0.5rem' }}>
                    {property.price}
                  </p>
                  <div style={{ display: 'flex', gap: '20px', color: '#666', fontSize: '0.9rem' }}>
                    <span>🛏️ {property.bedrooms || 0} Beds</span>
                    <span>🛁 {property.bathrooms || 0} Baths</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#666' }}>
              No properties found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Properties
