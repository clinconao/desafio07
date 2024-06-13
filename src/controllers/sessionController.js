import passport from "passport";
import { userModel } from "../models/user.js";
import { sendEmailChangePassword } from "../utils/nodemailer.js";
import jwt from 'jsonwebtoken'
import { validatePassword } from "../utils/bcrypt.js"; 

export const login = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send("Usuario o contraseña no validos")
        }

        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        }

        res.status(200).send("Usuario logueado correctamente")

    } catch (e) {
        res.status(500).send("Error al loguear usuario")
    }
}

export const register = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).send("Usuario ya existente en la aplicacion")
        }

        res.status(200).send("Usuario creado correctamente")

    } catch (e) {
        res.status(500).send("Error al registrar usuario")
    }

}

export const logout = async (req, res) => {
    req.session.destroy(function (e) {
        if (e) {
            console.log(e)
        } else {
            res.status(200).redirect("/")
        }

    })

}

export const sessionGithub = async (req, res) => {
    console.log(req)
    req.session.user = {
        email: req.user.email,
        first_name: req.user.name
    }
    res.redirect('/')

}

export const testJWT = async (req, res) => {
    console.log("Desde testJWT" + req.user)
    if (req.user.rol == 'User')
        res.status(403).send("Usuario no autorizado")
    else
        res.status(200).send(req.user)
}

export const changePassword = async (req, res) => {
    const { token } = req.params
    const { newPassword } = req.body
}

export const sendEmailPassword = async (req, res) => {

    try {
        const { email } = req.body
        const user = await userModel.find({ email: email })
        if (user) {
            const token = jwt.sign({userEmail: email}, "coder", {expireIn: '1h'})
            const resetLink = `http://localhost:8080/api/session/reset-password?token=${token}`
            sendEmailChangePassword(email, resetLink)
            res.status(200).send("Email enviado correctamente")
        } else {
            res.status(404).send("Usuario no encontrado")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}