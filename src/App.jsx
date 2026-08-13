import React from 'react'
import './App.css'

function App() {
  return (
    <div className="app">
      {/* Navigation */}
      <nav style={{
        background: '#1a3c2a',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            src="https://i.ibb.co/r2fhGBwb/abba-logo-removebg-preview.png" 
            alt="Abba Homes Properties" 
            style={{ height: '40px', width: 'auto' }}
          />
          <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Abba<span style={{ color: '#e67e22' }}>Homes</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="#about" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>About Us</a>
          <a href="#services" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Services</a>
          <a href="#properties" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Property Search</a>
          <a href="#map" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Map Search</a>
          <a href="#contact" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Contacts</a>
          <button style={{
            background: '#e67e22',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '25px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            ➕ Add Listing
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        color: 'white',
        padding: '120px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
            Find Your <span style={{ color: '#e67e22' }}>Dream Home</span> in Nairobi
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '2rem' }}>
            Discover premium properties across Nairobi. From luxury villas to modern apartments,
            we have the perfect home for you.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
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
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '80px 20px', background: 'white' }}>
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

      {/* Services Section */}
      <section id="services" style={{ padding: '80px 20px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', color: '#1a1a2e' }}>
            Our <span style={{ color: '#e67e22' }}>Services</span>
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
            Comprehensive real estate solutions tailored to your needs
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            {[
              { icon: '🏠', title: 'Property Sales', desc: 'Find your dream home with our extensive listing of properties for sale.' },
              { icon: '🏢', title: 'Rental Services', desc: 'Discover the perfect rental property in Nairobi\'s best neighborhoods.' },
              { icon: '💰', title: 'Valuation', desc: 'Get expert property valuations to make informed investment decisions.' },
              { icon: '🤝', title: 'Property Management', desc: 'Professional management services for your rental properties.' },
              { icon: '📍', title: 'Land Acquisition', desc: 'Secure prime land for development or investment in Nairobi.' },
              { icon: '📄', title: 'Legal Support', desc: 'Comprehensive legal guidance for all property transactions.' }
            ].map((service, index) => (
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

      {/* Property Search Section */}
      <section id="properties" style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', color: '#1a1a2e' }}>
            Property <span style={{ color: '#e67e22' }}>Search</span>
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
            Find the perfect property in Nairobi
          </p>
          <div style={{ textAlign: 'center', padding: '50px', background: '#f8f9fa', borderRadius: '15px' }}>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>
              🔍 Property listings coming soon...
            </p>
            <p style={{ color: '#888', marginTop: '10px' }}>
              We're curating the best properties in Nairobi for you.
            </p>
          </div>
        </div>
      </section>

      {/* Map Search Section */}
      <section id="map" style={{ padding: '80px 20px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', color: '#1a1a2e' }}>
            Search by <span style={{ color: '#e67e22' }}>Map</span>
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
            Visualize properties across Nairobi's neighborhoods
          </p>
          <div style={{ 
            background: '#e0e0e0', 
            height: '400px', 
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: '#666'
          }}>
            <p style={{ fontSize: '1.2rem' }}>📍 Interactive Map Coming Soon</p>
            <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
              View properties on an interactive map of Nairobi
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', color: '#1a1a2e' }}>
            Get in <span style={{ color: '#e67e22' }}>Touch</span>
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
            We'd love to hear from you
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    background: '#e67e22', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.2rem'
                  }}>📞</div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: '#1a1a2e' }}>Phone</h4>
                    <p style={{ color: '#666' }}>+254 700 123 456</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    background: '#e67e22', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.2rem'
                  }}>✉️</div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: '#1a1a2e' }}>Email</h4>
                    <p style={{ color: '#666' }}>info@abbahomes.com</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    background: '#e67e22', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.2rem'
                  }}>📍</div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: '#1a1a2e' }}>Address</h4>
                    <p style={{ color: '#666' }}>Westlands, Nairobi, Kenya</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    background: '#e67e22', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.2rem'
                  }}>🕐</div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: '#1a1a2e' }}>Working Hours</h4>
                    <p style={{ color: '#666' }}>Mon-Fri: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input 
                type="text" 
                placeholder="Your Name" 
                style={{ 
                  padding: '15px', 
                  border: '1px solid #ddd', 
                  borderRadius: '10px',
                  fontSize: '1rem'
                }}
                required
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                style={{ 
                  padding: '15px', 
                  border: '1px solid #ddd', 
                  borderRadius: '10px',
                  fontSize: '1rem'
                }}
                required
              />
              <textarea 
                placeholder="Your Message" 
                rows="5"
                style={{ 
                  padding: '15px', 
                  border: '1px solid #ddd', 
                  borderRadius: '10px',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
                required
              />
              <button 
                type="submit"
                style={{
                  background: '#e67e22',
                  color: 'white',
                  border: 'none',
                  padding: '15px',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#1a1a2e',
        color: 'white',
        padding: '60px 20px 30px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#e67e22' }}>🏠 Abba Homes</h4>
              <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
                Premier real estate agency in Nairobi, helping you find your dream home in Kenya's capital.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#e67e22' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '10px' }}><a href="#about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>About Us</a></li>
                <li style={{ marginBottom: '10px' }}><a href="#services" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Services</a></li>
                <li style={{ marginBottom: '10px' }}><a href="#properties" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Properties</a></li>
                <li style={{ marginBottom: '10px' }}><a href="#contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#e67e22' }}>Contact</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '10px', opacity: 0.8 }}>📞 +254 700 123 456</li>
                <li style={{ marginBottom: '10px', opacity: 0.8 }}>✉️ info@abbahomes.com</li>
                <li style={{ marginBottom: '10px', opacity: 0.8 }}>📍 Westlands, Nairobi</li>
              </ul>
            </div>
          </div>
          <div style={{ 
            textAlign: 'center', 
            paddingTop: '30px', 
            borderTop: '1px solid rgba(255,255,255,0.1)',
            opacity: 0.7,
            fontSize: '0.9rem'
          }}>
            &copy; {new Date().getFullYear()} Abba Homes Properties Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
