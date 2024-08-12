const express = require('express');
const walletRoutes = require('./walletRoutes');

const router = express.Router();

router.use('/wallet', walletRoutes);

module.exports = router;