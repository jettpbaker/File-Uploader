import bcrypt from 'bcryptjs'
import passport from 'passport'
import { createUser } from '../services/authService.js'

export const getSignup = (req, res) => {
  res.render('signup')
}

export const getLogin = (req, res) => {
  res.render('login')
}

export const getLogout = (req, res) => {
  res.render('logout')
}

export const postSignup = async (req, res) => {
  try {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await createUser(username, hashedPassword)

    req.login(user, (err) => {
      if (err) {
        return next(err)
      }
      res.redirect('/')
    })
  } catch (error) {
    console.error(error)
    res.redirect('/auth/signup')
  }
}

export const postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })(req, res, next)
}

export const postLogout = (req, res) => {
  req.logout()
  res.redirect('/')
}
