import mongoose from "mongoose";
import userModel from "../src/dao/models/User.js";
import Assert from 'assert'

const assert = Assert.strict

await mongoose.connect(`mongodb+srv://cllinconao:@cluster0.od9skcq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

describe('Test CRUD de usuarios en la ruta /api/users', function () {

    //Previo a comenzar todo el test
    before(() => {
        console.log("Arrancando el test")
    })

    //Previo a comenzar cada test individual
    beforeEach(() => {
        console.log("Comienza el test!")
    })

    it('Obtener todos los usuarios mediante el metodo GET', async () => {
        const users = await userModel.find()

        assert.strictEqual(Array.isArray(users), true)
    })

    it('Obtener un usuario dado su id mediante el metodo GET', async () => {
        const user = await userModel.findById('660bab5d55eed210970c035f')
        //assert.strictEqual(typeof user, 'object')
        assert.ok(user._id)
    })

    it('Crear un usuario mediante el metodo POST', async () => {
        const newUser = {
            first_name: "Leonor",
            last_name: "Lopez",
            email: "leo@leo.com",
            password: "1234",
            age: 30
        }

        const userCreated = await userModel.create(newUser)

        assert.ok(userCreated._id)
    })

    it('Actualizar un usuario dado un id como parametro mediante el metodo PUT', async () => {
        const updateUser = {
            first_name: "Benito",
            last_name: "Benitez",
            email: "beno@beno.com",
            password: "1234",
            age: 30
        }

        const userUpdated = await userModel.findByIdAndUpdate('660bab5d55eed210970c035f', updateUser)
        assert.ok(userUpdated._id)
    })

    it('Eliminar un usuario dado un id como parametro mediante el metodo DELETE', async () => {

        const rta = await userModel.findByIdAndDelete('660bab5d55eed210970c035f')
        assert.strictEqual(typeof rta, 'object')
    })


})