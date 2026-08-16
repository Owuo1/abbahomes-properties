import React, { useState, useEffect, useRef } from 'react'
import { FaTimes, FaLock, FaUpload } from 'react-icons/fa'
import { uploadToR2 } from '../utils/r2Storage'

const ADMIN_PIN = '1234' // Change this to your desired PIN

const AdminPanel = ({ properties, onAddProperty, onDeleteProperty }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef(null)
  
  const [formData, setFormData] = useState({
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

  // Reset auth when panel closes
  useEffect(() => {
    if (!isOpen) {
      setIsAuthenticated(false)
      setPin('')
      setPinError(false)
      setImagePreview(null)
      setImageFile(null)
      setIsSubmitting(false)
      setUploadProgress(0)
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

  // Handle image file selection with validation
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      if (!validTypes.includes(file.type)) {
        alert('⚠️ Please upload a valid image (JPG, PNG, WebP, or GIF)')
        e.target.value = ''
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('⚠️ Image is too large. Please upload an image under 5MB.')
        e.target.value = ''
        return
      }
      
      // Store the file
      setImageFile(file)
      
      // Show preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setFormData({ ...formData, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  // Remove selected image
  const handleRemoveImage = () => {
    setImagePreview(null)
    setImageFile(null)
    setFormData({ ...formData, image: '' })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // ✅ Handle form submission with R2 upload
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.title.trim()) {
      alert('⚠️ Please enter a property title.')
      return
    }
    if (!formData.price.trim()) {
      alert('⚠️ Please enter a price.')
      return
    }
    if (!formData.location.trim()) {
      alert('⚠️ Please enter a location.')
      return
    }
    if (!formData.image && !imageFile) {
      alert('⚠️ Please upload an image for the property.')
      return
    }
    
    // Prevent multiple submissions
    if (isSubmitting) return
    setIsSubmitting(true)
    setUploadProgress(10)
    
    try {
      let imageUrl = formData.image
      
      // ✅ Upload to R2 if there's an image file
      if (imageFile) {
        try {
          setUploadProgress(30)
          // Upload the Base64 image to R2
          imageUrl = await uploadToR2(formData.image, formData.title)
          setUploadProgress(80)
          console.log('✅ Image uploaded to R2:', imageUrl)
        } catch (uploadError) {
          console.error('R2 upload error:', uploadError)
          alert('❌ Failed to upload image to cloud storage. Please try again.')
          setIsSubmitting(false)
          setUploadProgress(0)
          return
        }
      }
      
      setUploadProgress(90)
      
      // Prepare property data with R2 URL
      const propertyData = {
        ...formData,
        image: imageUrl, // ✅ Now it's a permanent R2 URL!
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        description: formData.description || 'No description provided'
      }
      
      // Save to IndexedDB (the image URL will be stored)
      await onAddProperty(propertyData, null)
      
      setUploadProgress(100)
      
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
      setImageFile(null)
      setUploadProgress(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      
      alert('✅ Property added successfully! Image stored in Cloudflare R2.')
      
    } catch (error) {
      console.error('Add property failed:', error)
      alert('❌ Failed to add property. Please try again.')
      setUploadProgress(0)
    } finally {
      setIsSubmitting(false)
    }
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
          setImageFile(null)
          setIsSubmitting(false)
          setUploadProgress(0)
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
            setImageFile(null)
            setIsSubmitting(false)
            setUploadProgress(0)
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
                  placeholder="e.g. Luxury Villa in Kendu Bay"
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
                  placeholder="e.g. KES 15,000,000"
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
                  placeholder="e.g. Kendu Bay, Homa Bay County"
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
                  min="0"
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
                  min="0"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              {/* Image Upload Section */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#333' }}>
                  Property Image *
                </label>
                <div style={{
                  border: `2px dashed ${imagePreview ? '#2ecc71' : '#ddd'}`,
                  borderRadius: '10px',
                  padding: '20px',
                  textAlign: 'center',
                  background: imagePreview ? '#f0fff4' : '#fafafa',
                  transition: 'border-color 0.3s ease, background 0.3s ease'
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
                          objectFit: 'cover',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
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
                          justifyContent: 'center',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                        }}
                      >
                        ×
                      </button>
                      <p style={{ color: '#2ecc71', fontSize: '0.85rem', marginTop: '8px' }}>
                        ✅ Image ready for upload
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null)
                          setImageFile(null)
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
                          marginTop: '5px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#e67e22'
                          e.target.style.color = 'white'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent'
                          e.target.style.color = '#e67e22'
                        }}
                      >
                        Change Image
                      </button>
                    </div>
                  )}
                </div>
                {/* Upload Progress Bar */}
                {isSubmitting && uploadProgress > 0 && (
                  <div style={{ marginTop: '10px' }}>
                    <div style={{
                      height: '4px',
                      background: '#eee',
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${uploadProgress}%`,
                        background: '#e67e22',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                    <p style={{ color: '#666', fontSize: '0.8rem', marginTop: '5px' }}>
                      {uploadProgress < 100 ? 'Uploading to cloud...' : 'Done!'}
                    </p>
                  </div>
                )}
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
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              
              <div style={{ gridColumn: '1 / -1' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    background: isSubmitting ? '#ccc' : '#e67e22',
                    color: 'white',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'background 0.3s ease',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  {isSubmitting ? '⏳ Uploading to Cloud...' : '➕ Add Property'}
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
              {properties.length === 0 ? (
                <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>
                  No properties added yet. Start by adding one above!
                </p>
              ) : (
                properties.map(prop => (
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
                      marginBottom: '8px',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f0f0f0'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#f8f9fa'}
                  >
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                      {prop.image && (
                        <img 
                          src={prop.image} 
                          alt={prop.title}
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            border: '1px solid #eee',
                            flexShrink: 0
                          }}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/50x50/eee/999?text=No+Image'
                          }}
                        />
                      )}
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <strong style={{ color: '#1a1a2e', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {prop.title}
                        </strong>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                          <span style={{ color: '#e67e22', fontWeight: 'bold', fontSize: '0.9rem' }}>
                            {prop.price}
                          </span>
                          <span style={{ color: '#888', fontSize: '0.8rem' }}>
                            📍 {prop.location}
                          </span>
                          <span style={{
                            display: 'inline-block',
                            padding: '2px 10px',
                            borderRadius: '12px',
                            fontSize: '0.65rem',
                            fontWeight: 'bold',
                            background: prop.category === 'land' ? '#2ecc71' : 
                                         prop.category === 'apartment' ? '#3498db' : 
                                         prop.category === 'house' ? '#9b59b6' : '#e67e22',
                            color: 'white',
                            textTransform: 'capitalize'
                          }}>
                            {prop.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete "${prop.title}"?`)) {
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
                        fontSize: '0.85rem',
                        transition: 'background 0.2s ease',
                        flexShrink: 0
                      }}
                      onMouseEnter={(e) => e.target.style.background = '#c0392b'}
                      onMouseLeave={(e) => e.target.style.background = '#e74c3c'}
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AdminPanel
