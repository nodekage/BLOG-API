const mongoose = require('mongoose')
require('dotenv').config()

const MONGODB_URL = process.env.MONGO_URL

// connect to mongodb
function connectToMongoDB() {
    mongoose.connect(MONGODB_URL)

    mongoose.connection.on('connected', () => {
        console.log('MongoDb Connection Successful ')
    })

    mongoose.connection.on('error', (err) => {
        console.log('An error occured', err)
    })
}

module.exports =  {connectToMongoDB }

