const asyncHandler = require('express-async-handler')
const Prescription = require('../models/prescriptionModel')
const User = require('../models/userModel')
const { ObjectId } = require('mongodb');



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

module.exports = {
    getPrescriptions
}