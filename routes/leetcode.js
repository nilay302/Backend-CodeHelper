const express = require("express");
const router = express.Router();

const leetcode = require('./../controllers/leetcode');

router.route('/getRating').get(leetcode.getRating);
router.route('/getTags').get(leetcode.getTags);
router.route('/getProfile').get(leetcode.getProfile);

module.exports = router;