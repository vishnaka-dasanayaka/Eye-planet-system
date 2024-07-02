const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please add first name']
        },

        lastName: {
            type: String,
            required: [true, 'Please add last name']
        },

        contactNumber: {
            type: String,
            required: [true, 'Please add a contact number']
        },

        address: {
            type: String,
            required: [true, 'Please add the address']
        },

        email: {
            type: String,
            required: [true, 'Please add the email']
        },

        password: {
            type: String,
            required: [true, 'Please add a password']
        },

        role: {
            type: String,
            default: 'user'
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        pic: {
            type: String,
            default: ""
        }

    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)