const bodyParser = require('body-parser');
const router = require('express').Router();

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

module.exports = router;
