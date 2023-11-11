const express = require('express');
const router = express.Router();
const { checkPython } = require('../controllers/callPythonController');

router.get('/test', checkPython);


module.exports = router;
