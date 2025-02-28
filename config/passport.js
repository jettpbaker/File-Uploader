import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcryptjs'
import { getUserByUsername, getUserById } from '../services/authService.js'

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await getUserByUsername(username)
      if (!user) {
        return done(null, false, { message: 'Incorrect username!' })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return done(null, false, { message: 'Incorrect password.' })
      }

      return done(null, user)
    } catch (error) {
      return done(error)
    }
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})

export default passport
