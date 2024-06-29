import express from 'express'
import { test, updateUser } from '@controllers/user'
import { verifyToken } from '@utils/verifyAuth'

const router = express.Router()

router.get('/test', test)
router.put('/users/:userId', verifyToken, updateUser)

export default router
