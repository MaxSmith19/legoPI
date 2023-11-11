const express = require('express');
const router = express.Router();
const { checkPython, getLegoSet } = require('../controllers/callPythonController');

router.get('/test', checkPython);
router.get('/:legoCode', getLegoSet);

module.exports = router;
