import React from 'react'
import { FaBed, FaBath, FaMapMarkerAlt } from 'react-icons/fa'

const PropertyCard = ({ property }) => {
  // ✅ Debug log to see what's being rendered
  console.log('🃏 PropertyCard rendering:', property?.title)

  const getCategoryEmoji = (category) => {
    const emojis = {
      land: '🌍',
      apartment: '🏢',
      house: '🏠',
      commercial: '🏢',
      sale: { background: '#e67e22', color: 'white' },
    }
    return emojis[category] || '🏠'
  }

  // ✅ Validate property exists
  if (!property) {
    console.warn('⚠️ PropertyCard received no property')
    return null
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
      border: '1px solid #eee',
      transition: 'transform 0.3s ease'
    }}>
      <img 
        src={property.image || 'https://via.placeholder.com/600x400/eee/999?text=No+Image'} 
        alt={property.title || 'Property'} 
        style={{ width: '100%', height: '220px', objectFit: 'cover' }}
        onError={(e) => {
          console.warn('⚠️ Image failed to load:', property.image)
          e.target.src = 'https://via.placeholder.com/600x400/eee/999?text=No+Image'
        }}
      />
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '600',
            background: getBadgeStyle(property.type).background,
            color: getBadgeStyle(property.type).color
          }}>
            {property.type?.charAt(0).toUpperCase() + property.type?.slice(1) || 'Unknown'}
          </span>
          <span style={{
            fontSize: '0.8rem',
            color: '#888'
          }}>
            {getCategoryEmoji(property.category)} {property.category?.charAt(0).toUpperCase() + property.category?.slice(1) || 'Unknown'}
          </span>
        </div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1a1a2e' }}>
          {property.title || 'Untitled Property'}
        </h3>
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          <FaMapMarkerAlt style={{ marginRight: '5px' }} />
          {property.location || 'Location not specified'}
        </p>
        <p style={{ fontSize: '1.3rem', fontWeight: '700', color: '#e67e22', marginBottom: '0.5rem' }}>
          {property.price || 'Price not specified'}
        </p>
        <div style={{ display: 'flex', gap: '20px', color: '#666', fontSize: '0.9rem' }}>
          <span><FaBed /> {property.bedrooms || 0} Beds</span>
          <span><FaBath /> {property.bathrooms || 0} Baths</span>
        </div>
        {property.description && (
          <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '10px', lineHeight: 1.4 }}>
            {property.description.length > 80 ? property.description.slice(0, 80) + '...' : property.description}
          </p>
        )}
      </div>
    </div>
  )
}

export default PropertyCard
