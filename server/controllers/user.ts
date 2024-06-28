import { Request, Response } from 'express'

export const test = (req: Request, res: Response) => {
  res
    .status(201)
    .json({ message: 'User created successfully!', data: 'Bla bla bla' })
}
