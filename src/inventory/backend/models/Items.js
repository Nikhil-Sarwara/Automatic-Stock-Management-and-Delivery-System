const mongoose = require("mongoose");
// Create the schema for an inventory item
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  min_quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  supplier: {
    type: String,
    required: true,
  },
});

// Export the Item model
module.exports = mongoose.model("Item", ItemSchema);
