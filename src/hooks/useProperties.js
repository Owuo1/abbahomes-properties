import { useState, useEffect } from 'react'

// Default properties (seed data)
const defaultProperties = [
  {
    id: '1',
    title: 'Luxury Villa in Karen',
    price: 'KES 45,000,000',
    location: 'Karen, Nairobi',
    bedrooms: 5,
    bathrooms: 4,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600',
    description: 'Stunning modern villa with panoramic views of Nairobi',
    type: 'sale',
    category: 'house',
    status: 'available',
    dateAdded: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Modern Apartment in Westlands',
    price: 'KES 120,000/month',
    location: 'Westlands, Nairobi',
    bedrooms: 3,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
    description: 'Contemporary apartment in prime location with amenities',
    type: 'rent',
    category: 'apartment',
    status: 'available',
    dateAdded: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Prime Land in Runda',
    price: 'KES 25,000,000',
    location: 'Runda, Nairobi',
    bedrooms: 0,
    bathrooms: 0,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600',
    description: 'Prime residential land in prestigious Runda estate',
    type: 'sale',
    category: 'land',
    status: 'available',
    dateAdded: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Commercial Space in CBD',
    price: 'KES 250,000/month',
    location: 'CBD, Nairobi',
    bedrooms: 0,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
    description: 'Prime office space in the heart of Nairobi',
    type: 'commercial',
    category: 'commercial',
    status: 'available',
    dateAdded: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Spacious House in Langata',
    price: 'KES 85,000/month',
    location: 'Langata, Nairobi',
    bedrooms: 4,
    bathrooms: 3,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600',
    description: 'Spacious family home with garden in quiet neighborhood',
    type: 'rent',
    category: 'house',
    status: 'available',
    dateAdded: new Date().toISOString()
  }
]

export const useProperties = () => {
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Load properties from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('abbahomes_properties')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setProperties(parsed)
      } catch (e) {
        setProperties(defaultProperties)
        localStorage.setItem('abbahomes_properties', JSON.stringify(defaultProperties))
      }
    } else {
      setProperties(defaultProperties)
      localStorage.setItem('abbahomes_properties', JSON.stringify(defaultProperties))
    }
    setIsLoading(false)
  }, [])

  // Save properties to localStorage whenever they change
  const saveProperties = (newProperties) => {
    setProperties(newProperties)
    localStorage.setItem('abbahomes_properties', JSON.stringify(newProperties))
  }

  // Add a new property
  const addProperty = (property) => {
    const newProperty = {
      ...property,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
      status: 'available'
    }
    const updated = [...properties, newProperty]
    saveProperties(updated)
    return newProperty
  }

  // Delete a property
  const deleteProperty = (id) => {
    const updated = properties.filter(p => p.id !== id)
    saveProperties(updated)
  }

  // Update a property
  const updateProperty = (id, updates) => {
    const updated = properties.map(p => 
      p.id === id ? { ...p, ...updates } : p
    )
    saveProperties(updated)
  }

  // Get properties by category
  const getByCategory = (category) => {
    return properties.filter(p => p.category === category)
  }

  // Get properties by type (sale/rent/commercial)
  const getByType = (type) => {
    return properties.filter(p => p.type === type)
  }

  // Get featured properties (first 3 for homepage)
  const getFeatured = () => {
    return properties.slice(0, 3)
  }

  return {
    properties,
    isLoading,
    addProperty,
    deleteProperty,
    updateProperty,
    getByCategory,
    getByType,
    getFeatured
  }
}
