const express = require('express');
const colors = require('colors');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/dbConnection')

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

connectDB();

const port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
    console.log(`App is running on the port : ${port}`);
})