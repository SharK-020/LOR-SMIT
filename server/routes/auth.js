const express = require("express");
const authController = require("../controllers/authController");
const middleware = require("../middleware/auth");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/checkToken", middleware.checkToken);
module.exports = router;
