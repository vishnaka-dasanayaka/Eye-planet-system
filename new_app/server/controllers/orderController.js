const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')
const User = require('../models/userModel')

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

module.exports = { getActiveOrders }