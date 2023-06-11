const express = require("express");
const userController = require("../controllers/users");
const lorController = require("../controllers/lor");
const { verifyToken } = require("../middleware/auth");
const { isVerified } = require("../middleware/verify");
const router = express.Router();

router.patch(
	"/update/:userId",
	verifyToken,

	userController.updateInfo
);
router.patch("/:userId/approve/:lorId", verifyToken, lorController.response);
router.post(
	"/:userId/create",
	verifyToken,
	isVerified,
	userController.createLor
);

router.get(
	"/find/:department",
	verifyToken,
	userController.findFacultyByDepartment
);
router.get("/:userId/lor", verifyToken, userController.getLor);

module.exports = router;
