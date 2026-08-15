import React from 'react'

const About = () => {
  return (
    <section style={{ padding: '80px 20px', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', color: '#1a1a2e' }}>
          About <span style={{ color: '#e67e22' }}>Abba Homes & Properties</span>
        </h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
          Your Trusted Partner in Land, Rentals & Property Management
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <img 
              src="https://i.ibb.co/bg0BkwCT/st.jpg"
              alt="Nairobi Properties"
              style={{ width: '100%', borderRadius: '15px' }}
            />
          </div>
          <div>
            <h3 style={{ fontSize: '2rem', color: '#1a1a2e', marginBottom: '1rem' }}>
              Your Trusted <span style={{ color: '#e67e22' }}>Real Estate Partner</span>
            </h3>
            <p style={{ color: '#666', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Abba Homes & Properties Ltd is a premier real estate agency dedicated to 
              connecting you with the best <strong>available land, rental apartments, 
              and houses</strong> in Homa Bay County. Whether you're looking to invest in prime 
              land, find your dream rental home, or need professional 
              <strong> apartment management services</strong>, we've got you covered.
            </p>
            <p style={{ color: '#666', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              With years of experience in Kenya's dynamic property market, we 
              understand the unique needs of both property owners and tenants. 
              Our commitment to excellence ensures that your property journey — 
              from finding the perfect rental to managing your investment — is 
              seamless, transparent, and rewarding.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e67e22' }}>50+</div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>Properties Managed</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e67e22' }}>98%</div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>Client Satisfaction</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e67e22' }}>15+</div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>Years Experience</div>
              </div>
            </div>
          </div>
        </div>

        {/* What We Offer Section */}
        <div style={{ marginTop: '80px' }}>
          <h3 style={{ fontSize: '2rem', textAlign: 'center', color: '#1a1a2e', marginBottom: '1rem' }}>
            What <span style={{ color: '#e67e22' }}>We Offer</span>
          </h3>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
            Comprehensive real estate solutions tailored to your needs
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '30px' 
          }}>
            {/* Available Land */}
            <div style={{
              background: '#f8f9fa',
              padding: '30px',
              borderRadius: '15px',
              textAlign: 'center',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
              <h4 style={{ fontSize: '1.3rem', color: '#1a1a2e', marginBottom: '0.5rem' }}>
                Available Land
              </h4>
              <p style={{ color: '#666', lineHeight: 1.6 }}>
                Prime plots and land parcels for sale across Homa Bay County. Whether for 
                residential or commercial development, we have the perfect location 
                for your investment.
              </p>
            </div>

            {/* Rental Apartments & Houses */}
            <div style={{
              background: '#f8f9fa',
              padding: '30px',
              borderRadius: '15px',
              textAlign: 'center',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏠</div>
              <h4 style={{ fontSize: '1.3rem', color: '#1a1a2e', marginBottom: '0.5rem' }}>
                Rental Apartments & Houses
              </h4>
              <p style={{ color: '#666', lineHeight: 1.6 }}>
                Quality rental properties for every budget. From cozy apartments 
                to spacious family homes, find your perfect rental in Homa Bay County's 
                best neighborhoods.
              </p>
            </div>

            {/* Apartment Management */}
            <div style={{
              background: '#f8f9fa',
              padding: '30px',
              borderRadius: '15px',
              textAlign: 'center',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔑</div>
              <h4 style={{ fontSize: '1.3rem', color: '#1a1a2e', marginBottom: '0.5rem' }}>
                Apartment Management
              </h4>
              <p style={{ color: '#666', lineHeight: 1.6 }}>
                Professional property management services for landlords. We handle 
                tenant screening, rent collection, maintenance, and more — so you 
                can enjoy passive income without the stress.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div style={{ marginTop: '80px', background: '#f8f9fa', padding: '60px 40px', borderRadius: '15px' }}>
          <h3 style={{ fontSize: '2rem', textAlign: 'center', color: '#1a1a2e', marginBottom: '1rem' }}>
            Why Choose <span style={{ color: '#e67e22' }}>Us</span>
          </h3>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
            What makes Abba Homes & Properties your ideal real estate partner
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '30px' 
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🤝</div>
              <h4 style={{ color: '#1a1a2e' }}>Trusted & Transparent</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Honest dealings, clear communication</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📋</div>
              <h4 style={{ color: '#1a1a2e' }}>Expert Guidance</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Local market expertise you can trust</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚡</div>
              <h4 style={{ color: '#1a1a2e' }}>Seamless Process</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>From search to management, we handle it all</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏆</div>
              <h4 style={{ color: '#1a1a2e' }}>Proven Results</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>50+ properties successfully managed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
