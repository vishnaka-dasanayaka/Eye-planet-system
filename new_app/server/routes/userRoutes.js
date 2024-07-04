const express = require('express')
const router = express.Router()
const { registerUser, changePic, addUser, updateMyPassword, loginUser, getMe, getAllUsers, updateUser } = require('../controllers/userController')
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
        cb(null, 'public/ProfilePictures')
    },
    filename: (req, file, cb) => {

        cb(null, generateRandomString(10) + path.extname(file.originalname))
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