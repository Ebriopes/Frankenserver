const express = require('express');
const router = express.Router();

const bodyParser = require('./bodyParser');

router.use(bodyParser);

module.exports = router;
