const joi = require("joi")

const addPostSchema = joi.object ({

    title : joi.string() 
        .min(2)
        .max(256)
        .required()
        .trim(),
    description : joi.string()
        .min(10)
        .max(150)
        .required()
        .trim(),
    username : joi.string()
        .min(5)
        .max(100)
        .required(),
    categoroies : joi.array(),
    body : joi.string()
        .min(5)
        .max(250)
        .required()
        .trim(),
    state : joi.string()
        .default('Draft')
    
})

async function addPostValidationMw(req, res, next) {
    const postPayLoad = req.body

    try {
        await addPostSchema.validateAsync(postPayLoad)
        next()
    } catch (error) {
        next({
            message : error.details[0].message,
            status : 400
        })
    }
}

const updatePostSchema = joi.object ({

    title : joi.string() 
        .min(2)
        .max(256)
        .trim(),
    description : joi.string()
        .min(10)
        .max(150)
        .trim(),
    username : joi.string()
        .min(5)
        .max(100),
    categoroies : joi.array(),
    body : joi.string()
        .min(5)
        .max(250)
        .trim(),
    state : joi.string()
        .default('Draft')
    
})

async function updatePostValidationMw(req, res, next) {
    const postPayLoad = req.body

    try {
        await updatePostSchema.validateAsync(postPayLoad)
        next()
    } catch (error) {
        next({
            message : error.details[0].message,
            status : 400
        })
    }
}

module.exports = {
    addPostValidationMw,
    updatePostValidationMw
}