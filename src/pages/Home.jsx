import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'

const Home = () => {
  const [properties, setProperties] = useState([])
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Load properties from localStorage
  useEffect(() => {
    const loadProperties = () => {
      const saved = localStorage.getItem('abbahomes_properties')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setProperties(parsed)
          // Get first 6 properties for featured section
          setFeaturedProperties(parsed.slice(0, 6))
        } catch (e) {
          setProperties([])
          setFeaturedProperties([])
        }
      } else {
        // If no properties exist, use default data
        const defaultProperties = [
          {
            id: '1',
            title: 'Luxury Villa in Karen',
            price: 'KES 45,000,000',
            location: 'Karen, Nairobi',
            bedrooms: 5,
            bathrooms: 4,
            image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600',
            description: 'Stunning modern villa with panoramic views',
            type: 'sale',
            category: 'house',
            status: 'available',
            dateAdded: new Date().toISOString()
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
            type: 'rent',
            category: 'apartment',
            status: 'available',
            dateAdded: new Date().toISOString()
          },
          {
            id: '3',
            title: 'Prime Land in Runda',
            price: 'KES 25,000,000',
            location: 'Runda, Nairobi',
            bedrooms: 0,
            bathrooms: 0,
            image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600',
            description: 'Prime residential land in prestigious Runda estate',
            type: 'sale',
            category: 'land',
            status: 'available',
            dateAdded: new Date().toISOString()
          },
          {
            id: '4',
            title: 'Commercial Space in CBD',
            price: 'KES 250,000/month',
            location: 'CBD, Nairobi',
            bedrooms: 0,
            bathrooms: 2,
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
            description: 'Prime office space in the heart of Nairobi',
            type: 'commercial',
            category: 'commercial',
            status: 'available',
            dateAdded: new Date().toISOString()
          },
          {
            id: '5',
            title: 'Spacious House in Langata',
            price: 'KES 85,000/month',
            location: 'Langata, Nairobi',
            bedrooms: 4,
            bathrooms: 3,
            image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600',
            description: 'Spacious family home with garden in quiet neighborhood',
            type: 'rent',
            category: 'house',
            status: 'available',
            dateAdded: new Date().toISOString()
          }
        ]
        setProperties(defaultProperties)
        setFeaturedProperties(defaultProperties.slice(0, 6))
        localStorage.setItem('abbahomes_properties', JSON.stringify(defaultProperties))
      }
      setIsLoading(false)
    }

    loadProperties()

    // Listen for storage changes (when admin adds/removes properties)
    const handleStorageChange = () => {
      const saved = localStorage.getItem('abbahomes_properties')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setProperties(parsed)
          setFeaturedProperties(parsed.slice(0, 6))
        } catch (e) {
          // Ignore
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Separate properties by category
  const landProperties = properties.filter(p => p.category === 'land').slice(0, 4)
  const apartmentProperties = properties.filter(p => p.category === 'apartment').slice(0, 4)
  const houseProperties = properties.filter(p => p.category === 'house').slice(0, 4)

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
            Discover premium properties across Homa Bay County. From luxury villas, modern apartments and land,
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
            Welcome to <span style={{ color: '#e67e22' }}>Abba Homes Properties</span>
          </h2>
          <p style={{ color: '#666', maxWidth: '700px', margin: '1rem auto 2rem', lineHeight: 1.8 }}>
            We are a premier real estate agency dedicated to helping you find the perfect property
            in Homa Bay County. With years of experience and a commitment to excellence, we make your
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

      {/* AUTOMATED SECTION: Available Land */}
      {landProperties.length > 0 && (
        <section style={{ padding: '60px 20px', background: '#f8f9fa' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ fontSize: '2rem', color: '#1a1a2e', margin: 0 }}>
                  🌍 Available <span style={{ color: '#e67e22' }}>Land</span>
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
                  🏢 Available <span style={{ color: '#e67e22' }}>Apartments</span>
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
                  🏠 Available <span style={{ color: '#e67e22' }}>Houses</span>
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
      {isLoading ? (
        <section style={{ padding: '60px 20px', background: 'white', textAlign: 'center' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{ color: '#666' }}>Loading properties...</p>
          </div>
        </section>
      ) : properties.length === 0 && (
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
