const router = require('express').Router()
const User = require('../models/user')
const Post = require('../models/post')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

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
        res.status(401).json("You are not authenticated")
    }
}



// UPDATE
router.put('/:id', verify ,async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updateduser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },{new:true})
            res.status(200).json(updateduser)

        } catch (err) {
            res.status(500).json(err)
        }
        
    } else {
        res.status(401).json("You can only update your account!")
    }
})




// DELETE
router.delete('/delete/:id', verify , async (req, res) => {
    if (req.body.id === req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            try {
                await Post.deleteMany({username: user.username})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("User has been deleted...")

            }  catch (err){
                res.status(500).json(err)
            }
        }  catch (err) {
            res.status(404).json("User not found")
        }
    } else {
        res.status(401).json("You can only delete your account!")
    }

})
      

// GET USER 

router.get('/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router