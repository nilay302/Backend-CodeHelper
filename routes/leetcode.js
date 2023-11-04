const express = require("express");
const router = express.Router();

const leetcode = require('./../controllers/leetcode');

// router.route('/getProfile').get(leetcode.getProfile);
router.route('/getTags').get(leetcode.getTags);

module.exports = router;