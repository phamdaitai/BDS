const express = require('express');
const router = express.Router();
const paymentController = require('./payment.controller');
const { auth } = require('../../middleware');

router.post('/', auth, paymentController.createPayment);
router.get('/', auth, paymentController.getAllPayments);

module.exports = router;