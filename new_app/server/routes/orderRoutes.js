const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { getActiveOrders, getOrder, findOrders } = require('../controllers/orderController')

router.get('/getall', protect, getActiveOrders)
router.post('/findorders', protect, findOrders)
router.get('/get-single-order/:id', protect, getOrder)

module.exports = router