const asyncHandler = require('express-async-handler')
const Patient = require('../models/patientModel')
const Order = require('../models/orderModel')
const Prescription = require('../models/prescriptionModel')
const User = require('../models/userModel')

const getPatients = asyncHandler(async (req, res) => {
    const patients = await Patient.find({ status: 'active' });
    res.status(200).json(patients)
})

const setPatient = asyncHandler(async (req, res) => {



    if (!req.body.patientData.fullName || !req.body.patientData.contactNumber || !req.body.patientData.dob || !req.body.patientData.address) {
        res.status(400);
        throw new Error('Please add patient personal data')
    }

    if (!req.body.patientData.date || !req.body.patientData.branch || !req.body.patientData.orderNumber || !req.body.patientData.billNumber || !req.body.patientData.lenses || !req.body.patientData.price || !req.body.patientData.status) {
        res.status(400)
        throw new Error('Please add order details')
    }

    if (!req.body.presData) {
        res.status(400)
        throw new Error('Please add prescription data')
    }

    const patient = await Patient.create({
        name: req.body.patientData.fullName,
        contactNumber: req.body.patientData.contactNumber,
        dob: req.body.patientData.dob,
        address: req.body.patientData.address,
        user: req.user.id
    })

    const order = await Order.create({
        patient: patient._id,
        date: req.body.patientData.date,
        branch: req.body.patientData.branch,
        orderNumber: req.body.patientData.orderNumber,
        billNumber: req.body.patientData.billNumber,
        lenses: req.body.patientData.lenses,
        price: req.body.patientData.price,
        advance: req.body.patientData.advance,
        balance: req.body.patientData.balance,
        status: req.body.patientData.status,
        sentDate: req.body.patientData.sentDate,
        receivedDate: req.body.patientData.receivedDate,
        deliveredDate: req.body.patientData.deliveredDate,
        specialNote: req.body.patientData.specialNote,
        frameImg: req.body.patientData.frameImg,
        frameDesc: req.body.patientData.frameDesc
    })

    const prescription = await Prescription.create({
        patient: patient._id,
        order: order._id,
        VAR: req.body.presData.VAR,
        VAL: req.body.presData.VAL,
        VARPH: req.body.presData.VARPH,
        VALPH: req.body.presData.VALPH,
        retiR: req.body.presData.retiR,
        retiL: req.body.presData.retiL,
        hbrxDate: req.body.presData.hbrxDate,
        hbrxRSPH: req.body.presData.hbrxRSPH,
        hbrxRCYL: req.body.presData.hbrxRCYL,
        hbrxRAXIS: req.body.presData.hbrxRAXIS,
        hbrxLSPH: req.body.presData.hbrxLSPH,
        hbrxLCYL: req.body.presData.hbrxLCYL,
        hbrxLAXIS: req.body.presData.hbrxLAXIS,
        hbrxRSummary: req.body.presData.hbrxRSummary,
        hbrxLSummary: req.body.presData.hbrxLSummary,
        RSPH: req.body.presData.RSPH,
        RCYL: req.body.presData.RCYL,
        RAXIS: req.body.presData.RAXIS,
        LSPH: req.body.presData.LSPH,
        LCYL: req.body.presData.LCYL,
        LAXIS: req.body.presData.LAXIS,
        rSummary: req.body.presData.rSummary,
        lSummary: req.body.presData.lSummary,
        presNote: req.body.presData.presNote,
        rvDate: req.body.presData.rvDate,
        signedBy: req.body.presData.signedBy,
        presImg: req.body.presData.presImg.base64
    })

    const updatedPatient = await Patient.findByIdAndUpdate(
        patient._id,
        { $push: { orders: order._id } },
        { new: true } // This option returns the modified document rather than the original
    );

    const updatedOrder = await Order.findByIdAndUpdate(
        order._id,
        { $push: { prescriptions: prescription._id } },
        { new: true } // This option returns the modified document rather than the original
    );


    res.status(200).json({
        patient: updatedPatient,
        order: updatedOrder,
        prescription: prescription
    })
})

const updatePatient = asyncHandler(async (req, res) => {

    let user;

    try {
        user = await User.findById(req.user.id)
    } catch (error) {
        res.status(500).json('Server Error')
    }

    if (!user) {
        res.status(400).json('User not found')
    }

    const patient = Patient.findById(req.params.id)

    if (!patient) {
        res.status(400)
        throw new Error('Patient not fond')
    }

    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(201).json(updatedPatient)
})


const deletePatient = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id)

    if (!patient) {
        res.status(400)
        throw new Error('Patient not fond')
    }

    const orders = patient.orders

    const result = await Order.updateMany(
        { _id: { $in: orders } }, // Filter to match orders with IDs in the array
        { $set: { isDeleted: true } } // Update operation to set the status to 'deleted'
    );



    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, { status: 'deleted' }, {
        new: true
    })

    res.status(201).json(updatedPatient)
})

const findPatients = asyncHandler(async (req, res) => {
    const { name, contactNumber, dob } = req.body


    let user;

    try {
        user = await User.findById(req.user.id)
    } catch (error) {
        res.status(500).json('Server Error')
    }

    if (!user) {
        res.status(400).json('User not found')
    }

    let filter = {}

    if (name !== null && name !== '') filter.name = name
    if (contactNumber !== null && contactNumber !== '') filter.contactNumber = contactNumber
    if (dob !== null && dob !== '') filter.dob = dob

    const patients = await Patient.find(filter)



    res.status(200).json(patients)
})

const findPatient = asyncHandler(async (req, res) => {


    let user;

    try {
        user = await User.findById(req.user.id)
    } catch (error) {
        res.status(500).json('Server Error')
    }

    if (!user) {
        res.status(400).json('User not found')
    }



    const patient = await Patient.findById(req.params.id)



    res.status(200).json(patient)
})

module.exports = {
    getPatients,
    setPatient,
    updatePatient,
    deletePatient,
    findPatients,
    findPatient
}