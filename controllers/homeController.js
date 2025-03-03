import { getFiles } from '../services/storageService.js'

export const getHomePage = async (req, res) => {
  let files = []
  try {
    if (req.isAuthenticated()) {
      // Get user's files if authenticated
      files = await getFiles(req.user.id)

      res.render('home', {
        user: req.user,
        files,
      })
    } else {
      res.render('home', {
        user: null,
        files,
      })
    }
  } catch (error) {
    console.error('Error fetching home page:', error)
    res.status(500).render('home', {
      user: req.isAuthenticated() ? req.user : null,
      files,
      error: 'Failed to load files',
    })
  }
}
