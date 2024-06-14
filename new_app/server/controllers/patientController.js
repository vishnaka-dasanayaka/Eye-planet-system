const asyncHandler = require('express-async-handler')
const Patient = require('../models/patientModel')

const getPatients = asyncHandler(async (req, res) => {
    const patients = await Patient.find({ status: 'active' });
    res.status(200).json(patients)
})

const setPatient = asyncHandler(async (req, res) => {



    if (!req.body.fullName || !req.body.contactNumber || !req.body.dob || !req.body.address) {
        res.status(400);
        throw new Error('Please add required fields')
    }

    const patient = await Patient.create({
        name: req.body.fullName,
        contactNumber: req.body.contactNumber,
        dob: req.body.dob,
        address: req.body.address,
        user: req.user.id
    })

    res.status(200).json(patient)
})

const updatePatient = asyncHandler(async (req, res) => {
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
    const patient = Patient.findById(req.params.id)

    if (!patient) {
        res.status(400)
        throw new Error('Patient not fond')
    }

    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, { status: 'deleted' }, {
        new: true
    })

    res.status(201).json(updatedPatient)
})

module.exports = {
    getPatients,
    setPatient,
    updatePatient,
    deletePatient
}