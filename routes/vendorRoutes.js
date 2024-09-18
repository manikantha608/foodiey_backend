const express = require("express");
const vendorController = require("../controllers/VenderController")

const router = express.Router();

router.post("/register",vendorController.vendorRegistration);
router.post("/login",vendorController.vendorLogin);
router.get("/all-vendors",vendorController.getAllvendors)
router.get("/single-vendor/:id",vendorController.getVendorById)

module.exports = router