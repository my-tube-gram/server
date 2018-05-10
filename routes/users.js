const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/user_controller')

router.get('/login', loginUser);

router.post('/register', registerUser)

module.exports = router;
