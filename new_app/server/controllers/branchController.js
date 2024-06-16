const asyncHandler = require('express-async-handler')
const Branch = require('../models/branchModel')
const User = require('../models/userModel')

const setBranch = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if (!user) {
            throw new Error('User not found')
        }

        const branch = await Branch.create({
            user: user._id,
            branchName: req.body.branchName,
            branchCoordinator: req.body.branchCoordinator,
            address: req.body.address,
            email: req.body.email,
            contactNumber: req.body.contactNumber,
            contactNumber2: req.body.contactNumber2,
            branchImg: req.body.branchImg.base64,
        })

        if (branch) {
            res.status(201).json(branch)
        } else {
            res.status(409)
            throw new Error('Can not create branch')
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

const getBranches = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if (!user) {
            res.status(400)
            throw new Error('User not found')
        }

        const branches = await Branch.find()

        if (branches) {
            res.status(200).json(branches)
        } else {
            res.status(409)
            throw new Error('No branches found')
        }

    } catch (error) {
        res.status(500).json(error)
    }
})

const updateBranch = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user.role === 'admin') {
        const reqBranch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(reqBranch);
    } else {
        res.status(401)
        throw new Error('Not Rights')
    }
})

module.exports = {
    setBranch, getBranches, updateBranch
}