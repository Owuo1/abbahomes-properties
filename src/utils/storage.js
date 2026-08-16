// src/utils/storage.js

const DB_NAME = 'AbbaHomesDB'
const STORE_NAME = 'properties'
const DB_VERSION = 2 // Incremented version for schema update

// Open IndexedDB connection
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    
    request.onerror = () => reject(request.error)
    
    request.onsuccess = () => resolve(request.result)
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result
      
      // Create object store with auto-incrementing key
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { 
          keyPath: 'id' 
        })
        // Create indexes for faster queries
        store.createIndex('category', 'category', { unique: false })
        store.createIndex('type', 'type', { unique: false })
        store.createIndex('status', 'status', { unique: false })
        store.createIndex('dateAdded', 'dateAdded', { unique: false })
        console.log('✅ IndexedDB store created successfully')
      }
    }
  })
}

// Save properties to IndexedDB
export const saveProperties = async (properties) => {
  try {
    const db = await openDB()
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    
    // Clear existing data
    await new Promise((resolve, reject) => {
      const clearRequest = store.clear()
      clearRequest.onsuccess = () => resolve()
      clearRequest.onerror = () => reject(clearRequest.error)
    })
    
    // Add all properties
    for (const prop of properties) {
      await new Promise((resolve, reject) => {
        const addRequest = store.add(prop)
        addRequest.onsuccess = () => resolve()
        addRequest.onerror = () => reject(addRequest.error)
      })
    }
    
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  } catch (error) {
    console.error('IndexedDB save failed:', error)
    // Fallback to localStorage if IndexedDB fails
    try {
      localStorage.setItem('abbahomes_properties', JSON.stringify(properties))
    } catch (e) {
      console.error('localStorage fallback also failed:', e)
      throw new Error('Failed to save properties to any storage')
    }
  }
}

// Load properties from IndexedDB
export const loadProperties = async () => {
  try {
    const db = await openDB()
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const request = store.getAll()
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || [])
      request.onerror = () => reject(request.error)
    })
  } catch (error) {
    console.error('IndexedDB load failed:', error)
    // Fallback to localStorage if IndexedDB fails
    try {
      const saved = localStorage.getItem('abbahomes_properties')
      return saved ? JSON.parse(saved) : null
    } catch (e) {
      console.error('localStorage fallback also failed:', e)
      return null
    }
  }
}

// Delete a single property
export const deleteProperty = async (id) => {
  try {
    const db = await openDB()
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    
    await new Promise((resolve, reject) => {
      const request = store.delete(id)
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  } catch (error) {
    console.error('Delete failed:', error)
    throw error
  }
}

// Get storage usage information
export const getStorageInfo = async () => {
  try {
    // Check if StorageManager API is available
    if (navigator.storage && navigator.storage.estimate) {
      const estimate = await navigator.storage.estimate()
      return {
        usage: estimate.usage || 0,
        quota: estimate.quota || 0,
        usageMB: ((estimate.usage || 0) / (1024 * 1024)).toFixed(2),
        quotaMB: ((estimate.quota || 0) / (1024 * 1024)).toFixed(2),
        percentage: ((estimate.usage || 0) / (estimate.quota || 1) * 100).toFixed(1)
      }
    }
    return { usage: 0, quota: 0, usageMB: '0', quotaMB: '0', percentage: '0' }
  } catch (error) {
    console.error('Storage info failed:', error)
    return null
  }
}

// Check if IndexedDB is available
export const isIndexedDBAvailable = () => {
  try {
    return 'indexedDB' in window && indexedDB !== null
  } catch {
    return false
  }
}
