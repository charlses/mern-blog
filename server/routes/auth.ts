import express from 'express'
import { signUp, signIn, googleAuth } from '@controllers/auth'

const AuthRoute = express.Router()

AuthRoute.post('/sign-up', signUp)
AuthRoute.post('/sign-in', signIn)
AuthRoute.post('/google', googleAuth)

export default AuthRoute
