import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const signUp = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    firstname === '' ||
    lastname === '' ||
    email === '' ||
    password === ''
  ) {
    return next(errorHandler(400, 'All fields are required'))
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() })

  if (existingUser) {
    return next(errorHandler(400, 'User already exists'))
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  try {
    const newUser = await new User({
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
    next(error)
  }
}

export const signIn = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password || email === '' || password === '') {
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
      process.env.JWT_SECRET,
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
    return next(error)
  }
}

export const googleAuth = async (req, res, next) => {
  const { name, email, image } = req.body
  console.log('Received data:', { name, email, image }) // Added log
  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() })

    if (existingUser) {
      const token = jwt.sign(
        {
          userId: existingUser._id,
          email: existingUser.email,
          role: existingUser.role
        },
        process.env.JWT_SECRET,
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
        image: image
      })

      await newUser.save()
      res.status(201).json({
        success: true,
        message: 'User created successfully!',
        data: newUser
      })
    }
  } catch (error) {
    console.log('Error during Google Auth:', error) // Added log
    res.status(500).json({ success: false, message: 'Internal server error' })
    next(error)
  }
}
