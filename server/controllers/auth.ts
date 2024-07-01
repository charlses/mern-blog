import { Request, Response, NextFunction } from 'express'
import User from '@models/user'
import bcrypt from 'bcryptjs'
import { errorHandler } from '@utils/error'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

interface AuthRequestBody {
  firstname?: string
  lastname?: string
  email: string
  password: string
}

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstname, lastname, email, password } = req.body as AuthRequestBody

  if (!firstname || !lastname || !email || !password) {
    return next(errorHandler(400, 'All fields are required'))
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return next(errorHandler(400, 'User already exists'))
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = new User({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: hashedPassword
    })

    await newUser.save()
    res
      .status(201)
      .json({ message: 'User created successfully!', data: newUser })
  } catch (error) {
    next(errorHandler(500, 'Internal Server Error'))
  }
}

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body as AuthRequestBody

  if (!email || !password) {
    return next(errorHandler(400, 'All fields are required'))
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (!existingUser) {
      return next(errorHandler(400, 'User does not exist'))
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    )
    if (!isPasswordCorrect) {
      return next(errorHandler(400, 'Invalid credentials'))
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        role: existingUser.role
      },
      JWT_SECRET!,
      { expiresIn: '1h' }
    )

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000
      })
      .json({
        message: 'User signed in successfully',
        data: { ...existingUser._doc, password: '' }
      })
  } catch (error) {
    next(errorHandler(500, 'Internal Server Error'))
  }
}

export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, image } = req.body
  console.log('Received data:', { name, email, image })

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() })

    if (existingUser) {
      const token = jwt.sign(
        {
          userId: existingUser._id,
          email: existingUser.email,
          role: existingUser.role
        },
        JWT_SECRET!,
        { expiresIn: '1h' }
      )

      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
          secure: true,
          maxAge: 3600000
        })
        .json({
          success: true,
          message: 'User signed in successfully',
          data: { ...existingUser._doc, password: '' }
        })
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8)
      const hashedPassword = await bcrypt.hash(generatedPassword, 12)

      const newUser = new User({
        firstname: name.split(' ')[0],
        lastname: name.split(' ')[1],
        email: email.toLowerCase(),
        password: hashedPassword,
        image
      })

      await newUser.save()
      const token = jwt.sign(
        {
          userId: newUser._id,
          email: newUser.email,
          role: newUser.role
        },
        JWT_SECRET!,
        { expiresIn: '1h' }
      )

      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
          secure: true,
          maxAge: 3600000
        })
        .json({
          success: true,
          message: 'User signed in successfully',
          data: { ...newUser._doc, password: '' }
        })
    }
  } catch (error) {
    console.log('Error during Google Auth:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
    next(errorHandler(500, 'Internal Server Error'))
  }
}

export const githubAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, image } = req.body
  console.log('Received data:', { name, email, image })

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() })

    if (existingUser) {
      const token = jwt.sign(
        {
          userId: existingUser._id,
          email: existingUser.email,
          role: existingUser.role
        },
        JWT_SECRET!,
        { expiresIn: '1h' }
      )

      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
          secure: true,
          maxAge: 3600000
        })
        .json({
          success: true,
          message: 'User signed in successfully',
          data: { ...existingUser._doc, password: '' }
        })
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8)

      const hashedPassword = await bcrypt.hash(generatedPassword, 12)

      // Creating a new user if none exists in the database
      const newUser = new User({
        firstname: name.split(' ')[0] || name,
        lastname: name.split(' ')[1] || name,
        email: email.toLowerCase(),
        password: hashedPassword,
        image
      })

      await newUser.save()

      // Signing the new user with jwt token
      const token = jwt.sign(
        {
          userId: newUser._id,
          email: newUser.email,
          role: newUser.role
        },
        JWT_SECRET!,
        { expiresIn: '1h' }
      )
      //sending response with access_token cookie
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
          secure: true,
          maxAge: 3600000
        })
        .json({
          success: true,
          message: 'User signed in successfully',
          data: { ...newUser._doc, password: '' }
        })
    }
  } catch (error) {
    console.log('Error during Github Auth:', error)
    next(errorHandler(500, 'Internal Server Error'))
  }
}

export const signOut = (req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json({ success: true, mesasge: 'Use has been signed out' })
  } catch (error) {
    next(error)
  }
}
