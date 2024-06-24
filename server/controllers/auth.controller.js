import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const signUp = async (req, res) => {
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
    return res.status(400).json({ message: 'All fields are required!' })
  }

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists!' })
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  try {
    const newUser = await new User({
      firstname,
      lastname,
      email,
      password: hashedPassword
    })

    await newUser.save()
    res.status(201).json({ message: 'User created successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}
