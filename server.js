const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
// imports
const moviesRoute = require('./routes/movies')
const connectDB  = require('./config/db') 
const fetchData = require('./utils/fetchData')

// Loading env vars
dotenv.config({ path: './config/config.env'});

// Connect to database
connectDB();

// function call
fetchData()

const app = express();

app.use(morgan('dev'));

app.use('/api/v1/movies', moviesRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`));