import { useState, useEffect } from 'react'
import { 
  saveProperties, 
  loadProperties, 
  deleteProperty as deleteFromDB,
  getStorageInfo,
  isIndexedDBAvailable
} from '../utils/storage'

// ✅ Default property for initial setup
const DEFAULT_PROPERTIES = [
  {
    id: 'default-1',
    title: 'Test Property - Delete Me',
    price: 'KES 10,000',
    location: 'Homa Bay Town, Homa Bay County',
    bedrooms: 2,
    bathrooms: 1,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
    description: 'This is a test property to verify the system is working.',
    type: 'rent',
    category: 'apartment',
    status: 'available',
    dateAdded: new Date().toISOString()
  }
]

// Image compression utility
const compressImage = (file, maxWidth = 800, maxHeight = 600, quality = 0.7) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height
            height = maxHeight
          }
        }
        
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

export const useProperties = () => {
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [storageInfo, setStorageInfo] = useState(null)
  const [isDBReady, setIsDBReady] = useState(false)

  // ✅ Load properties on mount - FIXED dependency array
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('🔍 Starting to load properties...')
        
        // Check if IndexedDB is available
        const dbAvailable = isIndexedDBAvailable()
        setIsDBReady(dbAvailable)
        console.log('🔍 IndexedDB available:', dbAvailable)
        
        // Try to load from IndexedDB
        let data = await loadProperties()
        console.log('🔍 Data loaded from IndexedDB:', data)
        
        // ✅ If no data, add a default test property
        if (!data || data.length === 0) {
          console.log('🔍 No data found, adding test property...')
          data = DEFAULT_PROPERTIES
          await saveProperties(data)
          console.log('🔍 Test property saved!')
        }
        
        // ✅ Set the state with the data
        setProperties(data)
        console.log('🔍 Properties set in state:', data)
        
        // Get storage info
        const info = await getStorageInfo()
        setStorageInfo(info)
        
      } catch (error) {
        console.error('❌ Failed to load properties:', error)
        setProperties(DEFAULT_PROPERTIES)
      }
      setIsLoading(false)
      console.log('🔍 Loading complete')
    }
    
    loadData()
  }, []) // ✅ Empty dependency array - runs once on mount

  // ✅ Save properties to IndexedDB
  const savePropertiesToDB = async (newProperties) => {
    try {
      console.log('💾 Saving properties to IndexedDB:', newProperties)
      await saveProperties(newProperties)
      setProperties(newProperties)
      console.log('💾 Properties saved successfully!')
      
      // Update storage info
      const info = await getStorageInfo()
      setStorageInfo(info)
      
    } catch (error) {
      console.error('❌ Failed to save properties:', error)
      alert('❌ Failed to save properties. Please try again.')
    }
  }

  // ✅ Add a new property
  const addProperty = async (propertyData, imageFile = null) => {
    console.log('➕ Adding new property...', propertyData)
    
    let image = propertyData.image || ''
    
    if (imageFile) {
      try {
        console.log('📸 Compressing image...')
        image = await compressImage(imageFile, 800, 600, 0.7)
        console.log('📸 Image compressed successfully')
      } catch (error) {
        console.error('❌ Image compression failed:', error)
        image = propertyData.image || ''
      }
    }
    
    const newProperty = {
      ...propertyData,
      image: image,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
      status: 'available'
    }
    
    console.log('➕ New property object:', newProperty)
    
    // ✅ Use the current properties state to add the new property
    const updated = [...properties, newProperty]
    await savePropertiesToDB(updated)
    console.log('➕ Property added successfully! Total properties:', updated.length)
    return newProperty
  }

  // ✅ Delete a property
  const deleteProperty = async (id) => {
    try {
      console.log('🗑️ Deleting property:', id)
      await deleteFromDB(id)
      const updated = properties.filter(p => p.id !== id)
      setProperties(updated)
      console.log('🗑️ Property deleted. Remaining:', updated.length)
      
      // Update storage info
      const info = await getStorageInfo()
      setStorageInfo(info)
    } catch (error) {
      console.error('❌ Failed to delete property:', error)
      alert('❌ Failed to delete property. Please try again.')
    }
  }

  // Update a property
  const updateProperty = async (id, updates) => {
    const updated = properties.map(p => 
      p.id === id ? { ...p, ...updates } : p
    )
    await savePropertiesToDB(updated)
  }

  // Get properties by category
  const getByCategory = (category) => {
    return properties.filter(p => p.category === category)
  }

  // Get properties by type (sale/rent/commercial)
  const getByType = (type) => {
    return properties.filter(p => p.type === type)
  }

  // Get properties by location
  const getByLocation = (location) => {
    return properties.filter(p => 
      p.location.toLowerCase().includes(location.toLowerCase())
    )
  }

  // Get featured properties (first 3 for homepage)
  const getFeatured = () => {
    console.log('📊 getFeatured called, properties:', properties)
    const featured = properties.slice(0, 3)
    console.log('📊 Featured properties:', featured)
    return featured
  }

  // Get storage info
  const getStorageInfoData = () => {
    return storageInfo
  }

  return {
    properties,
    isLoading,
    isDBReady,
    storageInfo,
    addProperty,
    deleteProperty,
    updateProperty,
    getByCategory,
    getByType,
    getByLocation,
    getFeatured,
    getStorageInfoData,
    compressImage
  }
}
