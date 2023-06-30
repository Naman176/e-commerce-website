const Inventory = require("../models/Inventory");
const TwoInventory = require("../models/stwoinventory");
const Users = require("../models/user");
const TwoUsers = require("../models/stwouser");
const Orders = require("../models/Order");
const TwoOrders = require("../models/stwoorder");
const {Router} = require('express');
const router = Router();
const multer = require('multer');

let name = "";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        name = uniqueSuffix + file.originalname;
      cb(null, uniqueSuffix+file.originalname )
    }
  })
  
const upload = multer({ storage: storage })


router.get('/sone/getProducts', (req, res) => {
  Inventory.find((err, data) => {
     if(err) res.status(400).json([]);
      res.send(data);
  })
})
router.get("/sone/getUsers", (req, res) => {
  Users.find((err, data) => {
    if (err) res.status(400).json([]);
    res.send(data);
  });
});
router.post("/sone/addProduct", upload.single("image"), async (req, res) => {
  console.log(req);
  let length = 0;
  const data = await Inventory.find();
  length = data.length;
  console.log(length, data[length - 1]);
  const productData = {
    productID: data.length !== 0 ? data[length - 1].productID + 1 : 1,
    productName: req.body.productName,
    stock: req.body.stock,
    productType: req.body.productType,
    category: req.body.category,
    price: req.body.price,
    discountedPrice: req.body.discountedPrice,
    image: name,
  };
  // console.log(productData);
  const product = new Inventory(productData);
  product.save((err, data) => {
    if (err) res.status(400).send(err);
    res.send(data);
  });
});
router.post("/sone/modifyProduct", async (req, res) => {
  let newproduct = req.body;
  console.log(newproduct);
  try {
    let response = await Inventory.replaceOne(
      { productID: newproduct.productID },
      newproduct
    );
    res.send(response);
  } catch (err) {
    res.send(err);
  }
});
router.post("/sone/deleteProduct", async (req, res) => {
  let newproduct = req.body;
  console.log(newproduct);
  try {
    let response = await Inventory.deleteOne({
      productID: newproduct.productID,
    });
    res.send(response);
  } catch (err) {
    res.send(err);
  }
});
router.post("/sone/modifyImage", upload.single("image"), async (req, res) => {
  const productData = {
    productID: req.body.productID,
    productName: req.body.productName,
    stock: req.body.stock,
    productType: req.body.productType,
    category: req.body.category,
    price: req.body.price,
    discountedPrice: req.body.discountedPrice,
    image: name,
  };
  console.log(productData);
  try {
    let response = await Inventory.replaceOne(
      { productID: productData.productID },
      productData
    );
    res.send(response);
  } catch (err) {
    res.send(err);
  }
});
router.get("/sone/getallorders", async (req, res) => {
  let orders = await Orders.find();
  res.send(orders);
});
router.post("/sone/updateStatus", async (req, res) => {
  const order = await Orders.findByIdAndUpdate(
    { _id: req.body._id },
    { status: req.body.status }
  );
  res.send(order);
});




router.get('/stwo/getProducts', (req, res) => {
  TwoInventory.find((err, data) => {
     if(err) res.status(400).json([]);
      res.send(data);
  })
})
router.get("/stwo/getUsers", (req, res) => {
  TwoUsers.find((err, data) => {
    if (err) res.status(400).json([]);
    res.send(data);
  });
});
router.post("/stwo/addProduct", upload.single("image"), async (req, res) => {
  let length = 0;
  const data = await TwoInventory.find();
  length = data.length;
  console.log(length, data[length - 1]);
  const productData = {
    productID: data.length !== 0 ? data[length - 1].productID + 1 : 1,
    productName: req.body.productName,
    stock: req.body.stock,
    productType: req.body.productType,
    category: req.body.category,
    price: req.body.price,
    discountedPrice: req.body.discountedPrice,
    image: name,
  };
  // console.log(productData);
  const product = new TwoInventory(productData);
  product.save((err, data) => {
    if (err) res.status(400).send(err);
    res.send(data);
  });
});
router.post("/stwo/modifyProduct", async (req, res) => {
  let newproduct = req.body;
  console.log(newproduct);
  try {
    let response = await TwoInventory.replaceOne(
      { productID: newproduct.productID },
      newproduct
    );
    res.send(response);
  } catch (err) {
    res.send(err);
  }
});
router.post("/stwo/deleteProduct", async (req, res) => {
  let newproduct = req.body;
  console.log(newproduct);
  try {
    let response = await TwoInventory.deleteOne({
      productID: newproduct.productID,
    });
    res.send(response);
  } catch (err) {
    res.send(err);
  }
});
router.post("/stwo/modifyImage", upload.single("image"), async (req, res) => {
  const productData = {
    productID: req.body.productID,
    productName: req.body.productName,
    stock: req.body.stock,
    productType: req.body.productType,
    category: req.body.category,
    price: req.body.price,
    discountedPrice: req.body.discountedPrice,
    image: name,
  };
  console.log(productData);
  try {
    let response = await TwoInventory.replaceOne(
      { productID: productData.productID },
      productData
    );
    res.send(response);
  } catch (err) {
    res.send(err);
  }
});
router.get("/stwo/getallorders", async (req, res) => {
  let orders = await TwoOrders.find();
  res.send(orders);
});
router.post("/stwo/updateStatus", async (req, res) => {
  const order = await TwoOrders.findByIdAndUpdate(
    { _id: req.body._id },
    { status: req.body.status }
  );
  res.send(order);
});


module.exports = router;