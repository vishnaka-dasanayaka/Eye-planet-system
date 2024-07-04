const express = require('express')
const router = express.Router()
const { setBranch, getBranches, updateBranch } = require('../controllers/branchController')
const { protect } = require('../middleware/authMiddleware')
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Branches')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})


router.post('/', protect, upload.single('branch_pic'), setBranch)
router.get('/getall', protect, getBranches)
router.put('/:id', protect, updateBranch)

module.exports = router