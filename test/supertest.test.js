import chai from 'chai'
import mongoose from 'mongoose'
import supertest from 'supertest'
import __dirname from '../src/path.js'

const expect = chai.expect

await mongoose.connect(`mongodb+srv://cllinconao:@cluster0.od9skcq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

const requester = supertest('http://localhost:8080')

describe('Rutas de sesiones de usuarios (Register, Login y Current)', function () {
    let user = {}
    let cookie = {}

    it('Ruta: api/session/register con el metodo POST', async () => {
        const newUser = {
            first_name: "Federico",
            last_name: "Fernandez",
            email: "fefe@fefe.com",
            password: "fedefede",
            age: 34
        }

        const { _body, statusCode } = await requester.post('/api/sessions/register').send(newUser)
        user = _body?.payload
        user.password = newUser.password
        expect(statusCode).to.be.equal(200)

    })

    it('Ruta: api/session/login con el metodo POST', async () => {
        console.log(user)
        const result = await requester.post('/api/sessions/login').send(user)
        const cookieResult = result.headers['set-cookie'][0]

        cookie = {
            name: cookieResult.split("=")[0],
            value: cookieResult.split("=")[1].split(";")[0]
        }

        expect(cookie.name).to.be.ok.and.equal('coderCookie')
        expect(cookie.value).to.be.ok
    })

    it('Ruta: api/session/current con el metodo GET', async () => {

        const { _body } = await requester.get('/api/sessions/current')
            .set('Cookie', [`${cookie.name} = ${cookie.value}`])

        console.log(_body.payload)

        expect(_body.payload.email).to.be.equal(user.email)
    })

})
