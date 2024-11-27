const express = require("express");
const router = express.Router();
const collectController = require("../controllers/collectController");

// POST route to create a new collect
router.post("/collects", collectController.createCollect);

// GET route to fetch all collects
router.get("/collects", collectController.getAllCollects);

// GET route to fetch a single collect by ID
router.get("/collects/:id", collectController.getCollectById);

// PUT route to update a collect by ID
router.put("/collects/:id", collectController.updateCollect);

// DELETE route to delete a collect by ID
router.delete("/collects/:id", collectController.deleteCollect);

module.exports = router;
