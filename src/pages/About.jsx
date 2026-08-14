import React from 'react'

const About = () => {
  return (
    <section style={{ padding: '80px 20px', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', color: '#1a1a2e' }}>
          About <span style={{ color: '#e67e22' }}>Abba Homes</span>
        </h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
          Premier real estate agency in Nairobi
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600" 
              alt="Nairobi Homes"
              style={{ width: '100%', borderRadius: '15px' }}
            />
          </div>
          <div>
            <h3 style={{ fontSize: '2rem', color: '#1a1a2e', marginBottom: '1rem' }}>
              Your Trusted <span style={{ color: '#e67e22' }}>Real Estate Partner</span>
            </h3>
            <p style={{ color: '#666', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Abba Homes Properties Ltd is a premier real estate agency dedicated to
              helping you find the perfect property in Kenya's vibrant capital.
              With years of experience in the Nairobi property market, we
              understand the unique needs of both buyers and renters.
            </p>
            <p style={{ color: '#666', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Our team of expert agents is committed to providing exceptional
              service and guiding you through every step of your property journey.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e67e22' }}>500+</div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>Properties Sold</div>
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
      </div>
    </section>
  )
}

export default About
