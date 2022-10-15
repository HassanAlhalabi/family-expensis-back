
const express = require('express');
const outlaysRoute = express.Router();
const authorize = require('../middlewares/authorize');
const authenticate = require('../middlewares/auhenticate');

const {
    getAllUsersOutlays,
    getAllOutlays,
    addUserOutlay,
    updateUserOutlay,
    deleteUserOutlay
} = require('../controllers/outlays');

outlaysRoute.route('/').get(authorize, getAllOutlays) // For Admin
outlaysRoute.route('/user-outlays').get(authenticate,getAllUsersOutlays).post(authenticate,addUserOutlay);;
outlaysRoute.route('/user-outlays/:id').put(authenticate,updateUserOutlay).delete(authenticate,deleteUserOutlay);

module.exports = outlaysRoute;