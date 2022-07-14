const express = require('express');
const info = require('./info');
const health = require('./health');
const qrcode = require('./qrcode');

const router = express.Router();

router.use('/', info);
router.use('/health', health);
router.use('/qrcode', qrcode);

module.exports = router;
