import React from 'react'
import { FaBed, FaBath, FaMapMarkerAlt } from 'react-icons/fa'

const PropertyCard = ({ property }) => {
  const getBadgeStyle = (type) => {
    const styles = {
      sale: { background: '#e67e22', color: 'white' },
      rent: { background: '#2ecc71', color: 'white' },
      commercial: { background: '#3498db', color: 'white' }
    }
    return styles[type] || styles.sale
  }

  const getCategoryEmoji = (category) => {
    const emojis = {
      land: '🌍',
      apartment: '🏢',
      house: '🏠',
      commercial: '🏢'
    }
    return emojis[category] || '🏠'
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
      {/* ✅ Display uploaded image (Base64) or fallback */}
      <img 
        src={property.image || 'https://via.placeholder.com/600x400/eee/999?text=No+Image'} 
        alt={property.title} 
        style={{ width: '100%', height: '220px', objectFit: 'cover' }}
        onError={(e) => {
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
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </span>
          <span style={{
            fontSize: '0.8rem',
            color: '#888'
          }}>
            {getCategoryEmoji(property.category)} {property.category.charAt(0).toUpperCase() + property.category.slice(1)}
          </span>
        </div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1a1a2e' }}>
          {property.title}
        </h3>
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          <FaMapMarkerAlt style={{ marginRight: '5px' }} />
          {property.location}
        </p>
        <p style={{ fontSize: '1.3rem', fontWeight: '700', color: '#e67e22', marginBottom: '0.5rem' }}>
          {property.price}
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
