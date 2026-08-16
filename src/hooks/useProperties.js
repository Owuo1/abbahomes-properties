import { useState, useEffect } from 'react'
import { 
  saveProperties, 
  loadProperties, 
  deleteProperty as deleteFromDB,
  getStorageInfo,
  isIndexedDBAvailable
} from '../utils/storage'

// ✅ NO HARDCODED PROPERTIES - Start with empty array
const EMPTY_PROPERTIES = []

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

  // Load properties on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Check if IndexedDB is available
        const dbAvailable = isIndexedDBAvailable()
        setIsDBReady(dbAvailable)
        
        // Try to load from IndexedDB
        let data = await loadProperties()
        
        // ✅ If no data, start with empty array (no defaults!)
        if (!data || data.length === 0) {
          data = EMPTY_PROPERTIES
          await saveProperties(data)
        }
        
        setProperties(data)
        
        // Get storage info
        const info = await getStorageInfo()
        setStorageInfo(info)
        
      } catch (error) {
        console.error('Failed to load properties:', error)
        // ✅ Fallback to empty array
        setProperties(EMPTY_PROPERTIES)
      }
      setIsLoading(false)
    }
    
    loadData()
  }, [])

  // Save properties to IndexedDB
  const savePropertiesToDB = async (newProperties) => {
    try {
      await saveProperties(newProperties)
      setProperties(newProperties)
      
      // Update storage info
      const info = await getStorageInfo()
      setStorageInfo(info)
      
    } catch (error) {
      console.error('Failed to save properties:', error)
      alert('❌ Failed to save properties. Please try again.')
    }
  }

  // Add a new property
  const addProperty = async (propertyData, imageFile = null) => {
    let image = propertyData.image || ''
    
    if (imageFile) {
      try {
        image = await compressImage(imageFile, 800, 600, 0.7)
      } catch (error) {
        console.error('Image compression failed:', error)
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
    
    const updated = [...properties, newProperty]
    await savePropertiesToDB(updated)
    return newProperty
  }

  // Delete a property
  const deleteProperty = async (id) => {
    try {
      await deleteFromDB(id)
      const updated = properties.filter(p => p.id !== id)
      setProperties(updated)
      // Update storage info
      const info = await getStorageInfo()
      setStorageInfo(info)
    } catch (error) {
      console.error('Failed to delete property:', error)
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
    return properties.slice(0, 3)
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
