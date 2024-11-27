const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pricingSchema = new Schema({
  basePrice: { type: Number, required: true },
  currency: { type: String, default: "đ" },
  discount: {
    amount: { type: Number },
    type: { type: String, enum: ["percentage", "fixed"] },
    validUntil: { type: Date },
  },
  finalPrice: { type: Number, required: true },
});

const Pricing = mongoose.model("Pricing", pricingSchema);

module.exports = Pricing;
