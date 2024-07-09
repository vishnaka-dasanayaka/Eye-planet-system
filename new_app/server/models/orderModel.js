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
        },
        lenses: {
            type: [String],
        },
        price: {
            type: String,
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
        isDeleted: {
            type: Boolean,
            default: false
        },
    },

    {
        timestamps: true
    }
)

module.exports = mongoose.model('Order', orderSchema)