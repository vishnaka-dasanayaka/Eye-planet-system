const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')
const User = require('../models/userModel')
const Patient = require('../models/patientModel')
const Prescription = require('../models/prescriptionModel')

const getActiveOrders = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if (!user) {
            res.status(400)
            throw new Error('User not found')
        }

        const orders = await Order.find({ isDeleted: false });

        if (orders) {
            res.status(200).json(orders)
        } else {
            res.status(400)
            throw new Error('no active orders')
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

const findOrders = asyncHandler(async (req, res) => {
    const { orderNumber, billNumber } = req.body


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

    if (orderNumber !== null && orderNumber !== '') filter.orderNumber = orderNumber
    if (billNumber !== null && billNumber !== '') filter.billNumber = billNumber

    const orders = await Order.find(filter).lean();

    const patientIDs = orders.map(order => order.patient);


    const patients = await Patient.find({ _id: { $in: patientIDs } }).lean();


    const patientMap = patients.reduce((acc, patient) => {
        acc[patient._id] = patient;
        return acc;
    }, {});

    const ordersWithPatientInfo = orders.map(order => {
        const patient = patientMap[order.patient];
        return {
            ...order,
            name: patient ? patient.name : null,
            dob: patient ? patient.dob : null,
            contactNumber: patient ? patient.contactNumber : null,
        };
    });
    res.status(200).json(ordersWithPatientInfo)
})


const getOrder = asyncHandler(async (req, res) => {

    let user;

    try {
        user = await User.findById(req.user.id)
    } catch (error) {
        res.status(500).json('Server Error')
    }

    if (!user) {
        res.status(400).json('User not found')
    }

    try {
        const order = await Order.findById(req.params.id);

        res.status(200).json(order)
    } catch (error) {
        res.status(500).json("sever Error")
    }


})

const addOrder = asyncHandler(async (req, res) => {
    const orderData = JSON.parse(req.body.orderData);
    const presData = JSON.parse(req.body.presData);
    const frameData = JSON.parse(req.body.frameData);



    if (!orderData.date || !orderData.branch || !orderData.orderNumber || !orderData.billNumber || !orderData.lenses || !orderData.price || !orderData.status) {
        res.status(400)
        throw new Error('Please add order details')
    }

    if (!presData) {
        res.status(400)
        throw new Error('Please add prescription data')
    }

    try {


        const order = await Order.create({
            patient: req.params.id,
            date: orderData.date,
            branch: orderData.branch,
            orderNumber: orderData.orderNumber,
            billNumber: orderData.billNumber,
            lenses: orderData.lenses,
            price: orderData.price,
            advance: orderData.advance,
            balance: orderData.balance,
            status: orderData.status,
            sentDate: orderData.sentDate,
            receivedDate: orderData.receivedDate,
            deliveredDate: orderData.deliveredDate,
            specialNote: orderData.specialNote,
            frameImg: req.files.frame_img[0].filename,
            frameDesc: frameData.frameDescription
        })

        const prescription = await Prescription.create({
            patient: req.params.id,
            order: order._id,
            VAR: presData.VAR,
            VAL: presData.VAL,
            VARPH: presData.VARPH,
            VALPH: presData.VALPH,
            retiR: presData.retiR,
            retiL: presData.retiL,
            hbrxDate: presData.hbrxDate,
            hbrxRSPH: presData.hbrxRSPH,
            hbrxRCYL: presData.hbrxRCYL,
            hbrxRAXIS: presData.hbrxRAXIS,
            hbrxLSPH: presData.hbrxLSPH,
            hbrxLCYL: presData.hbrxLCYL,
            hbrxLAXIS: presData.hbrxLAXIS,
            hbrxRSummary: presData.hbrxRSummary,
            hbrxLSummary: presData.hbrxLSummary,
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
            presImg: req.files.pres_img[0].filename
        })

        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id,
            { $push: { orders: order._id } },
            { new: true } // This option returns the modified document rather than the original
        );

        const updatedOrder = await Order.findByIdAndUpdate(
            order._id,
            { $push: { prescriptions: prescription._id } },
            { new: true } // This option returns the modified document rather than the original
        );


        res.status(200).json({
            patient: updatedPatient,
            order: updatedOrder,
            prescription: prescription
        })
    } catch (error) {
        res.status(500).json('server error')
    }
})
module.exports = { getActiveOrders, findOrders, getOrder, addOrder }