const express = require('express');
const usersRoute = express.Router();

const {
    getAllUsers,
    addUser,
    updateUser,
    deleteUser
} = require('../controllers/users');

usersRoute.route('/').get(getAllUsers).post(addUser);
usersRoute.route('/:id').put(updateUser).delete(deleteUser);

module.exports = usersRoute;