const router = require('express').Router()
const Post = require('../models/post')
const { estimatedReadingTime} = require('../helpers/readtime')
const jwt = require("jsonwebtoken")
const { addPostValidationMw , updatePostValidationMw } = require("../validators/post.validator")

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


const verify = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(" ")[1]

        jwt.verify(token, JWT_SECRET_KEY, (err) => {
            if (err) {
                return res.status(403).json("Token is not Valid")
            }
            next()
        })
    } else {
        res.status(401).json("You are not authenticated!")
    }
}



// CREATE POST
router.post('/create',verify, addPostValidationMw, async (req, res) => {
    const newPost = new Post({

        title : req.body.title,
        description: req.body.description || title,
        username: req.body.username,
        body : req.body.body,

    })
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (err){
        res.status(500).json(err)
    }
})



// UPDATE POST
router.put('/:id',verify, updatePostValidationMw, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                },{new: true}
                )
                res.status(200).json(updatedPost)
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You can only update your post!")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})


// DELETE POST

router.delete('/:id',verify, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.username === req.body.username) {
            try {
                await post.delete()
                res.status(200).json("Post has been deleted...")
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You can only delete your post!")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET POST BY ID
router.get('/:id', async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post) {
            post.read_count += 1
            post.save()
            res.status(200).json(post)
        } else {
            res.status(404).json("Post not Found")
        }
    }catch(err){
        res.status(500).json(err)
    }
})


// GET ALL POSTS
router.get('/', async (req,res) => {
    const username = req.query.user
    const catName = req.query.cat
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username })
        }else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName]
                }
            })
        } else {
            posts = await Post.find()
        }
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json(err)
    }
})



module.exports = router