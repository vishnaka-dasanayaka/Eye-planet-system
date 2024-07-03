const multer = require("multer");
const path = require("path");

// Define storage for pres_img
const presStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "pres_img") {
            console.log(req);
            cb(null, "public/Prescriptions");
        } else {
            cb(new Error("Incorrect field name"), false);
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Define storage for frame_img
const frameStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "frame_img") {
            console.log('frme');
            cb(null, "public/Frames");
        } else {
            cb(new Error("Incorrect field name"), false);
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Create multer instances
const presUpload = multer({ storage: presStorage });
const frameUpload = multer({ storage: frameStorage });

// Middleware to handle both uploads
const upload = (req, res, next) => {
    presUpload.single("pres_img")(req, res, (err) => {
        if (err) {
            return next(err);
        }
        frameUpload.single("frame_img")(req, res, (err) => {
            if (err) {
                return next(err);
            }
            next();
        });
    });
};

module.exports = upload;
