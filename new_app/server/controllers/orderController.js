const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')
const User = require('../models/userModel')
const Patient = require('../models/patientModel')

const getActiveOrders = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if (!user) {
            res.status(400)
            throw new Error('User not found')
        }

        const orders = await Order.find({ isDeleted: false });

        if (orders) {
            res.status(200).json(orders)
        } else {
            res.status(400)
            throw new Error('no active orders')
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

const findOrders = asyncHandler(async (req, res) => {
    const { orderNumber, billNumber } = req.body


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

    if (orderNumber !== null && orderNumber !== '') filter.orderNumber = orderNumber
    if (billNumber !== null && billNumber !== '') filter.billNumber = billNumber

    const orders = await Order.find(filter).lean();

    const patientIDs = orders.map(order => order.patient);


    const patients = await Patient.find({ _id: { $in: patientIDs } }).lean();


    const patientMap = patients.reduce((acc, patient) => {
        acc[patient._id] = patient;
        return acc;
    }, {});

    const ordersWithPatientInfo = orders.map(order => {
        const patient = patientMap[order.patient];
        return {
            ...order,
            name: patient ? patient.name : null,
            dob: patient ? patient.dob : null,
            contactNumber: patient ? patient.contactNumber : null,
        };
    });
    res.status(200).json(ordersWithPatientInfo)
})


const getOrder = asyncHandler(async (req, res) => {

    let user;

    try {
        user = await User.findById(req.user.id)
    } catch (error) {
        res.status(500).json('Server Error')
    }

    if (!user) {
        res.status(400).json('User not found')
    }

    try {
        const order = await Order.findById(req.params.id);

        res.status(200).json(order)
    } catch (error) {
        res.status(500).json("sever Error")
    }


})
module.exports = { getActiveOrders, findOrders, getOrder }