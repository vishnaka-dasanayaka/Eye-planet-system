const mongoose = require('mongoose')

const branchSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "User is not found"],
            ref: 'User'
        },
        branchName: {
            type: String,
            required: [true, 'Add a branch name']
        },
        branchCoordinator: {
            type: String,
            required: [true, "Add a branch coordinator"]
        },
        address: {
            type: String,
            required: [true, "Add the branch address"]
        },
        email: {
            type: String,
            default: "-"
        },
        contactNumber: {
            type: String,
            default: "-"
        },
        contactNumber2: {
            type: String,
            default: "-"
        },
        branchImg: {
            type: String
        },
        status: {
            type: String,
            default: 'active'
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Branch', branchSchema)