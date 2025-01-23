// 1. Importing required packages
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/database');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const esewaRouter = require('./routes/esewaRoutes');
const winston = require('winston'); // Import Winston
const https = require("https");
const fs = require("fs");
const morgan = require("morgan")

// 2. Creating an express app
const app = express();

// Configuring Winston logger
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logfile.log' })
  ]
});


const credentials = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'certificate.pem'))
};

// JSON Config
app.use(express.json());

// File Upload Config
app.use(fileUpload());

app.use(morgan("dev"));

// Make a public folder accessible to outside
app.use(express.static('./public'));

// CORS Config
const corsOptions = {
    origin: true,
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    optionSuccessStatus: 200
  };
  
  app.use(cors(corsOptions));
  

// Configuration dotenv
dotenv.config();

// Connecting to the database
connectDB();

// 3. Defining the port
const PORT = process.env.PORT;

// 4. Creating a test route or endpoint
app.get('/test', (req, res) => {
  logger.info('Test API accessed'); // Log the test route access
  res.send('Test API is Working ...!');
});

// Log all API requests
app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`); // Log the request details
  next();
});

// Configuring routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/product', require('./routes/productRoutes'));
app.use('/api/car', require('./routes/carRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/esewa', require('./routes/esewaRoutes'));
app.use('/api/mobile', require('./routes/mobileBookingRoutes'));

// Error handling middleware to log errors
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`, { stack: err.stack }); // Log errors
  res.status(500).send('Something went wrong!');
});



https.createServer(credentials, app).listen(PORT, () => {
  console.log('Server is running on https://localhost:5000',);
});

// API URL for testing
// http://localhost:5500/test

// Exporting for testing
module.exports = app;
