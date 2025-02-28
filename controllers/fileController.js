import upload from '../config/multer.js'
import { addFile } from '../services/storageService.js'

export const getUpload = (req, res, next) => {
  res.render('upload')
}

export const postUploadFile = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      // Handle multer error (e.g., file too large, etc.)
      return res.status(500).json({ error: err.message })
    }

    // Access the uploaded file information in req.file
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    try {
      // Add file after multer has processed it
      addFile(req.file, req.user.id)
      res.redirect('/')
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  })
}
