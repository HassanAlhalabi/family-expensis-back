const express = require('express');
const materialsRoute = express.Router();
const authorize = require('../middlewares/authorize');

const {
    getAllMaterials,
    addMaterial,
    updateMaterial,
    deleteMaterial,
    getAllServices
} = require('../controllers/materials');

materialsRoute.route('/services').get(getAllServices)
materialsRoute.route('/').get(getAllMaterials).post(authorize,addMaterial);
materialsRoute.route('/:id').put(authorize,updateMaterial).delete(authorize,deleteMaterial);

module.exports = materialsRoute;