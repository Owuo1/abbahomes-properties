// src/utils/r2Storage.js
import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'

// ✅ Your R2 configuration
const ACCOUNT_ID = 'a80f064c273702ebfd80a872ede1ef2e'
const ACCESS_KEY_ID = '4209fa4765e643879c4c02a466b45272'
const SECRET_ACCESS_KEY = '12ea1b014a746bff18dd74e706ffe8799a1dd68ac372dd24e5a6fe92dfc32865'
const BUCKET_NAME = 'abbahomes-properties'
const PUBLIC_URL = 'https://pub-991ab861d8204032a361de56a8bdf026.r2.dev'

// Configure R2 client
const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
})

// ✅ Convert base64 to Uint8Array (browser-compatible)
const base64ToUint8Array = (base64) => {
  const base64String = base64.split(',')[1] || base64
  const binaryString = atob(base64String)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes
}

// ✅ Upload image to R2
export const uploadToR2 = async (base64Image, fileName) => {
  try {
    const imageData = base64ToUint8Array(base64Image)
    const timestamp = Date.now()
    const cleanFileName = fileName.replace(/\s+/g, '-').toLowerCase()
    const key = `properties/${timestamp}-${cleanFileName}.jpg`

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: imageData,
      ContentType: 'image/jpeg',
      CacheControl: 'public, max-age=31536000',
    })

    await r2Client.send(command)
    return `${PUBLIC_URL}/${key}`
  } catch (error) {
    console.error('R2 upload failed:', error)
    throw new Error('Failed to upload image to storage')
  }
}

// ✅ Delete image from R2
export const deleteFromR2 = async (imageUrl) => {
  try {
    const key = imageUrl.split(`${PUBLIC_URL}/`)[1]
    if (!key) return

    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })
    await r2Client.send(command)
  } catch (error) {
    console.error('R2 delete failed:', error)
  }
}

// ✅ ===== NEW: Store properties metadata in R2 =====

// Save properties data to R2 as JSON
export const savePropertiesToR2 = async (properties) => {
  try {
    const metadata = JSON.stringify(properties)
    const encoder = new TextEncoder()
    const data = encoder.encode(metadata)
    const key = 'properties-data.json'

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: data,
      ContentType: 'application/json',
      CacheControl: 'public, max-age=3600', // Cache for 1 hour
    })

    await r2Client.send(command)
    console.log('✅ Properties data saved to R2:', properties.length, 'properties')
    return true
  } catch (error) {
    console.error('❌ Failed to save properties data to R2:', error)
    throw error
  }
}

// Load properties data from R2
export const loadPropertiesFromR2 = async () => {
  try {
    const key = 'properties-data.json'
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })
    
    const response = await r2Client.send(command)
    const text = await response.Body.transformToString()
    const data = JSON.parse(text)
    console.log('✅ Properties data loaded from R2:', data.length, 'properties')
    return data
  } catch (error) {
    // If file doesn't exist, return null (first time setup)
    if (error.name === 'NoSuchKey') {
      console.log('ℹ️ No properties data found in R2 (first time setup)')
      return null
    }
    console.error('❌ Failed to load properties data from R2:', error)
    return null
  }
}

// ✅ Test connection
export const testR2Connection = async () => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      MaxKeys: 1,
    })
    await r2Client.send(command)
    return true
  } catch (error) {
    console.error('R2 connection test failed:', error)
    return false
  }
}

export default {
  uploadToR2,
  deleteFromR2,
  savePropertiesToR2,
  loadPropertiesFromR2,
  testR2Connection
}
