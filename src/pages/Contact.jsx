import React, { useState } from 'react'
import emailjs from '@emailjs/browser'

// ✅ EmailJS Credentials - Replace with your values
const SERVICE_ID = 'service_ige8di8'
const TEMPLATE_ID = 'template_ij7b487'
const PUBLIC_KEY = 'FA4B7Ql9wC1l6hWsK'

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

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      currentYear: new Date().getFullYear()
    }

    emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    )
    .then((response) => {
      alert('✅ Message sent successfully! We will get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
    })
    .catch((error) => {
      console.error('Email send failed:', error)
      if (error.text) {
        alert(`❌ Failed to send: ${error.text}`)
      } else {
        alert('❌ Failed to send message. Please try again or contact us directly.')
      }
    })
    .finally(() => {
      setIsSending(false)
    })
  }

  return (
    <section style={{ 
      padding: '80px 20px', 
      background: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh'
    }}>
      <div style={{ 
        maxWidth: '600px', 
        width: '100%',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 5vw, 2.5rem)', 
            color: '#1a1a2e',
            marginBottom: '0.5rem'
          }}>
            Get in <span style={{ color: '#e67e22' }}>Touch</span>
          </h2>
          <p style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.1rem)', 
            color: '#666',
            margin: 0
          }}>
            We'd love to hear from you
          </p>
        </div>

        {/* Contact Form */}
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
    </section>
  )
}

export default Contact
