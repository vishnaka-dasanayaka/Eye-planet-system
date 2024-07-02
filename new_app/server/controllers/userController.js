const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const fs = require("fs")
const path = require('path')

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, contactNumber, address, email, password, role } = req.body

    if (!firstName || !lastName || !contactNumber || !address || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        firstName,
        lastName,
        contactNumber,
        address,
        email,
        password: hashedPassword,
        role
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            email: user.email,
            role: user.role,
            token: generateJWT(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})


const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    let user;

    try {
        user = await User.findOne({ email })
    } catch (error) {
        res.status(500).json('Server Error')
    }

    if (!user) {
        res.status(400).json('User not found')
    }

    if (user.role === 'disabled') {
        res.status(403).json('User Disabled by Admin')
    }

    const result = await bcrypt.compare(password, user.password)

    if (!result) {
        res.status(401).json('Invalid credentials')
    }

    res.status(200).json({
        _id: user.id,
        firstName: user.firstName,
        email: user.email,
        role: user.role,
        token: generateJWT(user._id)
    })



})

const getMe = asyncHandler(async (req, res) => {
    const { _id, role, firstName, lastName, contactNumber, address, email, status, pic } = await User.findById(req.user.id);
    res.status(200).json({
        id: _id,
        role,
        firstName,
        lastName,
        contactNumber,
        address,
        email,
        status,
        pic
    })
})

const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


// Add user

const addUser = asyncHandler(async (req, res) => {

    try {
        const { firstName, lastName, contactNumber, address, email, password, role } = req.body

        if (!firstName || !lastName || !contactNumber || !address || !email || !password) {
            res.status(400)
            throw new Error('Please add all fields')
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400)
            throw new Error('User already exists')
        }

        //const mainUser = await User.findById(req.user.id);

        // if (mainUser.role !== 'admin') {
        //     res.status(400)
        //     throw new Error('User not authenticated')
        // }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            firstName,
            lastName,
            contactNumber,
            address,
            email,
            password: hashedPassword,
            role
        })

        if (user) {
            res.status(201).json({
                _id: user.id,
                firstName: user.firstName,
                email: user.email,
                role: user.role,
                token: generateJWT(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    } catch (error) {
        res.status(400).json(error)
    }



})

const getAllUsers = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user.role === 'admin') {
        const users = await User.find()
        res.status(200).json(users);
    } else {
        res.status(401)
        throw new Error('Not Rights')
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user.role === 'admin') {
        const reqUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(reqUser);
    } else {
        res.status(401)
        throw new Error('Not Rights')
    }
})

const updateMyPassword = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            res.status(400)
            throw new Error('No user found')
        }

        if (user && (await bcrypt.compare(req.body.currentPassword, user.password))) {
            if (req.body.newPassword === req.body.confirmNewPassword) {

                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
                const response = await User.findByIdAndUpdate(req.user.id, { password: hashedPassword })
                res.status(200).json(response._id)
            } else {
                res.status(400)
                throw new Error('passwords do not match')
            }
        } else {
            res.status(400)
            throw new Error('Invalid current password')
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }


})

const changePic = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user.id);
    const oldPic = user.pic

    if (!user) {
        res.status(403).json("User not found")
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, { pic: req.file.filename })

        if (oldPic !== '') {
            const oldPicPath = path.join(__dirname, '..', 'public', 'ProfilePictures', oldPic);
            fs.unlink(oldPicPath, (err) => {
                if (err) {
                    console.error('Error deleting old profile picture:', err);
                }
            });
        }
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json('Database error')
        console.log(error);
    }
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
    addUser,
    getAllUsers,
    updateUser,
    updateMyPassword,
    changePic
}