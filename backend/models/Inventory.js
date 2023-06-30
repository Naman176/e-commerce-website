const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  productID: {
    type: String, required: true
  },
  productName: {
    type: String, required: true
  },
  stock: {
    type: Number, required: true
  },
  category: {
    type: Array, required: true
  },
  productType: {
    type: String, required: true
  },
  price: {
    type: String, required: true
  },
  discountedPrice: {
    type: String, required: true
  },
  image: {
    type: String,
  },
});
const Inventory = mongoose.model("product", ProductSchema);

module.exports = Inventory;
