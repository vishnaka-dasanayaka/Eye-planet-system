const express = require('express')
const router = express.Router()
const { getPatients, setPatient, deletePatient, updatePatient, findPatients, findPatient, getNewOrderNumber } = require('../controllers/patientController')
const { protect } = require('../middleware/authMiddleware')
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        file.fieldname === "pres_img" ? cb(null, 'public/Prescriptions') : cb(null, 'public/Frames')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + req.user.firstName + Date.now() + path.extname(file.originalname))

    }
})

const upload = multer({
    storage: storage
})



router.get('/', protect, getPatients)
router.post('/', protect, upload.fields([{ name: "pres_img" }, { name: "frame_img" }]), setPatient)
router.put('/:id', protect, updatePatient)
router.delete('/:id', protect, deletePatient)

router.post('/findpatients', protect, findPatients)
router.get('/findpatient/:id', protect, findPatient)
router.get('/get-new-order-number', protect, getNewOrderNumber)

module.exports = router