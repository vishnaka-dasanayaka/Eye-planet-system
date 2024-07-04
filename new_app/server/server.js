const express = require('express');
const colors = require('colors');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/dbConnection')
const { errorHandler } = require('./middleware/errorMiddleware')

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

connectDB();

// routes for patients
app.use('/api/patients', require('./routes/patientRoutes'))

// route for users
app.use('/api/users', require('./routes/userRoutes'))

// routes for branches
app.use('/api/branches', require('./routes/branchRoutes'))

// routes for orders
app.use('/api/orders', require('./routes/orderRoutes'))

// routes for prescriptions
app.use('/api/prescriptions', require('./routes/prescriptionRoutes'))

app.use(errorHandler)

const port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
    console.log(`App is running on the port : ${port}`);
})