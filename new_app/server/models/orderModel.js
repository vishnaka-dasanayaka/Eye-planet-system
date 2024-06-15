const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Patient'
        },
        prescriptions: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Prescription'

        },
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
            type: [String],
            required: true
        },
        price: {
            type: String,
            required: true
        },
        advance: {
            type: String,
        },
        balance: {
            type: String,
        },
        status: {
            type: String,
            required: true
        },
        sentDate: {
            type: Date,
        },
        receivedDate: {
            type: String,
        },
        deliveredDate: {
            type: String,
        },
        specialNote: {
            type: String,
        },
        frameImg: {
            type: String,
        },
        frameDesc: {
            type: String,
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Order', orderSchema)