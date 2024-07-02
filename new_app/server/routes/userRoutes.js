const express = require('express')
const router = express.Router()
const { registerUser, changePic, addUser, updateMyPassword, loginUser, getMe, getAllUsers, updateUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/ProfilePictures')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + req.user.firstName + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})


router.post('/login', loginUser)
router.post('/', registerUser)
router.get('/me', protect, getMe)

router.post('/adduser', addUser)
router.get('/getall', protect, getAllUsers)
router.put('/:id', protect, updateUser)
router.put('/', protect, updateMyPassword)
router.post('/change-pic', protect, upload.single('pro_pic'), changePic)

module.exports = router