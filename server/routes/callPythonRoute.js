const express = require('express');
const router = express.Router();
const { checkPython, getLegoSet } = require('../controllers/callPythonController');
const { protect } = require('../middleware/JWTAuthMiddleware');
router.get('/test', checkPython);
router.get('/:legoCode', getLegoSet);

module.exports = router;
