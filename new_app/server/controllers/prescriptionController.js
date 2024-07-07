const asyncHandler = require('express-async-handler')
const Prescription = require('../models/prescriptionModel')
const User = require('../models/userModel')
const Order = require('../models/orderModel')
const Patient = require('../models/patientModel')



const getPrescriptions = asyncHandler(async (req, res) => {
    let user;

    try {
        user = await User.findById(req.user.id)
    } catch (error) {
        res.status(500).json('Server Error')
    }

    if (!user) {
        res.status(400).json('User not found')
    }

    const presIds = req.body


    let prescriptions;

    try {
        prescriptions = await Prescription.find({
            _id: { $in: presIds }
        });
    } catch (error) {
        return res.status(500).json('Server Error');
    }


    res.status(200).json(prescriptions);
})

const addPres = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401).json('User not found')
    }

    const presData = JSON.parse(req.body.presData);


    try {
        const order = await Order.findById(req.params.oId)

        const prescription = await Prescription.create({
            patient: req.params.pId,
            order: req.params.oId,
            VAR: presData.VAR,
            VAL: presData.VAL,
            VARPH: presData.VARPH,
            VALPH: presData.VALPH,
            retiR: presData.retiR,
            retiL: presData.retiL,
            hbrxDate: presData.hbrxDate,
            hbrxRSPH: presData.hbrxRSPH,
            hbrxRCYL: presData.hbrxRCYL,
            hbrxRAXIS: presData.hbrxRAXIS,
            hbrxLSPH: presData.hbrxLSPH,
            hbrxLCYL: presData.hbrxLCYL,
            hbrxLAXIS: presData.hbrxLAXIS,
            hbrxRSummary: presData.hbrxRSummary,
            hbrxLSummary: presData.hbrxLSummary,
            RSPH: presData.RSPH,
            RCYL: presData.RCYL,
            RAXIS: presData.RAXIS,
            LSPH: presData.LSPH,
            LCYL: presData.LCYL,
            LAXIS: presData.LAXIS,
            rSummary: presData.rSummary,
            lSummary: presData.lSummary,
            presNote: presData.presNote,
            rvDate: presData.rvDate,
            signedBy: presData.signedBy,
            presImg: req.file.filename
        })


        const updatedPatient = await Patient.findByIdAndUpdate(req.params.pId, { $push: { history: `New prescription added by ${req.user.firstName} to order ${order.orderNumber}` } }, { new: true })
        const updatedOrder = await Order.findByIdAndUpdate(
            order._id,
            { $push: { prescriptions: prescription._id } },
            { new: true }
        );

        res.status(200).json({
            patient: updatedPatient,
            order: updatedOrder,
            prescription: prescription
        })
    } catch (error) {
        res.status(500).json('server error')
    }

})

module.exports = {
    getPrescriptions,
    addPres
}