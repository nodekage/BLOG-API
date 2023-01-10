const express = require('express')
// const bodyParser = require('body-parser')
// const jwt = require("jsonwebtoken")
const CONFIG = require("./config/config")

// ROUTES
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')
const pagination = require('./helpers/pagination')


require('./db/mongoDb').connectToMongoDB()

const app = express()

// Error Handler Middleware
app.use((err, req, res, next) => {
    console.log(err)
    const errStatus = err.status || 500
    res.status(errStatus).send(err.message)
    next()
})



app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(pagination)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/posts', postRoute)
app.use('/api/v1/categories', categoryRoute)



app.get('/', (req, res) => {
     res.send({ message: 'Welcome To The Blog!'})
})


app.listen(CONFIG.PORT, () => {
    console.log(`Server running on ${CONFIG.PORT}`)
})

