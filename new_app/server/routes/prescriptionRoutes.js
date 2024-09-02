const express = require('express')
const router = express.Router()
const { getPrescriptions, addPres, deletePrescription } = require('../controllers/prescriptionController')
const { protect } = require('../middleware/authMiddleware')
const multer = require("multer")
const path = require("path")

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Prescriptions')
    },
    filename: (req, file, cb) => {

        cb(null, generateRandomString(10) + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

router.post('/', protect, getPrescriptions)
router.post('/add-prescription/:pId/:oId', protect, upload.single('pres_img'), addPres)
router.delete('/delete-pres/:id', protect, deletePrescription);


module.exports = router