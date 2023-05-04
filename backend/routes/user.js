const express = require('express');
const router = express.Router();

// Import User Controller //
const userCtrl = require('../controllers/user');

// frontend expects POST requests as we are sending user info //
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Export the router //
module.exports = router;