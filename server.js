const express = require('express')
// const jwt = require("jsonwebtoken")
const authRoute = require('./src/routes/auth')
const userRoute = require('./src/routes/users')
const postRoute = require('./src/routes/posts')
const categoryRoute = require('./src/routes/categories')
const pagination = require('./src/helpers/pagination')


require('dotenv').config()
require('./db').connectToMongoDB()

const app = express()
PORT = process.env.PORT || 5000

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(pagination)
app.use('/auth', authRoute)
app.use('/users', userRoute)
app.use('/posts', postRoute)
app.use('/categories', categoryRoute)



app.get('/', (req, res) => {
     res.send({ message: 'Welcome To The Blog!'})
})


app.listen(PORT, () => {
    console.log("backes running", PORT)
})

