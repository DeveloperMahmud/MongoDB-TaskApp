const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        minlength: 1,
        maxlength: 2,
        validate(value){
            if( value < 18){
                throw new Error(`Age Cannot be less than 18 Years`);
            }
        },
        
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(`Email is not Valid`);
            }
        },
    },
    password: {
        type: String,
        required:true,
        trim: true,
    },
});

const User = mongoose.model('User',userSchema);

module.exports = User;