const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

router.route('/initialize').post(transactionController.initPayment);

router.route('/verify').post(transactionController.verifyPayment);

module.exports = router;
