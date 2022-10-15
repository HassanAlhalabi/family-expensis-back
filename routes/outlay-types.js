const express = require('express');
const outlayTypesRoute = express.Router();
const authorize = require('../middlewares/authorize');

const {
    getAllOutlayTypes,
    addOutlayType,
    updateOutlayType,
    deleteOutlayType
} = require('../controllers/outlay-types');

outlayTypesRoute.route('/').get(getAllOutlayTypes).post(authorize,addOutlayType);
outlayTypesRoute.route('/:id').put(authorize,updateOutlayType).delete(authorize,deleteOutlayType);

module.exports = outlayTypesRoute;