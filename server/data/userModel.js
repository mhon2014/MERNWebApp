const mongoose = require('mongoose');
const bcrypt= require('bcrypt');

const {Schema} = mongoose;

const userSchema = new Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required: true, unique:true},
    password:{type:String, required: true},
    moviesList:{type: Array, default:[]}
})

// userSchema.methods.authenticate = async function(password) {
//     console.log(this.password)
//     return await bcrypt.compare(password, this.password)
// }


// userSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();

//     const salt = await bcrypt.genSalt(10)

//     this.password = await bcrypt.hash(this.password, salt)

// })

const userModel = mongoose.model('users', userSchema)

module.exports = userModel;