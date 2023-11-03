const express = require("express");
const router = express.Router();

const codeforces = require('./../controllers/codeforces');

router.route('/getProfile').get(codeforces.getProfile);
router.route('/getTags').get(codeforces.getTags);

module.exports = router;