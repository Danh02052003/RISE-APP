const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Collect Schema
const collectSchema = new Schema(
  {
    name: { type: String, required: true },
    imageSrc: { type: String, required: true },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "Organizer", // Reference to the Organizer model
      required: true,
    },
    description: { type: String, required: true },
    events: [
      {
        type: Schema.Types.ObjectId, // Reference to the Event model
        ref: "Event", // Reference to the Event model
        required: true,
      },
    ],
  },
  { timestamps: true }
);

// Create the Collect model
const Collect = mongoose.model("Collect", collectSchema);

module.exports = Collect;
