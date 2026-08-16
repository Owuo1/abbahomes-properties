import { useState, useEffect } from 'react'
import { 
  saveProperties, 
  loadProperties, 
  deleteProperty as deleteFromDB,
  getStorageInfo,
  isIndexedDBAvailable
} from '../utils/storage'

// Default properties (seed data) - Focused on Homa Bay County
const defaultProperties = [
  {
    id: '1',
    title: 'Luxury Villa in Kendu Bay',
    price: 'KES 15,000,000',
    location: 'Kendu Bay, Homa Bay County',
    bedrooms: 4,
    bathrooms: 3,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600',
    description: 'Stunning modern villa with panoramic views of Lake Victoria',
    type: 'sale',
    category: 'house',
    status: 'available',
    dateAdded: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Modern Apartment in Homa Bay Town',
    price: 'KES 35,000/month',
    location: 'Homa Bay Town, Homa Bay County',
    bedrooms: 2,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
    description: 'Contemporary apartment in prime location near the lake',
    type: 'rent',
    category: 'apartment',
    status: 'available',
    dateAdded: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Prime Land in Mbita',
    price: 'KES 8,000,000',
    location: 'Mbita, Homa Bay County',
    bedrooms: 0,
    bathrooms: 0,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600',
    description: 'Prime residential land with stunning lake views',
    type: 'sale',
    category: 'land',
    status: 'available',
    dateAdded: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Commercial Space in Homa Bay CBD',
    price: 'KES 80,000/month',
    location: 'Homa Bay Town, Homa Bay County',
    bedrooms: 0,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
    description: 'Prime commercial space in the heart of Homa Bay Town',
    type: 'commercial',
    category: 'commercial',
    status: 'available',
    dateAdded: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Spacious House in Oyugis',
    price: 'KES 25,000/month',
    location: 'Oyugis, Homa Bay County',
    bedrooms: 3,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600',
    description: 'Spacious family home in a quiet neighborhood',
    type: 'rent',
    category: 'house',
    status: 'available',
    dateAdded: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Beachfront Land in Sindo',
    price: 'KES 12,000,000',
    location: 'Sindo, Homa Bay County',
    bedrooms: 0,
    bathrooms: 0,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
    description: 'Prime beachfront land with direct Lake Victoria access',
    type: 'sale',
    category: 'land',
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

  // Load properties on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Check if IndexedDB is available
        const dbAvailable = isIndexedDBAvailable()
        setIsDBReady(dbAvailable)
        
        // Try to load from IndexedDB
        let data = await loadProperties()
        
        // If no data, use defaults
        if (!data || data.length === 0) {
          data = defaultProperties
          await saveProperties(data)
        }
        
        setProperties(data)
        
        // Get storage info
        const info = await getStorageInfo()
        setStorageInfo(info)
        
      } catch (error) {
        console.error('Failed to load properties:', error)
        // Fallback to default
        setProperties(defaultProperties)
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
