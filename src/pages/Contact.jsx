import React, { useState } from 'react'
import emailjs from '@emailjs/browser'

// ✅ EmailJS Credentials - Replace with your values
const SERVICE_ID = 'service_ige8di8'  // ← Get from EmailJS Dashboard → Email Services
const TEMPLATE_ID = 'template_ij7b487' // ← From your screenshot
const PUBLIC_KEY = 'user_FA4B7Ql9wC1l6hWsK' // ← Get from EmailJS Dashboard → Account → API Keys

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSending, setIsSending] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSending(true)

    // ✅ Prepare the data to send to EmailJS
    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      currentYear: new Date().getFullYear()
    }

    // ✅ Send the email
    emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    )
    .then(() => {
      alert('✅ Message sent successfully! We will get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
    })
    .catch((error) => {
      console.error('Email send failed:', error)
      alert('❌ Failed to send message. Please try again or contact us directly.')
    })
    .finally(() => {
      setIsSending(false)
    })
  }

  return (
    <section style={{ padding: '80px 20px', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: 'clamp(2rem, 5vw, 2.5rem)', 
          textAlign: 'center', 
          color: '#1a1a2e' 
        }}>
          Get in <span style={{ color: '#e67e22' }}>Touch</span>
        </h2>
        <p style={{ 
          textAlign: 'center', 
          color: '#666', 
          marginBottom: '3rem',
          fontSize: 'clamp(1rem, 2vw, 1.1rem)'
        }}>
          We'd love to hear from you
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '60px',
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
            gap: '40px'
          }
        }}>
          {/* Contact Info - LEFT SIDE */}
          <div>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 'clamp(20px, 3vw, 30px)' 
            }}>
              {/* Phone */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '15px',
                flexWrap: 'wrap'
              }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: '#e67e22', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                  flexShrink: 0
                }}>📞</div>
                <div>
                  <h4 style={{ 
                    fontSize: 'clamp(1rem, 2vw, 1.1rem)', 
                    color: '#1a1a2e',
                    margin: 0
                  }}>Phone</h4>
                  <p style={{ 
                    color: '#666', 
                    margin: 0,
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                    wordBreak: 'break-word'
                  }}>
                    <a href="tel:+254100658430" style={{ color: '#666', textDecoration: 'none' }}>
                      +254 100 658430
                    </a>
                    {' / '}
                    <a href="tel:+254703388001" style={{ color: '#666', textDecoration: 'none' }}>
                      +254 703 388001
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '15px',
                flexWrap: 'wrap'
              }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: '#e67e22', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                  flexShrink: 0
                }}>✉️</div>
                <div>
                  <h4 style={{ 
                    fontSize: 'clamp(1rem, 2vw, 1.1rem)', 
                    color: '#1a1a2e',
                    margin: 0
                  }}>Email</h4>
                  <p style={{ 
                    color: '#666', 
                    margin: 0,
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                    wordBreak: 'break-word'
                  }}>
                    <a href="mailto:info@abbahomes-properties.com" style={{ color: '#666', textDecoration: 'none' }}>
                      info@abbahomes-properties.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Address */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '15px',
                flexWrap: 'wrap'
              }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: '#e67e22', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                  flexShrink: 0
                }}>📍</div>
                <div>
                  <h4 style={{ 
                    fontSize: 'clamp(1rem, 2vw, 1.1rem)', 
                    color: '#1a1a2e',
                    margin: 0
                  }}>Address</h4>
                  <p style={{ 
                    color: '#666', 
                    margin: 0,
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                    wordBreak: 'break-word'
                  }}>
                    Rod Kopany, Homa Bay County, Kenya
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '15px',
                flexWrap: 'wrap'
              }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: '#e67e22', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                  flexShrink: 0
                }}>🕐</div>
                <div>
                  <h4 style={{ 
                    fontSize: 'clamp(1rem, 2vw, 1.1rem)', 
                    color: '#1a1a2e',
                    margin: 0
                  }}>Working Hours</h4>
                  <p style={{ 
                    color: '#666', 
                    margin: 0,
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                  }}>
                    Mon-Fri: 8:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form - RIGHT SIDE */}
          <form onSubmit={handleSubmit} style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '15px' 
          }}>
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleChange}
              style={{ 
                padding: 'clamp(12px, 2vw, 15px)', 
                border: '1px solid #ddd', 
                borderRadius: '10px',
                fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                width: '100%',
                boxSizing: 'border-box'
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
                padding: 'clamp(12px, 2vw, 15px)', 
                border: '1px solid #ddd', 
                borderRadius: '10px',
                fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                width: '100%',
                boxSizing: 'border-box'
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
                padding: 'clamp(12px, 2vw, 15px)', 
                border: '1px solid #ddd', 
                borderRadius: '10px',
                fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                resize: 'vertical',
                width: '100%',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
              required
            />
            <button 
              type="submit"
              disabled={isSending}
              style={{
                background: isSending ? '#ccc' : '#e67e22',
                color: 'white',
                border: 'none',
                padding: 'clamp(12px, 2vw, 15px)',
                borderRadius: '10px',
                fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                fontWeight: 'bold',
                cursor: isSending ? 'not-allowed' : 'pointer',
                width: '100%',
                transition: 'background 0.3s ease',
                opacity: isSending ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isSending) e.target.style.background = '#d35400'
              }}
              onMouseLeave={(e) => {
                if (!isSending) e.target.style.background = '#e67e22'
              }}
            >
              {isSending ? '⏳ Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      {/* ✅ Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          
          .contact-info {
            order: 1;
          }
          
          .contact-form {
            order: 2;
          }
        }
      `}</style>
    </section>
  )
}

export default Contact
