import React from 'react'
import { Link } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'

// ✅ FIXED: Home now receives featuredProperties as a prop
const Home = ({ featuredProperties = [] }) => {
  // ✅ Use the prop directly, no localStorage or state
  const properties = featuredProperties || []
  
  // ✅ FIXED: Case-insensitive category filtering
  const landProperties = properties.filter(p => p?.category?.toLowerCase() === 'land').slice(0, 4)
  const apartmentProperties = properties.filter(p => p?.category?.toLowerCase() === 'apartment').slice(0, 4)
  const houseProperties = properties.filter(p => p?.category?.toLowerCase() === 'house').slice(0, 4)
  
  // Check if any properties exist
  const hasProperties = properties.length > 0

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
            Find Your <span style={{ color: '#e67e22' }}>Dream Properties</span> in Homa Bay County
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '2rem' }}>
            Discover premium properties across Homa Bay County. From modern apartments, rentals, and land,
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

      {/* Welcome Section */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#1a1a2e' }}>
            Welcome to <span style={{ color: '#e67e22' }}>Abba Homes & Properties</span>
          </h2>
          <p style={{ color: '#666', maxWidth: '700px', margin: '1rem auto 2rem', lineHeight: 1.8 }}>
            We are a premier real estate agency dedicated to helping you find the perfect property
            in Homa Bay County. With years of experience and a commitment to excellence, we make your
            property journey seamless and rewarding. At Abba Homes & Properties, we pride ourselves on transparent communication, personalized service, and a commitment to protecting your investment while maximizing your returns. Let us handle the day-to-day so you can enjoy peace of mind and long-term success.
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

      {/* AUTOMATED SECTION: Available Land */}
      {landProperties.length > 0 && (
        <section style={{ padding: '60px 20px', background: '#f8f9fa' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ fontSize: '2rem', color: '#1a1a2e', margin: 0 }}>
                  Available <span style={{ color: '#e67e22' }}>Land</span>
                </h2>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>
                  Prime plots and land parcels for sale across Homa Bay County
                </p>
              </div>
              <Link to="/properties">
                <button style={{
                  background: 'transparent',
                  color: '#e67e22',
                  border: '2px solid #e67e22',
                  padding: '8px 20px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}>
                  View All →
                </button>
              </Link>
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '30px' 
            }}>
              {landProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* AUTOMATED SECTION: Available Apartments */}
      {apartmentProperties.length > 0 && (
        <section style={{ padding: '60px 20px', background: 'white' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ fontSize: '2rem', color: '#1a1a2e', margin: 0 }}>
                  Available <span style={{ color: '#e67e22' }}>Apartments</span>
                </h2>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>
                  Modern apartments in prime locations across Homa Bay County
                </p>
              </div>
              <Link to="/properties">
                <button style={{
                  background: 'transparent',
                  color: '#e67e22',
                  border: '2px solid #e67e22',
                  padding: '8px 20px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}>
                  View All →
                </button>
              </Link>
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '30px' 
            }}>
              {apartmentProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* AUTOMATED SECTION: Available Houses */}
      {houseProperties.length > 0 && (
        <section style={{ padding: '60px 20px', background: '#f8f9fa' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ fontSize: '2rem', color: '#1a1a2e', margin: 0 }}>
                  Available <span style={{ color: '#e67e22' }}>Houses</span>
                </h2>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>
                  Spacious family homes in desirable neighborhoods
                </p>
              </div>
              <Link to="/properties">
                <button style={{
                  background: 'transparent',
                  color: '#e67e22',
                  border: '2px solid #e67e22',
                  padding: '8px 20px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}>
                  View All →
                </button>
              </Link>
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '30px' 
            }}>
              {houseProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State - If no properties exist */}
      {!hasProperties && (
        <section style={{ padding: '60px 20px', background: 'white', textAlign: 'center' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h3 style={{ color: '#1a1a2e' }}>No Properties Available Yet</h3>
            <p style={{ color: '#666', marginTop: '1rem' }}>
              Check back soon for available land, apartments, and houses in Homa Bay County.
            </p>
            <p style={{ color: '#999', fontSize: '0.9rem', marginTop: '1rem' }}>
              Admin: Click "Add Listing" to start adding properties.
            </p>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home
