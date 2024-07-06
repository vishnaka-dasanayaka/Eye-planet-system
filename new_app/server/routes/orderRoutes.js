const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { getActiveOrders, addOrder, getOrder, findOrders } = require('../controllers/orderController')
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

router.get('/getall', protect, getActiveOrders)
router.post('/findorders', protect, findOrders)
router.get('/get-single-order/:id', protect, getOrder)
router.post('/add-order/:id', protect, upload.fields([{ name: "pres_img" }, { name: "frame_img" }]), addOrder)

module.exports = router