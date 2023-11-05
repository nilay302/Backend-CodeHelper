const express = require("express");
const router = express.Router();

const leetcode = require('./../controllers/leetcode');

router.route('/getRating').get(leetcode.getRating);
router.route('/getTags').get(leetcode.getTags);

module.exports = router;