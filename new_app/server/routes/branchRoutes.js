const express = require('express')
const router = express.Router()
const { setBranch, getBranches, updateBranch } = require('../controllers/branchController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, setBranch)
router.get('/getall', protect, getBranches)
router.put('/:id', protect, updateBranch)

module.exports = router