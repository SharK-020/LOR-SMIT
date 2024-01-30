const adminController = require("../controllers/adminController");
const { verifyToken } = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.post("/create", verifyToken, adminController.createFaculty);

module.exports = router;
