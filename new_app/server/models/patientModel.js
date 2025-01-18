const mongoose = require('mongoose')

const patientSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        orders: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Order'

        },

        name: {
            type: String,
            required: [true, 'Please add a name']
        },
        contactNumber: {
            type: String,
            required: [true, 'Please add a contact number']
        },
        dob: {
            type: Date,
            required: [true, 'Please add the date of birth']
        },
        address: {
            type: String,
        },
        status: {
            type: String,
            default: 'active'
        },
        history: {
            type: [String]
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Patient', patientSchema)