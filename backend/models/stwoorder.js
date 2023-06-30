const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    userID: {
        type: String
    },
    name: {
        type: String
    },
    phone: {
        type: Number
    },
    products: {
        type: Array
    },
    address: {
        type: String
    },
    deliverOption: {
        type: String
    },
    note: {
        type: String
    },
    email: {
        type: String
    },
    status: {
        type:String
    },
    date: {
        type:Date
    }
})
const Orders = mongoose.model("orderstwo", orderSchema);

module.exports = Orders;