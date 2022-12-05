const router = require('express').Router();

const noteRouter = require('./notes');

router.use('./notes', noteRouter);

module.exports = router;