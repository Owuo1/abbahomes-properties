import React from 'react'

const Services = () => {
  const services = [
    { icon: '🏠', title: 'Property Sales', desc: 'Find your dream home with our extensive listing of properties for sale.' },
    { icon: '🏢', title: 'Rental Services', desc: 'Discover the perfect rental property in Homa Bay\'s best neighborhoods.' },
    { icon: '💰', title: 'Valuation', desc: 'Get expert property valuations to make informed investment decisions.' },
    { icon: '🤝', title: 'Property Management', desc: 'Professional management services for your rental properties.' },
    { icon: '📍', title: 'Land Acquisition', desc: 'Secure prime land for development or investment in Homa Bay.' },
    { icon: '📄', title: 'Legal Support', desc: 'Comprehensive legal guidance for all property transactions.' }
  ]

  return (
    <section style={{ padding: '80px 20px', background: '#f8f9fa' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', color: '#1a1a2e' }}>
          Our <span style={{ color: '#e67e22' }}>Services</span>
        </h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
          Comprehensive real estate solutions tailored to your needs
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {services.map((service, index) => (
            <div key={index} style={{
              background: 'white',
              padding: '40px 30px',
              borderRadius: '15px',
              textAlign: 'center',
              boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{service.icon}</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#1a1a2e' }}>{service.title}</h3>
              <p style={{ color: '#666', lineHeight: 1.6 }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
