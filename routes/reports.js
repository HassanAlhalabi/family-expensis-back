const express = require('express');
const reportsRoute = express.Router();

const {
    getMonthTotal,
    getYearTotal,
    getUserTotal,
    getMaterialTotal,
    getServicesTotal
} = require('../controllers/reports');

reportsRoute.route('/month-total').get(getMonthTotal);
reportsRoute.route('/year-total').get(getYearTotal);
reportsRoute.route('/user-total').get(getUserTotal);
reportsRoute.route('/material-total').get(getMaterialTotal);
reportsRoute.route('/services-total').get(getServicesTotal);

module.exports = reportsRoute;