const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { getActiveOrders } = require('../controllers/orderController')

router.get('/getall', protect, getActiveOrders)

module.exports = router