const express = require('express');
const router = express.Router();
const { getAllSets, getSetByID, postNewSet, updateSet, deleteSet } = require("../controllers/storageController");


router.get('/', getAllSets);
router.post('/', postNewSet);
router.get('/:id', getSetByID);
router.put('/:id', updateSet);
router.delete('/:id', deleteSet);

module.exports = router;
