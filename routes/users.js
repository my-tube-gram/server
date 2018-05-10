const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/user_controller')

router.post('/login', loginUser);

router.post('/register', registerUser)

module.exports = router;
