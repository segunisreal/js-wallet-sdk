const express = require('express');
const walletController = require('../controllers/walletController');
const router = express.Router();

router.post('/create-wallet', walletController.createWallet);

module.exports = router;