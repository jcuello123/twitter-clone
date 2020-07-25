const express = require("express");
const router = express.Router();
const path = require("path");

router.use('/api/posts', require('./posts'));
router.use('/api/signup', require('./signup'));
router.use('/api/update', require('./user'));

router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
