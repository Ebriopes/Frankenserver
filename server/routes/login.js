const router = require('express').Router();

router.get('/', (_, res) => {
  res.status(200).send('Oh you do want enter, eh');
});

module.exports = router;
