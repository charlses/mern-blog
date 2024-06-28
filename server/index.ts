import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserRoute from '@routes/user'
import AuthRoute from '@routes/auth'
import { CustomError } from '@utils/error'

dotenv.config()

const { MONGODB_URI, PORT = 8080, JWT_SECRET } = process.env

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in the environment variables.')
}

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables.')
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Database is connected')
  })
  .catch((err: Error) => {
    console.error('Error connecting to the database:', err)
  })

const app = express()

app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.use('/api', UserRoute)
app.use('/api/auth', AuthRoute)

// Middleware for error handling
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500
  const message = err.message || 'Internal Server Error'
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message
  })
})
