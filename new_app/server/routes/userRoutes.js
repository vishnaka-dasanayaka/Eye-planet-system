const express = require('express')
const router = express.Router()
const { registerUser, addUser, updateMyPassword, loginUser, getMe, getAllUsers, updateUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/login', loginUser)
router.post('/', registerUser)
router.get('/me', protect, getMe)

router.post('/adduser', addUser)
router.get('/getall', protect, getAllUsers)
router.put('/:id', protect, updateUser)
router.put('/', protect, updateMyPassword)

module.exports = router