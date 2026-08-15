import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section style={{ padding: '80px 20px', background: 'white' }}>
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
                  <p style={{ color: '#666' }}>+254 100 658430/+254703388001</p>
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
                  <p style={{ color: '#666' }}>info@abbahomes-properties.com</p>
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
                  <p style={{ color: '#666' }}>Rod Kopany, Homa Bay County, Kenya</p>
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
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleChange}
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
              name="email"
              placeholder="Your Email" 
              value={formData.email}
              onChange={handleChange}
              style={{ 
                padding: '15px', 
                border: '1px solid #ddd', 
                borderRadius: '10px',
                fontSize: '1rem'
              }}
              required
            />
            <textarea 
              name="message"
              placeholder="Your Message" 
              rows="5"
              value={formData.message}
              onChange={handleChange}
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
  )
}

export default Contact
