import express from "express"
import mongoose from "mongoose"
import messageModel from "./models/messages.js"
import indexRouter from "./routes/indexRouter.js"
import initializePassport from "./config/passport/passport.js"

import cookieParser from "cookie-parser"
import session from "express-session"
import passport from "passport"

import MongoStore from "connect-mongo"

import { Server } from "socket.io"
import { __dirname } from './path.js'
import { engine } from "express-handlebars"
import varenv from "./dotenv.js"

// declaraciones

const app = express()
const PORT = 8080


// por acá el server
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

const io = new Server(server)

// Connection DB
mongoose.connect(varenv.mongo_url)
.then(() => console.log("DB is connected"))
.catch(e => console.log(e))

// middlewares
app.use(express.json())

app.use(session({
    secret:varenv.session_secret,
    resave: true,
    store: MongoStore.create({
        mongoUrl: varenv.mongo_url,
        ttl: 60 * 60
    }),
    saveUninitialized: true
}))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')
app.use(cookieParser(varenv.cookies_secret))
app.use('/',indexRouter)

// passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())


// routes cookies
app.get('/setCookie', (req, res) => {
    res.cookie('CookieCookie', 'Prueba de cookie', {maxAge: 200000, signed: true}).send("Cookie listoco")
})

app.get('/getCookie', (req, res) => {
    res.send(req.signedCookies)
})

app.get('/deleteCookie', (req, res) => {
    res.clearCookie('CookieCookie').send("Cookie eliminada")
})

// session routes

app.get('/session', (req, res)=>{
    if (req.session.counter) {
        req.session.counter++
        res.send(`Eres el usuario N ${req.session.counter} en ingresar a la pagina`)
    } else {
        req.session.counter = 1
        res.send("Eres el primero que ingresa a la pagina")
    }
})

app.post('/login', (req, res) => {
    const { email, password } = req.body

    if (email == "admin@admin.com" && password == "1234") {
        req.session.email = email
        req.session.password = password


    }
    console.log(req.session)
    res.send("Login")
})

io.on('conection', (socket) => {
    console.log("Conexion con Socket.io")

    socket.on('mensaje', async (mensaje) => {
        try {
            await messageModel.create(mensaje)
            const mensajes = await messageModel.find()
            io.emit('mensajeLogs', mensajes)
        } catch (error) {
            io.emit('mensajeLogs', error)
            req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        res.status(500).send(e)
            req.logger.error("ERROR")
        }

    })
})


