// lets create our validation Schema
const Joi = require('@hapi/joi');

// Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    
    });

    return schema.validate({
        name: data.name,
        email: data.email,
        password: data.password
    });
}

// Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate({
        email: data.email,
        password: data.password,
    });
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
