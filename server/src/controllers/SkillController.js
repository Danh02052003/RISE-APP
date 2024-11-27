const Skill = require("../models/skillModel");

// Get all skills with filters
const getAllSkills = async (req, res) => {
  try {
    const { name, page = 1, limit = 10, sort = "-createdAt" } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const skills = await Skill.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);
    const total = await Skill.countDocuments(query);

    res.status(200).json({
      skills,
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
      .json({ msg: "Error fetching skills", error: error.message });
  }
};

// Create a new skill
const createSkill = async (req, res) => {
  try {
    const newSkill = new Skill(req.body);
    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (error) {
    res.status(500).json({ msg: "Error creating skill", error: error.message });
  }
};

// Get a single skill by ID
const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ msg: "Skill not found" });
    res.status(200).json(skill);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching skill", error: error.message });
  }
};

// Update skill by ID
const updateSkill = async (req, res) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSkill)
      return res.status(404).json({ msg: "Skill not found for updating" });
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ msg: "Error updating skill", error: error.message });
  }
};

// Delete skill by ID
const deleteSkill = async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill)
      return res.status(404).json({ msg: "Skill not found for deletion" });
    res.status(200).json({ msg: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting skill", error: error.message });
  }
};

module.exports = {
  getAllSkills,
  createSkill,
  getSkillById,
  updateSkill,
  deleteSkill,
};
