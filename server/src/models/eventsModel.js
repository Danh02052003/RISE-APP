const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Function to generate a custom event ID
function generateEventId() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const year = new Date().getFullYear();
  return `EVENT-${year}-${randomNum}`;
}

const eventSchema = new Schema(
  {
    eventId: {
      type: String,
      unique: true,
      default: generateEventId,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      index: true,
      minlength: 5, // Ensures meaningful titles
    },
    description: {
      type: String,
      required: true,
      minlength: 20, // Ensures sufficient detail
    },
    registrations: {
      current: {
        type: Number,
        default: 0,
        min: 0,
      },
      limit: {
        type: Number,
        min: 1,
      },
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizer", // Ensure the string 'Organizer' matches the model name exactly
      required: true,
    },
    pricing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pricing",
      required: true,
    },
    categories: [
      {
        type: String,
        required: true,
      },
    ],
    schedule: {
      date: {
        type: Date,
        required: true,
        validate: {
          validator: (value) => value > Date.now(),
          message: "Event date must be in the future.",
        },
      },
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
      timezone: {
        type: String,
        default: "CST",
      },
    },
    location: {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
      },
    },
    skills: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Skill",
      default: [],
    },
    refundPolicy: {
      type: String,
      default: "No policy",
    },
    images: [
      {
        type: [String],
        required: true,
      },
    ],
    tags: [
      {
        type: String,
        index: true,
        lowercase: true, // Normalizes tags
        trim: true,
      },
    ],
    status: {
      type: String,
      default: "Just Added",
      enum: [
        "Just Added",
        "Upcoming",
        "Ongoing",
        "Completed",
        "Cancelled",
        "Ticket sales",
      ],
    },
    ticketSalesEnd: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > Date.now();
        },
        message: "Ticket sales end date must be in the future.",
      },
    },
    interactionData: {
      views: {
        type: Number,
        default: 0,
        min: 0,
      },
      clicks: {
        type: Number,
        default: 0,
        min: 0,
      },
      averageViewDuration: {
        type: Number, // In seconds
        default: 0,
        min: 0,
      },
      conversionRate: {
        type: Number, // Percentage
        default: 0,
        min: 0,
        max: 100,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Add text index for search
eventSchema.index({
  eventId: "text",
  title: "text",
  description: "text",
  "location.name": "text",
  "location.address.street": "text",
  tags: "text",
  categories: "text",
});

// Pre-save hook to ensure unique event ID
eventSchema.pre("save", async function (next) {
  if (this.isNew) {
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 5) {
      const eventId = generateEventId();
      const existingEvent = await mongoose.models.Event.findOne({ eventId });

      if (!existingEvent) {
        this.eventId = eventId;
        isUnique = true;
      }

      attempts++;
    }

    if (!isUnique) {
      return next(
        new Error("Unable to generate unique event ID after 5 attempts")
      );
    }
  }
  next();
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
