const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/user_controller')

/* GET users listing. */
router.get('/login', loginUser);

module.exports = router;
