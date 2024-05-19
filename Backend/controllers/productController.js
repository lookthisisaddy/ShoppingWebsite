const Product = require('../models/productModel');
const Users = require('../models/userModel');

/* ----- Get all Products ------ */
exports.getAllProducts = async (req, res) => {
    let products = await Product.find({});
    console.log("All Products");
    res.send(products);
}

/* ----- Get new collections ------ */
exports.getNewCollections = async (req, res) => {
    let products = await Product.find({});
    let arr = products.slice(1).slice(-8);
    console.log("New Collections");
    res.send(arr);
}

/* ----- Get popular in women ------ */
exports.getPopularInWomen = async (req, res) => {
    let products = await Product.find({});
    let arr = products.splice(0, 4);
    console.log("Popular In Women");
    res.send(arr);
}

/* ----- Add To Cart ------ */
exports.addToCart = async (req, res) => {
    console.log("Add Cart");
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added")
}

/* ----- Remove from Cart ------ */
exports.removeFromCart = async (req, res) => {
    console.log("Remove Cart");
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] != 0) {
        userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed");
}

/* ----- Get Cart Details------ */
exports.getCart = async (req, res) => {
    console.log("Get Cart");
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData && userData.cartData);
}

/* ----- Add Product (Only Admin)------ */
exports.addProduct = async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else { id = 1; }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({ success: true, name: req.body.name })
}

/* ----- Remove Product (Only Admin)------ */
exports.removeProduct = async (req, res) => {
    const product = await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({ success: true, name: req.body.name })
}

