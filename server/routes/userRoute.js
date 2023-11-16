const express = require('express');
const router = express.Router();
const { loginUser, getUserById, createUser, updateUserById, deleteUserById } = require('../controllers/userController');
const { protect } = require('../middleware/JWTAuthMiddleware');

router.post('/login', loginUser);

// GET user by ID
router.get('/:id', getUserById);

// POST create new user
router.post('/', createUser);


module.exports = router;
