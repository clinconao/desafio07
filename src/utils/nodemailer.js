import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "claudiotestingcoder@gmail.com",
        pass: ""
    }
})

export const sendEmailChangePassword = async (email, linkChangePassword) => {
    const mailOption = {
        from: "claudiotestingcoder@gmail.com",
        to: email,
        subject: "Recuperación de password",
        html:
        `
        <p>Haz click aquí para cambiar tu constraseña: </p><button> <a href=${linkChangePassword}>Cambiar contraseña</a></button>
        `
    }
    transporter.sendMail(mailOption, (error, info)=>{
        if (error) {
            console.log("Error al enviar correo de cambio de contraseña")
        } else {
            console.log("Correo enviado correctamente", info.response)
        }
    })
}