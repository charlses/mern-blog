import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { errorHandler } from '../utils/error.js'

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
