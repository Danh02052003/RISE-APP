const Organizer = require("../models/OrganizerModel");

// Get all organizers with search functionality
const getAllOrganizers = async (req, res) => {
  try {
    const { name, page = 1, limit = 10, sort = "-createdAt" } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const organizers = await Organizer.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);
    const total = await Organizer.countDocuments(query);

    res.status(200).json({
      organizers,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalItems: total,
        itemsPerPage: limitNum,
        hasNextPage: pageNum * limitNum < total,
        hasPrevPage: pageNum > 1,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching organizers", error: error.message });
  }
};

// Create a new organizer
const createOrganizer = async (req, res) => {
  try {
    const newOrganizer = new Organizer(req.body);
    const savedOrganizer = await newOrganizer.save();
    res.status(201).json(savedOrganizer);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error creating organizer", error: error.message });
  }
};

// Get a single organizer by ID
const getOrganizerById = async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.params.id);
    if (!organizer) return res.status(404).json({ msg: "Organizer not found" });
    res.status(200).json(organizer);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching organizer", error: error.message });
  }
};

// Update an organizer by ID
const updateOrganizer = async (req, res) => {
  try {
    const updatedOrganizer = await Organizer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedOrganizer)
      return res.status(404).json({ msg: "Organizer not found for updating" });
    res.status(200).json(updatedOrganizer);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error updating organizer", error: error.message });
  }
};

// Delete an organizer by ID
const deleteOrganizer = async (req, res) => {
  try {
    const deletedOrganizer = await Organizer.findByIdAndDelete(req.params.id);
    if (!deletedOrganizer)
      return res.status(404).json({ msg: "Organizer not found for deletion" });
    res.status(200).json({ msg: "Organizer deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error deleting organizer", error: error.message });
  }
};

module.exports = {
  getAllOrganizers,
  createOrganizer,
  getOrganizerById,
  updateOrganizer,
  deleteOrganizer,
};
