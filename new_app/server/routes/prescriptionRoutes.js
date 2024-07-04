const express = require('express')
const router = express.Router()
const { getPrescriptions } = require('../controllers/prescriptionController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, getPrescriptions)


module.exports = router