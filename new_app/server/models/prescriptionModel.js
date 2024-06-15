const mongoose = require('mongoose')

const prescriptionSchema = mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient'
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        },
        VAR: { type: String },
        VAL: { type: String },
        VARPH: { type: String },
        VALPH: { type: String },
        retiR: { type: String },
        retiL: { type: String },
        hbrxDate: { type: String },
        hbrxRSPH: { type: String },
        hbrxRCYL: { type: String },
        hbrxRAXIS: { type: String },
        hbrxLSPH: { type: String },
        hbrxLCYL: { type: String },
        hbrxLAXIS: { type: String },
        hbrxRSummary: { type: String },
        hbrxLSummary: { type: String },
        RSPH: { type: String },
        RCYL: { type: String },
        RAXIS: { type: String },
        LSPH: { type: String },
        LCYL: { type: String },
        LAXIS: { type: String },
        rSummary: { type: String },
        lSummary: { type: String },
        presNote: { type: String },
        rvDate: { type: String },
        signedBy: { type: String },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Prescription', prescriptionSchema)