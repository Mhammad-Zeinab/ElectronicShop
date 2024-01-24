const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter a name'],
        },  

        lastname: {
            type: String,
            required: [true, 'Please enter a lastname'],
        },

        email: {
            type: String,
            required: [true, 'Please enter an email'],
            unique: true
        },

        password:{
            type: String,
            required: [true, 'Please enter a password'],
        },

        userType:{
            type: String,
            enum: ['User','Admin'], 
            required:true
        },

        phone:{
            type: String,
            required: true
        }
    },

    {
        timestamps: true
    }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;