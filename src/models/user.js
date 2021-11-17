
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Taks = require('./task');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be grater than 0')
            }
        }
    },
    password: {
        type: String,
        require: true,
        trim:true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain password')
            } 
        }
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
});

//create a virtual es uan relacion entre dos entidades, el primer argumento es algo que identifiques es virtual porque no es una moficiacion real a la base de datos 
userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password
    delete userObject.tokens
    return userObject;
}

userSchema.methods.genetareAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, 'itTook2.3secondsToEnumerate');
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error('Unable to login')
    }
    return user;
}

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
});

// Delete user tasks when user is remove
userSchema.pre('remove', async function(next){
    const user = this
    await Task.deleteMany({owner: user._id})
    next()
}) 

const User = mongoose.model('User', userSchema)



module.exports = User;