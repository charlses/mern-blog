import express from 'express'
import { signUp, signIn } from '../controllers/auth.controller.js'

const AuthRoute = express.Router()

AuthRoute.post('/sign-up', signUp)
AuthRoute.post('/sign-in', signIn)

export default AuthRoute
