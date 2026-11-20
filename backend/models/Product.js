const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0, default: 0 },
  scentNotes: [{ type: String }],
  fragranceFamilies: [{ type: String }],
  imageUrl: { type: String },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("Product", productSchema);