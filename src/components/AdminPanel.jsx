import React, { useState, useEffect, useRef } from 'react'
import { FaTimes, FaLock, FaUpload } from 'react-icons/fa'

const ADMIN_PIN = '1234' // Change this to your desired PIN

const AdminPanel = ({ properties, onAddProperty, onDeleteProperty }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    image: '', // This will store the Base64 string
    description: '',
    type: 'sale',
    category: 'apartment'
  })

  // Reset auth when panel closes
  useEffect(() => {
    if (!isOpen) {
      setIsAuthenticated(false)
      setPin('')
      setPinError(false)
      setImagePreview(null)
    }
  }, [isOpen])

  const handlePinSubmit = (e) => {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true)
      setPinError(false)
      setPin('')
    } else {
      setPinError(true)
      setPin('')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // ✅ NEW: Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        setImagePreview(base64String)
        setFormData({ ...formData, image: base64String })
      }
      reader.readAsDataURL(file)
    }
  }

  // ✅ NEW: Remove selected image
  const handleRemoveImage = () => {
    setImagePreview(null)
    setFormData({ ...formData, image: '' })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // ✅ Validate image is uploaded
    if (!formData.image) {
      alert('⚠️ Please upload an image for the property.')
      return
    }

    onAddProperty({
      ...formData,
      bedrooms: parseInt(formData.bedrooms) || 0,
      bathrooms: parseInt(formData.bathrooms) || 0,
    })
    
    // Reset form
    setFormData({
      title: '',
      price: '',
      location: '',
      bedrooms: '',
      bathrooms: '',
      image: '',
      description: '',
      type: 'sale',
      category: 'apartment'
    })
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    alert('✅ Property added successfully!')
  }

  // Listen for admin toggle from Navbar
  useEffect(() => {
    const handleToggle = () => {
      setIsOpen(prev => {
        if (!prev) {
          setIsAuthenticated(false)
          setPin('')
          setPinError(false)
          setImagePreview(null)
        }
        return !prev
      })
    }
    document.addEventListener('toggleAdmin', handleToggle)
    return () => document.removeEventListener('toggleAdmin', handleToggle)
  }, [])

  return (
    <div 
      className={`admin-panel ${isOpen ? 'active' : ''}`}
      style={{
        position: 'fixed',
        bottom: isOpen ? '0' : '-100%',
        left: 0,
        right: 0,
        background: 'white',
        padding: isAuthenticated ? '40px' : '30px',
        boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.2)',
        transition: 'bottom 0.3s ease',
        zIndex: 999,
        maxHeight: '80vh',
        overflowY: 'auto',
        borderTop: '4px solid #e67e22',
        borderRadius: '15px 15px 0 0'
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <h2 style={{ color: '#1a1a2e', margin: 0 }}>
          {isAuthenticated ? '🏠 Property Management' : '🔒 Admin Access'}
        </h2>
        <button
          onClick={() => {
            setIsOpen(false)
            setIsAuthenticated(false)
            setPin('')
            setPinError(false)
            setImagePreview(null)
          }}
          style={{
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          <FaTimes /> Close
        </button>
      </div>

      {/* PIN Authentication */}
      {!isAuthenticated ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          background: '#f8f9fa',
          borderRadius: '15px'
        }}>
          <FaLock size={48} color="#e67e22" />
          <h3 style={{ marginTop: '20px', color: '#1a1a2e' }}>Enter Admin PIN</h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>Please enter the admin PIN to access the dashboard</p>
          <form onSubmit={handlePinSubmit} style={{ display: 'flex', gap: '10px', flexDirection: 'column', width: '100%', maxWidth: '300px' }}>
            <input
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              style={{
                padding: '12px',
                border: `2px solid ${pinError ? '#e74c3c' : '#ddd'}`,
                borderRadius: '10px',
                fontSize: '1rem',
                textAlign: 'center',
                outline: 'none'
              }}
              maxLength="4"
              autoFocus
            />
            {pinError && (
              <p style={{ color: '#e74c3c', fontSize: '0.9rem', margin: '5px 0 0', textAlign: 'center' }}>
                ❌ Incorrect PIN. Please try again.
              </p>
            )}
            <button
              type="submit"
              style={{
                background: '#e67e22',
                color: 'white',
                border: 'none',
                padding: '12px',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Unlock Dashboard
            </button>
          </form>
          <p style={{ color: '#999', fontSize: '0.8rem', marginTop: '20px' }}>
            Default PIN: 1234 (Change this in the code)
          </p>
        </div>
      ) : (
        // Admin Dashboard
        <>
          <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px'
            }}>
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#333' }}>
                  Property Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Luxury Villa in Karen"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#333' }}>
                  Price *
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="e.g. KES 45,000,000"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#333' }}>
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Karen, Nairobi"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#333' }}>
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="land">🌍 Land</option>
                  <option value="apartment">🏢 Apartment</option>
                  <option value="house">🏠 House</option>
                  <option value="commercial">🏢 Commercial</option>
                </select>
              </div>
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#333' }}>
                  Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#333' }}>
                  Bedrooms
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="0"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#333' }}>
                  Bathrooms
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="0"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              {/* ✅ CHANGED: Image Upload Section */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#333' }}>
                  Property Image *
                </label>
                <div style={{
                  border: '2px dashed #ddd',
                  borderRadius: '10px',
                  padding: '20px',
                  textAlign: 'center',
                  background: '#fafafa',
                  transition: 'border-color 0.3s ease'
                }}>
                  {!imagePreview ? (
                    <>
                      <FaUpload size={32} color="#999" />
                      <p style={{ color: '#666', margin: '10px 0' }}>
                        Click below to upload an image
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{
                          display: 'block',
                          margin: '0 auto',
                          padding: '10px',
                          border: '1px solid #ddd',
                          borderRadius: '5px',
                          width: '100%',
                          maxWidth: '300px',
                          cursor: 'pointer'
                        }}
                      />
                      <p style={{ color: '#999', fontSize: '0.8rem', marginTop: '10px' }}>
                        Supported: JPG, PNG, WebP (Max 5MB)
                      </p>
                    </>
                  ) : (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img 
                        src={imagePreview} 
                        alt="Property preview"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '250px',
                          borderRadius: '8px',
                          objectFit: 'cover'
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        style={{
                          position: 'absolute',
                          top: '-10px',
                          right: '-10px',
                          background: '#e74c3c',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '30px',
                          height: '30px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        ×
                      </button>
                      <p style={{ color: '#2ecc71', fontSize: '0.85rem', marginTop: '8px' }}>
                        ✅ Image uploaded successfully!
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null)
                          setFormData({ ...formData, image: '' })
                          if (fileInputRef.current) {
                            fileInputRef.current.value = ''
                          }
                        }}
                        style={{
                          background: 'transparent',
                          color: '#e67e22',
                          border: '1px solid #e67e22',
                          padding: '5px 15px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          marginTop: '5px'
                        }}
                      >
                        Change Image
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#333' }}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the property..."
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: '#e67e22',
                    color: 'white',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  ➕ Add Property
                </button>
              </div>
            </div>
          </form>

          {/* Existing Properties List */}
          <div>
            <h3 style={{ marginBottom: '15px', color: '#1a1a2e' }}>
              Current Properties ({properties.length})
            </h3>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {properties.map(prop => (
                <div
                  key={prop.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 15px',
                    borderBottom: '1px solid #eee',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    marginBottom: '8px'
                  }}
                >
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* ✅ Show thumbnail of uploaded image */}
                    {prop.image && (
                      <img 
                        src={prop.image} 
                        alt={prop.title}
                        style={{
                          width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: '1px solid #eee'
                        }}
                      />
                    )}
                    <div>
                      <strong style={{ color: '#1a1a2e' }}>{prop.title}</strong>
                      <span style={{ marginLeft: '15px', color: '#e67e22', fontWeight: 'bold' }}>
                        {prop.price}
                      </span>
                      <span style={{ marginLeft: '15px', color: '#888', fontSize: '0.9rem' }}>
                        📍 {prop.location}
                      </span>
                      <span style={{
                        marginLeft: '10px',
                        display: 'inline-block',
                        padding: '2px 10px',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        background: prop.category === 'land' ? '#2ecc71' : 
                                     prop.category === 'apartment' ? '#3498db' : 
                                     prop.category === 'house' ? '#9b59b6' : '#e67e22',
                        color: 'white'
                      }}>
                        {prop.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${prop.title}"?`)) {
                        onDeleteProperty(prop.id)
                      }
                    }}
                    style={{
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AdminPanel
