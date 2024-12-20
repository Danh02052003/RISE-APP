const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skillSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String },
});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
