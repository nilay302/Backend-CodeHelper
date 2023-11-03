const express = require("express");
const router = express.Router();

const users = require('./../controllers/users');

router.route('/signup').post(users.signUp);
router.route('/login').post(users.login);

module.exports = router;