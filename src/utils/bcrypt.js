import bcrypt from 'bcrypt'

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(process.env.SALT))

const passwordE = (createHash("pruebapassword"))
console.log(passwordE)

export const validatePassword = (passwordSend, passwordBdd) => bcrypt.compareSync(passwordSend, passwordBdd)

console.log(validatePassword("pruebapassword",passwordE))