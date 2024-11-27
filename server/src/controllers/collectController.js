const Collect = require("../models/collectModel.js"); // Import the Collect model
const mongoose = require("mongoose");

// Create a new Collect (Post)
exports.createCollect = async (req, res) => {
  try {
    const { name, imageSrc, organizer, description, events } = req.body;

    // Validate required fields
    if (!name || !imageSrc || !organizer || !description || !events) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create new Collect document
    const collect = new Collect({
      name,
      imageSrc,
      organizer,
      description,
      events,
    });

    await collect.save();
    res.status(201).json(collect);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all Collects (Get)
exports.getAllCollects = async (req, res) => {
  try {
    const collects = await Collect.find()
      .populate("organizer") // Populate organizer details
      .populate("events"); // Populate events details
    res.status(200).json(collects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single Collect by ID (Get)
exports.getCollectById = async (req, res) => {
  const collectId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(collectId)) {
    return res.status(400).json({ message: "Invalid collect ID" });
  }

  try {
    const collect = await Collect.findById(collectId)
      .populate("organizer") // Populate organizer details
      .populate("events"); // Populate events details

    if (!collect) {
      return res.status(404).json({ message: "Collect not found" });
    }

    res.status(200).json(collect);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a Collect (Put)
exports.updateCollect = async (req, res) => {
  const collectId = req.params.id;
  const { name, imageSrc, organizer, description, events } = req.body;

  if (!mongoose.Types.ObjectId.isValid(collectId)) {
    return res.status(400).json({ message: "Invalid collect ID" });
  }

  try {
    const updatedCollect = await Collect.findByIdAndUpdate(
      collectId,
      { name, imageSrc, organizer, description, events },
      { new: true } // Return the updated document
    );

    if (!updatedCollect) {
      return res.status(404).json({ message: "Collect not found" });
    }

    res.status(200).json(updatedCollect);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a Collect (Delete)
exports.deleteCollect = async (req, res) => {
  const collectId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(collectId)) {
    return res.status(400).json({ message: "Invalid collect ID" });
  }

  try {
    const deletedCollect = await Collect.findByIdAndDelete(collectId);

    if (!deletedCollect) {
      return res.status(404).json({ message: "Collect not found" });
    }

    res.status(200).json({ message: "Collect deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
