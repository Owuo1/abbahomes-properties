import React, { useState } from 'react'
import PropertyCard from '../components/PropertyCard'

const Properties = ({ properties = [] }) => {
  const [filterType, setFilterType] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  const filteredProperties = properties.filter(prop => {
    const matchesType = filterType === 'all' || prop.type === filterType
    const matchesCategory = filterCategory === 'all' || prop.category === filterCategory
    return matchesType && matchesCategory
  })

  return (
    <section style={{ padding: '80px 20px', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', color: '#1a1a2e' }}>
          Property <span style={{ color: '#e67e22' }}>Search</span>
        </h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
          Find available land, rental apartments, and houses in Homa Bay County
        </p>

        {/* Filters */}
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          justifyContent: 'center', 
          marginBottom: '40px', 
          flexWrap: 'wrap' 
        }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              style={{
                padding: '10px 25px',
                border: `2px solid ${filterType === 'all' ? '#e67e22' : '#e0e0e0'}`,
                borderRadius: '25px',
                background: filterType === 'all' ? '#e67e22' : 'transparent',
                color: filterType === 'all' ? 'white' : '#666',
                cursor: 'pointer',
                fontWeight: '500'
              }}
              onClick={() => setFilterType('all')}
            >
              All Types
            </button>
            <button
              style={{
                padding: '10px 25px',
                border: `2px solid ${filterType === 'sale' ? '#e67e22' : '#e0e0e0'}`,
                borderRadius: '25px',
                background: filterType === 'sale' ? '#e67e22' : 'transparent',
                color: filterType === 'sale' ? 'white' : '#666',
                cursor: 'pointer',
                fontWeight: '500'
              }}
              onClick={() => setFilterType('sale')}
            >
              For Sale
            </button>
            <button
              style={{
                padding: '10px 25px',
                border: `2px solid ${filterType === 'rent' ? '#e67e22' : '#e0e0e0'}`,
                borderRadius: '25px',
                background: filterType === 'rent' ? '#e67e22' : 'transparent',
                color: filterType === 'rent' ? 'white' : '#666',
                cursor: 'pointer',
                fontWeight: '500'
              }}
              onClick={() => setFilterType('rent')}
            >
              For Rent
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              style={{
                padding: '10px 25px',
                border: `2px solid ${filterCategory === 'all' ? '#e67e22' : '#e0e0e0'}`,
                borderRadius: '25px',
                background: filterCategory === 'all' ? '#e67e22' : 'transparent',
                color: filterCategory === 'all' ? 'white' : '#666',
                cursor: 'pointer',
                fontWeight: '500'
              }}
              onClick={() => setFilterCategory('all')}
            >
              All Categories
            </button>
            <button
              style={{
                padding: '10px 25px',
                border: `2px solid ${filterCategory === 'land' ? '#e67e22' : '#e0e0e0'}`,
                borderRadius: '25px',
                background: filterCategory === 'land' ? '#e67e22' : 'transparent',
                color: filterCategory === 'land' ? 'white' : '#666',
                cursor: 'pointer',
                fontWeight: '500'
              }}
              onClick={() => setFilterCategory('land')}
            >
              🌍 Land
            </button>
            <button
              style={{
                padding: '10px 25px',
                border: `2px solid ${filterCategory === 'apartment' ? '#e67e22' : '#e0e0e0'}`,
                borderRadius: '25px',
                background: filterCategory === 'apartment' ? '#e67e22' : 'transparent',
                color: filterCategory === 'apartment' ? 'white' : '#666',
                cursor: 'pointer',
                fontWeight: '500'
              }}
              onClick={() => setFilterCategory('apartment')}
            >
              🏢 Apartments
            </button>
            <button
              style={{
                padding: '10px 25px',
                border: `2px solid ${filterCategory === 'house' ? '#e67e22' : '#e0e0e0'}`,
                borderRadius: '25px',
                background: filterCategory === 'house' ? '#e67e22' : 'transparent',
                color: filterCategory === 'house' ? 'white' : '#666',
                cursor: 'pointer',
                fontWeight: '500'
              }}
              onClick={() => setFilterCategory('house')}
            >
              🏠 Houses
            </button>
          </div>
        </div>

        {/* Property Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '30px' 
        }}>
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#666', padding: '50px' }}>
              No properties found matching your criteria.
              <br />
              <span style={{ fontSize: '0.9rem' }}>Try adjusting your filters or add a new property.</span>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Properties
