const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
        required: false,
    },
    read_count: {
        type: Number,
        default: 0
      
    },
    reading_time: Number,
  
    tags: [String],
      
    body: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: [ 'draft','published' ],
        default: 'draft',
    },

},
  { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)