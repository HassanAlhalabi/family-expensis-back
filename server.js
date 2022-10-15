require('dotenv').config();
const express = require('express');
const app = express();
const {connectDB, handleDisconnect} = require('./db');
const cors = require('cors');

const authorize = require('./middlewares/authorize');

const materialRoute = require('./routes/materials');
const usersRoute = require('./routes/users');
const outlayTypesRoute = require('./routes/outlay-types');
const outlaysRoute = require('./routes/outlays');
const reportsRoute = require('./routes/reports');

const port = process.env.PORT || 8080;

// Express Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors())


// Auth Route
app.use('/api/auth',require('./routes/auth'));

// Material Route Middleware
app.use('/api/materials',materialRoute);

// Users Route Middleware
app.use('/api/users',authorize,usersRoute);

// Outlay Types Route Middleware
app.use('/api/outlay-types',outlayTypesRoute );

// Outlays Route Middleware
app.use('/api/outlays',outlaysRoute );

// Reports Route Middleware
app.use('/api/reports',authorize,reportsRoute );

const start = async () => {
  app.listen(port,() => console.log(`Server is Running on Port ${port}`))
}
start();