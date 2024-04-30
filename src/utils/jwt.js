import jwt from 'jsonwebtoken'

export const generateToken = (user) => {


    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '12h' })
    return token
}

console.log(generateToken({
    "_id": "65fb7dbb4c863f6027e6da4b",
    "first_name": "Maria",
    "last_name": "Martinez",
    "password": "$2b$12$tdojC3W4n5vLWcqV0qJaEuIwAyFZdmAMWjmZwvvxLzaUwm/5idTNG",
    "age": 30,
    "email": "adminCoder@coder.com",
    "rol": "User",
    "__v": 0
}))