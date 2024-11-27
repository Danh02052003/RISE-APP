// AddressRoutes.js

const express = require("express");
const router = express.Router();
const AddressController = require("../controllers/AddressController");

// Create new address
router.post("/address", AddressController.createAddress);

// Get all addresses
router.get("/address", AddressController.getAllAddresses);

// Get address by ID
router.get("/address/:id", AddressController.getAddressById);

// Update address by ID
router.put("/address/:id", AddressController.updateAddress);

// Delete address by ID
router.delete("/address/:id", AddressController.deleteAddress);

module.exports = router;
