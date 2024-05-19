const express = require('express');
const { register, login } = require('../controllers/authController');
const checkRequiredFields = require('../middlewares/checkRequiredFields');
const router = express.Router();

router.use(checkRequiredFields(['username', 'password']));
router.post('/register', register);
router.post('/login', login);

module.exports = router;
