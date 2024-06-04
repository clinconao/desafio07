import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "claudiotestingcoder@gmail.com",
        pass: ""
    }
})

const sendEmailChangePassword = async (email) => {
    const mailOption = {
        from: "claudiotestingcoder@gmail.com",
        to: email,
        subject: "Recuperación de email",
        text:
        `
        haz click en el siguiente enlance para cambiar tu password: ${linkChangePassword}
        `,
        html:
        `
        <p>Haz click aquí para cambiar tu constraseña: <p> <a href=${linkChangePassword}>Cambiar contraseña</a>
        `
    }
}