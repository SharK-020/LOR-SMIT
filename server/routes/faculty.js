const express = require("express");
const router = express.Router();
const facultyController = require("../controllers/facultyController");
const { verifyToken } = require("../middleware/auth");
const studentController = require("../controllers/studentController");

router.get("/find/:studentId", verifyToken, studentController.getStudent);
router.patch("/response/:lorId", verifyToken, facultyController.response);

module.exports = router;
