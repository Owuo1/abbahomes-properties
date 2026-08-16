// src/utils/r2Storage.js
import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'

// ✅ Your R2 configuration
const ACCOUNT_ID = 'a80f064c273702ebfd80a872ede1ef2e'
const ACCESS_KEY_ID = '4209fa4765e643879c4c02a466b45272'
const SECRET_ACCESS_KEY = '12ea1b014a746bff18dd74e706ffe8799a1dd68ac372dd24e5a6fe92dfc32865' // ⚠️ YOU MUST ADD THIS!
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
  // Remove data:image/jpeg;base64, prefix if present
  const base64String = base64.split(',')[1] || base64
  
  // Decode base64 to binary string
  const binaryString = atob(base64String)
  
  // Convert to Uint8Array
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes
}

// ✅ Upload image to R2 (browser-compatible)
export const uploadToR2 = async (base64Image, fileName) => {
  try {
    // Convert base64 to Uint8Array
    const imageData = base64ToUint8Array(base64Image)
    
    // Generate a unique file name
    const timestamp = Date.now()
    const cleanFileName = fileName.replace(/\s+/g, '-').toLowerCase()
    const key = `properties/${timestamp}-${cleanFileName}.jpg`

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: imageData, // ✅ Now using Uint8Array instead of Buffer
      ContentType: 'image/jpeg',
      CacheControl: 'public, max-age=31536000',
    })

    await r2Client.send(command)
    
    // Return the public URL
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
  testR2Connection
}
