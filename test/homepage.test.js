const express = require('express')
const request = require('supertest')
const server = require('../server')

const app = express()

app.use(express.json())


describe ("Homepage Working", () => {

    it("Load home page", async () => {

       const {body ,statusCode} =  await request(app).get("/home")

       expect(body).toEqual({
         message: 'Welcome To The Blog!'
        })
    })
})