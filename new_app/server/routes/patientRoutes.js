const express = require('express')
const router = express.Router()
const { getPatients, setPatient, deletePatient, updatePatient, findPatients, findPatient } = require('../controllers/patientController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getPatients)
router.post('/', protect, setPatient)
router.put('/:id', protect, updatePatient)
router.delete('/:id', protect, deletePatient)

router.post('/findpatients', protect, findPatients)
router.get('/findpatient/:id', protect, findPatient)

module.exports = router