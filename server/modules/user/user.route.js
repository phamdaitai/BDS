const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const { auth } = require('../../middleware');

router.patch('/change-password/:id', auth, userController.changePassword);
router.get('/:id', auth, userController.getDetailUser);
router.patch('/:id', auth, userController.updateUser);
router.post('/', userController.createUser);
router.get('/', auth, userController.getAllUsers);

module.exports = router;