const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const { verifyToken, studentVerified } = require("../middleware/auth");
const userController = require("../controllers/userController");
const facultyController = require("../controllers/facultyController");
const fileUpload = require("express-fileupload");
const fileExtLimiter = require("../middleware/fileExtLimiter");

router.get("/lor", verifyToken, userController.getLor);
router.get("/faculty/:department", facultyController.findFacultyByDepartment);
router.get("/faculty", facultyController.findFaculty);

router.post("/updateInfo", verifyToken, studentController.updateInfo);
router.post(
	"/createLor/:facultyID",
	verifyToken,
	studentVerified,
	studentController.createLor
);

module.exports = router;
