import express from 'express'
import * as fileController from '../controllers/fileController.js'

const router = express.Router()

// Get routes
router.get('/upload', fileController.getUpload)

// Post routes
router.post('/upload', fileController.postUploadFile)

export default router
