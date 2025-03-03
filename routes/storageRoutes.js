import express from 'express'
import * as fileController from '../controllers/fileController.js'

const router = express.Router()

// Get routes
router.get('/upload', fileController.getUpload)
router.get('/download/:id', fileController.getDownload)

// Post routes
router.post('/upload', fileController.postUploadFile)
router.post('/delete/:id', fileController.postDeleteFile)
export default router
