import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const { MONGODB_URI, PORT = 8080 } = process.env

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in the environment variables.')
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Database is connected')
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err)
  })

const app = express()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
