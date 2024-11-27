const Pricing = require("../models/pricingModel");

// Get all pricing with filters
const getAllPricing = async (req, res) => {
  try {
    const {
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sort = "-createdAt",
    } = req.query;
    const query = {};

    if (minPrice || maxPrice) {
      query.finalPrice = {};
      if (minPrice) query.finalPrice.$gte = Number(minPrice);
      if (maxPrice) query.finalPrice.$lte = Number(maxPrice);
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const pricing = await Pricing.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);
    const total = await Pricing.countDocuments(query);

    res.status(200).json({
      pricing,
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
      .json({ msg: "Error fetching pricing data", error: error.message });
  }
};

// Create a new pricing
const createPricing = async (req, res) => {
  try {
    const newPricing = new Pricing(req.body);
    const savedPricing = await newPricing.save();
    res.status(201).json(savedPricing);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error creating pricing", error: error.message });
  }
};

// Get a single pricing by ID
const getPricingById = async (req, res) => {
  try {
    const pricing = await Pricing.findById(req.params.id);
    if (!pricing) return res.status(404).json({ msg: "Pricing not found" });
    res.status(200).json(pricing);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching pricing", error: error.message });
  }
};

// Update pricing by ID
const updatePricing = async (req, res) => {
  try {
    const updatedPricing = await Pricing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPricing)
      return res.status(404).json({ msg: "Pricing not found for updating" });
    res.status(200).json(updatedPricing);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error updating pricing", error: error.message });
  }
};

// Delete pricing by ID
const deletePricing = async (req, res) => {
  try {
    const deletedPricing = await Pricing.findByIdAndDelete(req.params.id);
    if (!deletedPricing)
      return res.status(404).json({ msg: "Pricing not found for deletion" });
    res.status(200).json({ msg: "Pricing deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error deleting pricing", error: error.message });
  }
};

module.exports = {
  getAllPricing,
  createPricing,
  getPricingById,
  updatePricing,
  deletePricing,
};
