const express = require('express');
const authRoute = express.Router();

const login = require('../controllers/auth');

authRoute.route('/login').post(login);

module.exports = authRoute; 