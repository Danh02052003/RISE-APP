// PricingRoutes.js

const express = require("express");
const router = express.Router();
const PricingController = require("../controllers/PricingController");

// Create new pricing
router.post("/pricing", PricingController.createPricing);

// Get all pricing
router.get("/pricing", PricingController.getAllPricing);

// Get pricing by ID
router.get("/pricing/:id", PricingController.getPricingById);

// Update pricing by ID
router.put("/pricing/:id", PricingController.updatePricing);

// Delete pricing by ID
router.delete("/pricing/:id", PricingController.deletePricing);

module.exports = router;
