// OrganizerRoutes.js

const express = require("express");
const router = express.Router();
const OrganizerController = require("../controllers/OrganizerController");

// Create new organizer
router.post("/organizer", OrganizerController.createOrganizer);

// Get all organizers
router.get("/organizer", OrganizerController.getAllOrganizers);

// Get organizer by ID
router.get("/organizer/:id", OrganizerController.getOrganizerById);

// Update organizer by ID
router.put("/organizer/:id", OrganizerController.updateOrganizer);

// Delete organizer by ID
router.delete("/organizer/:id", OrganizerController.deleteOrganizer);

module.exports = router;
