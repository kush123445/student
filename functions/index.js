const express = require('express');
const connectDB = require('../config/db');
const tutorRoutes = require('../routes/tutorRoutes');
const cors = require('cors'); // Import cors
require('dotenv').config();
const serverless = require("serverless-http");
const router = express.Router();

const app = express();

// Enable CORS
app.use(cors());
app.options('*', cors());
//ct to the database
connectDB();



// Middleware
//app.use(express.json());

// Routes
router.get("/", (req, res) => {
    res.send("App is running..");
});
// app.use('/api', tutorRoutes);

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);


