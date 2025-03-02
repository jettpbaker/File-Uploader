import express from 'express'
import { fileURLToPath } from 'url'
import passport from 'passport'
import session from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { PrismaClient } from '@prisma/client'
import path from 'path'
import authRoutes from './routes/authRoutes.js'
import storageRoutes from './routes/storageRoutes.js'
import pageRoutes from './routes/pageRoutes.js'
import passportConfig from './config/passport.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const sessionStore = new PrismaSessionStore(new PrismaClient(), {
  checkPeriod: 2 * 60 * 1000, //ms
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
})

app.use(
  session({
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// Authentication routes
app.use('/auth', authRoutes)
// Storage routes
app.use('/storage', storageRoutes)
// Page routes (including home)
app.use('/', pageRoutes)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
