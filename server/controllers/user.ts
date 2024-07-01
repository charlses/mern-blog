import { errorHandler } from '@utils/error'
import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '@models/user'

export const test = async (req: Request, res: Response) => {
  const data = await User.find({ email: 'davit.tavadzee@gmail.com' })

  res.status(200).json({ data })
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.userId !== req.params.userId) {
    next(errorHandler(403, 'You are not allowed to update this user'))
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'))
    }
    req.body.password = await bcrypt.hash(req.body.password, 12)
  }

  if (req.body.email) {
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase()
    }
  }

  if (req.body.firstname) {
    if (!/^[a-zA-Z]+$/.test(req.body.firstname)) {
      return next(errorHandler(400, 'First name must contain only letters'))
    }
  }

  if (req.body.lastname) {
    if (!/^[a-zA-Z]+$/.test(req.body.lastname)) {
      return next(errorHandler(400, 'Last name must contain only letters'))
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          image: req.body.image,
          password: req.body.password
        }
      },
      { new: true }
    )
    if (!updatedUser) {
      return next(errorHandler(404, 'User not found'))
    }

    const { password, ...rest } = updatedUser._doc

    res.status(200).json({ data: rest, message: 'User updated successfully!' })
  } catch (error) {
    next(errorHandler(500, 'Internal Server Error!'))
  }
}
