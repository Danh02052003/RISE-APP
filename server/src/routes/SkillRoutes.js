// SkillRoutes.js

const express = require("express");
const router = express.Router();
const SkillController = require("../controllers/SkillController");

// Create new skill
router.post("/skill", SkillController.createSkill);

// Get all skills
router.get("/skill", SkillController.getAllSkills);

// Get skill by ID
router.get("/skill/:id", SkillController.getSkillById);

// Update skill by ID
router.put("/skill/:id", SkillController.updateSkill);

// Delete skill by ID
router.delete("/skill/:id", SkillController.deleteSkill);

module.exports = router;
