const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    productID: {
        type: Number
    },
    productName: {
        type: String
    },
    stock: {
        type: Number
    },
    category: {
        type: Array
    },
    productType: {
        type: String
    },
    price: {
        type: Number
    },
    discountedPrice: {
        type: Number
    },
    image: {
        type: String
    }
})
const Inventory = mongoose.model("producttwo", ProductSchema);

module.exports = Inventory;