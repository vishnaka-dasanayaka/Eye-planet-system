const express = require('express')
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/userModel');
const Patient = require('../models/patientModel');
const Order = require('../models/orderModel');
const router = express.Router()

router.get('/', protect, async (req, res) => {
    let users;
    let activeUsers;
    let patients;
    let orders;
    let activeOrders;

    try {
        const allUsers = await User.find();
        const allPatients = await Patient.find({ status: 'active' })
        const allOrders = await Order.find({ isDeleted: false })

        users = allUsers.length
        activeUsers = allUsers.filter(user => user.role !== 'disabled').length;

        patients = allPatients.length

        orders = allOrders.length
        activeOrders = allOrders.filter(order => order.status !== "delivered").length


    } catch (error) {
        res.status(500).json(error)
    }

    res.status(200).json({ users, activeUsers, patients, orders, activeOrders })






})

module.exports = router