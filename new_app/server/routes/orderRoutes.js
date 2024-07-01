const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { getActiveOrders, findOrders } = require('../controllers/orderController')

router.get('/getall', protect, getActiveOrders)
router.post('/findorders', protect, findOrders)

module.exports = router