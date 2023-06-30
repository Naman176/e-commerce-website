const {Router} = require('express');
const router = Router();
const Orders = require("../models/stwoorder");
const Inventory = require("../models/stwoinventory");
const managingOrder = async (req, res, products, orderData) => {
    let stocks = [];
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        await Inventory.findById(product._id, (err, item) => {
            console.log(item);
            stocks.push(item.stock);
        }).clone().catch(function(err){ console.log(err)})
    }
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
      await Inventory.findByIdAndUpdate(product._id, { $set: { stock: stocks[i] - product.quantity } },(err,value)=>console.log(value)).clone().catch(function(err){ console.log(err)});
    }
    const order = new Orders(orderData);
    order.save((err, data) => {
        if (err) res.status(400).send(err);
        res.send(data);
    })
}
router.post('/stwo/placeOrder', (req, res) => {
    let orderData = req.body;
    const products = req.body.products;
    console.log(orderData);
    orderData = { ...orderData, date: new Date() };
    managingOrder(req, res, products, orderData);
   
})
router.post('/stwo/getOrders', async(req, res) => {
    const userId = req.body.userID;
    console.log("user",userId);
    let data = await Orders.find({ userID: userId });
    console.log(data);
    res.send(data);
})

module.exports = router;