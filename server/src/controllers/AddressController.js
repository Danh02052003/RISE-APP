const Address = require("../models/AddressModel");

// Get all addresses with filters
const getAllAddresses = async (req, res) => {
  try {
    const {
      street,
      district,
      imageSrc,
      city,
      page = 1,
      limit = 10,
      sort = "-createdAt",
    } = req.query;

    const query = {};

    // Apply filters
    if (street) {
      query["address.street"] = { $regex: street, $options: "i" };
    }
    if (district) {
      query["address.district"] = { $regex: district, $options: "i" };
    }
    if (city) {
      query["address.city"] = { $regex: city, $options: "i" };
    }
    if (imageSrc) {
      query["address.imageSrc"] = { $regex: imageSrc, $options: "i" };
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const addresses = await Address.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);
    const total = await Address.countDocuments(query);

    // Return addresses and pagination
    res.status(200).json({
      addresses,
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
      .json({ msg: "Error fetching addresses", error: error.message });
  }
};

// Create a new address
const createAddress = async (req, res) => {
  try {
    const newAddress = new Address(req.body);
    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error creating address", error: error.message });
  }
};

// Get a single address by ID
const getAddressById = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) return res.status(404).json({ msg: "Address not found" });
    res.status(200).json(address);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching address", error: error.message });
  }
};

// Update an address by ID
const updateAddress = async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAddress)
      return res.status(404).json({ msg: "Address not found for updating" });
    res.status(200).json(updatedAddress);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error updating address", error: error.message });
  }
};

// Delete an address by ID
const deleteAddress = async (req, res) => {
  try {
    const deletedAddress = await Address.findByIdAndDelete(req.params.id);
    if (!deletedAddress)
      return res.status(404).json({ msg: "Address not found for deletion" });
    res.status(200).json({ msg: "Address deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error deleting address", error: error.message });
  }
};

module.exports = {
  getAllAddresses,
  createAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
};
