const express = require("express");
const path = require("path");
const router = express.Router();

// Rota para a homepage
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

module.exports = router;
