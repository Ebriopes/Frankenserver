const path = require('path');
const router = require('express').Router();

const public = require('./public');
const login = require('./login');

const welcomeHTML = path.resolve(__dirname, '../../public/Hello.html');

router.use(public);
router.use('/login', login);

router.get('/', (_, res) => {
  res.sendFile(welcomeHTML);
});

module.exports = router;
