const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
  {
    userId: {type: String, required: false},
    price: {type: String, required: false},
    name: {type: String, required: false},
    description: {type: String, required: false},
    category: {type: String, required: false},
    inventoryStatus: {type: String, required: false}
  }, {
    timestamps: true
  }
);
const ProductModel = mongoose.model("product", ProductSchema);
module.exports = ProductModel;