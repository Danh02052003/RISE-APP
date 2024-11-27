const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organizerSchema = new Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  followers: { type: Number, default: 0 },
  attendeesHosted: { type: Number, default: 0 },
  socialMedia: {
    facebook: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
  },
});

const Organizer = mongoose.model("Organizer", organizerSchema);

module.exports = Organizer;
