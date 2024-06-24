import express from 'express'
import { signUp } from '../controllers/auth.controller.js'

const AuthRoute = express.Router()

AuthRoute.post('/sign-up', signUp)

export default AuthRoute
