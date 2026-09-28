import { useState, useEffect } from 'react'
import { 
  saveProperties, 
  loadProperties, 
  deleteProperty as deleteFromDB,
  getStorageInfo,
  isIndexedDBAvailable
} from '../utils/storage'
import { 
  savePropertiesToR2, 
  loadPropertiesFromR2 
} from '../utils/r2Storage'

// ✅ Default properties for first-time setup
const DEFAULT_PROPERTIES = []

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

  // ✅ Load properties: R2 → IndexedDB (cache)
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('🔍 Loading properties...')
        
        // ✅ Step 1: Try loading from R2 (permanent storage)
        let data = await loadPropertiesFromR2()
        console.log('🔍 Data from R2:', data)
        
        // ✅ Step 2: If no data in R2, try IndexedDB
        if (!data || data.length === 0) {
          console.log('🔍 No data in R2, trying IndexedDB...')
          data = await loadProperties()
          console.log('🔍 Data from IndexedDB:', data)
        }
        
        // ✅ Step 3: If still no data, use defaults
        if (!data || data.length === 0) {
          console.log('🔍 No data found, using defaults...')
          data = DEFAULT_PROPERTIES
        }
        
        // ✅ Step 4: Save to IndexedDB (for fast local access)
        if (data && data.length > 0) {
          await saveProperties(data)
        }
        
        // ✅ Step 5: Set state
        setProperties(data)
        console.log('🔍 Properties loaded:', data.length)
        
        const info = await getStorageInfo()
        setStorageInfo(info)
        
      } catch (error) {
        console.error('❌ Failed to load properties:', error)
        // Fallback to IndexedDB
        try {
          const fallback = await loadProperties()
          setProperties(fallback || [])
        } catch (e) {
          setProperties([])
        }
      }
      setIsLoading(false)
    }
    
    loadData()
  }, [])

  // ✅ Save properties to both R2 and IndexedDB
  const savePropertiesToDB = async (newProperties) => {
    try {
      console.log('💾 Saving properties...')
      
      // ✅ Save to R2 (permanent cloud storage)
      await savePropertiesToR2(newProperties)
      
      // ✅ Save to IndexedDB (fast local cache)
      await saveProperties(newProperties)
      
      setProperties(newProperties)
      console.log('💾 Properties saved successfully to R2 and IndexedDB!')
      
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
        image = await compressImage(imageFile, 800, 600, 0.7)
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
    
    const updated = [...properties, newProperty]
    await savePropertiesToDB(updated)
    console.log('➕ Property added! Total:', updated.length)
    return newProperty
  }

  // ✅ Delete a property
  const deleteProperty = async (id) => {
    try {
      console.log('🗑️ Deleting property:', id)
      
      const updated = properties.filter(p => p.id !== id)
      
      // ✅ Save to R2 and IndexedDB
      await savePropertiesToR2(updated)
      await deleteFromDB(id)
      
      setProperties(updated)
      console.log('🗑️ Property deleted. Remaining:', updated.length)
      
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
    return properties.slice(0, 3)
  }

  // Get storage info
  const getStorageInfoData = () => {
    return storageInfo
  }

  // ✅ Force refresh from R2
  const refreshFromR2 = async () => {
    setIsLoading(true)
    try {
      const data = await loadPropertiesFromR2()
      if (data && data.length > 0) {
        setProperties(data)
        await saveProperties(data)
        console.log('✅ Refreshed from R2:', data.length)
      }
    } catch (error) {
      console.error('❌ Refresh failed:', error)
    }
    setIsLoading(false)
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
    refreshFromR2,
    compressImage
  }
}
