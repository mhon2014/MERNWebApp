const joi = require('joi');

const signUp = joi.object().keys({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(), 
    password: joi.string().required()
});

const signIn = joi.object().keys({
    email: joi.string().email().required(), 
    password: joi.string().required()
});


module.exports = {signUp, signIn};