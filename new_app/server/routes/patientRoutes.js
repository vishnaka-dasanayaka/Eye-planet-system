const express = require('express')
const router = express.Router()
const { getPatients, setPatient, deletePatient, updatePatient, findPatients } = require('../controllers/patientController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getPatients)
router.post('/', protect, setPatient)
router.put('/:id', protect, updatePatient)
router.delete('/:id', protect, deletePatient)

router.post('/findpatients', protect, findPatients)

module.exports = router