const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");
const { verifyToken } = require("../middleware/auth");
router.get("/default",verifyToken, analyticsController.defaultData);
router.post("/data",verifyToken, analyticsController.analyticsData);

module.exports = router;