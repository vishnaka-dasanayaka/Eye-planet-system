const asyncHandler = require('express-async-handler')
const Patient = require('../models/patientModel')
const Order = require('../models/orderModel')
const Prescription = require('../models/prescriptionModel')
const User = require('../models/userModel')

// const getPatients = asyncHandler(async (req, res) => {
//     const patients = await Patient.find({ status: 'active' });
//     res.status(200).json(patients)
// })

const getPatients = asyncHandler(async (req, res) => {
    try {
        // Fetch patients with their orders populated
        const patients = await Patient.find({ status: 'active' }).populate('orders');

        // Sort patients by the date of their first order in ascending order
        patients.sort((a, b) => {
            if (a.orders.length === 0) return 1;
            if (b.orders.length === 0) return -1;
            return new Date(a.orders[0].date) - new Date(b.orders[0].date);
        });

        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

const setPatient = asyncHandler(async (req, res) => {


    const patientData = JSON.parse(req.body.patientData);
    const presData = JSON.parse(req.body.presData);
    const frameData = JSON.parse(req.body.frameData);


    if (!patientData.fullName || !patientData.contactNumber || !patientData.dob) {
        res.status(400)
        throw new Error('Please add patient personal data')
    }

    if (!patientData.date || !patientData.branch || !patientData.orderNumber || !patientData.status) {
        res.status(400)
        throw new Error('Please add order details')
    }





    try {
        const checkExist = await Order.findOne({ orderNumber: patientData.orderNumber });

        if (checkExist) {
            res.status(400)
            throw new Error('Order number is alredy in the system')
        }

        const trimmedName = patientData.fullName.trim().toLowerCase()


        const patient = await Patient.create({
            name: trimmedName,
            contactNumber: patientData.contactNumber,
            dob: patientData.dob,
            address: patientData.address,
            user: req.user.id,
            history: [`Created by ${req.user.firstName}`]
        })

        const order = await Order.create({
            patient: patient._id,
            date: patientData.date,
            branch: patientData.branch,
            orderNumber: patientData.orderNumber,
            billNumber: patientData.billNumber,
            lenses: patientData.lenses,
            price: patientData.price,
            advance: patientData.advance,
            balance: patientData.balance,
            status: patientData.status,
            sentDate: patientData.sentDate,
            receivedDate: patientData.receivedDate,
            deliveredDate: patientData.deliveredDate,
            specialNote: patientData.specialNote,
            frameImg: req.files && req.files.frame_img ? req.files.frame_img[0].filename : "",
            frameDesc: frameData ? frameData.frameDescription : ""
        })


        if (presData) {

            const prescription = await Prescription.create({
                patient: patient._id,
                order: order._id,
                VAR: presData.VAR,
                VAL: presData.VAL,
                VARPH: presData.VARPH,
                VALPH: presData.VALPH,
                retiR: presData.retiR,
                retiL: presData.retiL,
                hbrxDate: presData.hbrxDate,
                hbrxzRVA: presData.hbrxRVA,
                hbrxzLVA: presData.hbrxLVA,
                hbrxRSPH: presData.hbrxRSPH,
                hbrxRCYL: presData.hbrxRCYL,
                hbrxRAXIS: presData.hbrxRAXIS,
                hbrxLSPH: presData.hbrxLSPH,
                hbrxLCYL: presData.hbrxLCYL,
                hbrxLAXIS: presData.hbrxLAXIS,
                hbrxRSummary: presData.hbrxRSummary,
                hbrxLSummary: presData.hbrxLSummary,
                RVA: presData.RVA,
                LVA: presData.LVA,
                RSPH: presData.RSPH,
                RCYL: presData.RCYL,
                RAXIS: presData.RAXIS,
                LSPH: presData.LSPH,
                LCYL: presData.LCYL,
                LAXIS: presData.LAXIS,
                rSummary: presData.rSummary,
                lSummary: presData.lSummary,
                presNote: presData.presNote,
                rvDate: presData.rvDate,
                signedBy: presData.signedBy,
                presImg: req.files && req.files.pres_img ? req.files.pres_img[0].filename : ""
            })

            const updatedOrder = await Order.findByIdAndUpdate(
                order._id,
                { $push: { prescriptions: prescription._id } },
                { new: true } // This option returns the modified document rather than the original
            );

            const updatedPatient = await Patient.findByIdAndUpdate(
                patient._id,
                { $push: { orders: order._id } },
                { new: true } // This option returns the modified document rather than the original
            );

            res.status(200).json({
                patient: updatedPatient,
                order: updatedOrder,
                prescription: prescription
            })
        } else {


            const updatedPatient = await Patient.findByIdAndUpdate(
                patient._id,
                { $push: { orders: order._id } },
                { new: true } // This option returns the modified document rather than the original
            );


            res.status(200).json({
                patient: updatedPatient,
                order: order,
                prescription: 'no pres added prescription'
            })
        }
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

// const updatePatient = asyncHandler(async (req, res) => {

//     let user;

//     try {
//         user = await User.findById(req.user.id)
//     } catch (error) {
//         res.status(500).json('Server Error')
//     }

//     if (!user) {
//         res.status(400).json('User not found')
//     }

//     const patient = Patient.findById(req.params.id)

//     if (!patient) {
//         res.status(400)
//         throw new Error('Patient not fond')
//     }

//     const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
//         new: true
//     })

//     res.status(201).json(updatedPatient)
// })
const updatePatient = asyncHandler(async (req, res) => {

    let user;

    try {
        user = await User.findById(req.user.id)
    } catch (error) {
        res.status(500).json('Server Error')
    }

    if (!user) {
        res.status(400).json('User not found')
    }

    const patient = Patient.findById(req.params.id)

    if (!patient) {
        res.status(400)
        throw new Error('Patient not fond')
    }

    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(201).json(updatedPatient)
})

const deletePatient = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id)

    if (!patient) {
        res.status(400)
        throw new Error('Patient not fond')
    }

    const orders = patient.orders

    const result = await Order.updateMany(
        { _id: { $in: orders } }, // Filter to match orders with IDs in the array
        { $set: { isDeleted: true, orderNumber: null } } // Update operation to set the status to 'deleted'
    );



    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, { status: 'deleted', $push: { history: `Deleted by ${req.user.firstName}` } }, {
        new: true
    })

    res.status(201).json(updatedPatient)
})

const findPatients = asyncHandler(async (req, res) => {
    const { name, contactNumber, dob } = req.body


    let user;

    try {
        user = await User.findById(req.user.id)
    } catch (error) {
        res.status(500).json('Server Error')
    }

    if (!user) {
        res.status(400).json('User not found')
    }

    let filter = {}

    const date = new Date(dob);
    const isoDateStr = date.toISOString();

    if (name !== null && name !== '') {
        const nameRegex = new RegExp(name.trim().toLowerCase(), 'i'); // 'i' for case-insensitive
        filter.name = { $regex: nameRegex };
    }

    if (contactNumber !== null && contactNumber !== '') {
        const numberRegex = new RegExp(contactNumber.trim().toLowerCase(), 'i');
        filter.contactNumber = { $regex: numberRegex }
    }
    if (dob !== null && dob !== '') filter.dob = isoDateStr


    const patients = await Patient.find(filter);

    // Filter out patients with status 'deleted'
    const filteredPatients = patients.filter(patient => patient.status !== 'deleted');

    res.status(200).json(filteredPatients);

})

const findPatient = asyncHandler(async (req, res) => {


    let user;

    try {
        user = await User.findById(req.user.id)
    } catch (error) {
        res.status(500).json('Server Error')
    }

    if (!user) {
        res.status(400).json('User not found')
    }



    const patient = await Patient.findById(req.params.id)

    if (patient.status === 'deleted') {
        res.status(400).json('Patient not found')
    }

    const orders = await Order.find({ patient: req.params.id })



    res.status(200).json({ patient, orders })
})

const getNewOrderNumber = asyncHandler(async (req, res) => {

    let latestOrder;

    try {
        latestOrder = await Order.findOne().sort({ date: -1 }).exec();
    } catch (error) {
        res.status(500).json('Server not responding')
    }

    if (!latestOrder) {
        res.status(200).json(5000)
    }

    console.log(latestOrder);

    const newOrderNumber = parseInt(latestOrder.orderNumber, 10) + 1;

    res.status(200).json(`${newOrderNumber}`)
})

module.exports = {
    getPatients,
    setPatient,
    updatePatient,
    deletePatient,
    findPatients,
    findPatient,
    getNewOrderNumber
}