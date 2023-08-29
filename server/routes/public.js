const serveIndex = require('serve-index');
const express = require('express');
const router = express.Router();

router.use('/public', express.static('public'));
router.use('/public', serveIndex('public'));

module.exports = router;
