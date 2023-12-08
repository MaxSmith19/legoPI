const express = require('express');
const router = express.Router();
const { getAllSets, getSetByID, postNewSet, updateSet, deleteSet, getSetAdditionalData } = require("../controllers/storageController");


router.get('/', getAllSets);
router.get('/additionalData', getSetAdditionalData);
router.post('/', postNewSet);
router.get('/:id', getSetByID);
router.put('/:id', updateSet);
router.delete('/:id', deleteSet);
module.exports = router;
