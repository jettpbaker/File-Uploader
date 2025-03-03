import express from 'express'
import * as fileController from '../controllers/fileController.js'
import { isAuthenticated } from '../middleware/auth.js'

const router = express.Router()

// Apply authentication middleware to all storage routes
router.use(isAuthenticated)

// Get routes
router.get('/upload', fileController.getUpload)
router.get('/download/:id', fileController.getDownload)
router.get('/file/:id', fileController.getFile)

// Post routes
router.post('/upload', fileController.postUploadFile)
router.post('/delete/:id', fileController.postDeleteFile)
export default router
