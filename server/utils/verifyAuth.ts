import jwt from 'jsonwebtoken'
import { errorHandler } from '@utils/error'
import { Request, Response, NextFunction } from 'express'

declare global {
  namespace Express {
    interface Request {
      user?: any // Adjust 'any' to the type of your user object
    }
  }
}

interface UserPayload {
  userId: string
  email: string
  role: string
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies['access_token']
  if (!token) {
    console.log('no token found')
    return next(errorHandler(401, 'Unauthorized'))
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET!,
    (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) {
        return next(errorHandler(403, 'Forbidden'))
      }
      req.user = decoded as UserPayload
      next()
    }
  )
}
