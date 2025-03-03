import upload from '../config/multer.js'
import { addFile, deleteFile, getFileById } from '../services/storageService.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const getUpload = (req, res, next) => {
  res.render('upload')
}

export const getFile = async (req, res, next) => {
  const id = Number(req.params.id)
  const file = await getFileById(id)

  const pathLocation = path.join(__dirname, '../uploads', path.basename(file.location))
  res.sendFile(pathLocation)
}

export const getDownload = async (req, res, next) => {
  const id = Number(req.params.id)
  const file = await getFileById(id)
  const pathLocation = path.join(__dirname, '../uploads', path.basename(file.location))

  res.download(pathLocation)
}

export const postUploadFile = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    try {
      addFile(req.file, req.user.id)
      res.redirect('/')
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  })
}

export const postDeleteFile = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const file = await getFileById(id)

    if (!file) {
      return res.status(404).json({ error: 'File not found' })
    }

    const pathLocation = path.join(__dirname, '../uploads', path.basename(file.location))

    await deleteFile(id)

    fs.unlink(pathLocation, (err) => {
      if (err) {
        console.error('Error deleting file:', err)
      }
      res.redirect('/')
    })
  } catch (error) {
    console.error('Error in postDeleteFile:', error)
    res.status(500).json({ error: error.message })
  }
}
