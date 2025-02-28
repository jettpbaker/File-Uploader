import express from 'express'
import passport from 'passport'
import * as authController from '../controllers/authController.js'

const router = express.Router()

// Get routes
router.get('/signup', authController.getSignup)
router.get('/login', authController.getLogin)
router.get('/logout', authController.getLogout)

// Post routes
router.post('/signup', authController.postSignup)
router.post('/login', authController.postLogin)
router.post('/logout', authController.postLogout)

export default router
