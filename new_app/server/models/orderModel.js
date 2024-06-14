const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Patient'
        },
        // prescriptions: {
        //     type: [mongoose.Schema.Types.ObjectId],
        //     required: true,
        //     ref: 'Prescriptions'
        // },
        date: {
            type: Date,
            required: true
        },
        branch: {
            type: String,
            required: true
        },
        orderNumber: {
            type: String,
            required: true
        },
        billNumber: {
            type: String,
            required: true
        },
        lenses: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        advace: {
            type: String,
            required: true
        },
        balance: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        sentDate: {
            type: Date,
            required: true
        },
        receivedDate: {
            type: String,
            required: true
        },
        deliveredDate: {
            type: String,
            required: true
        },
        specialNote: {
            type: String,
            required: true
        },
        frameImg: {
            type: String,
            required: true
        },
        frameDesc: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Order', orderSchema)