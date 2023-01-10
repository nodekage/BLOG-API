const router = require('express').Router()
const jwt = require("jsonwebtoken")
const User = require('../models/user')
const bcrypt = require('bcrypt')
require('dotenv').config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

// REGISTER
router.post('/register', async (req, res) => {
    try {

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })

        const user = await newUser.save();
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json(err)
    }
})



// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if (!user) {
            res.status(400).json("Wrong Credentials")
        }else {
            const validated = await bcrypt.compare(req.body.password, user.password)
            if (!validated) {
                res.status(400).json("Wrong Credentials!")
            }else {
                const { password, ...others } = user._doc

                // GENERATE ACCESS TOKEN

                const accessToken = jwt.sign({ id: user._doc._id}, JWT_SECRET_KEY, { expiresIn: "1hr"})
                res.status(200).json({accessToken})
            }


        }
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router