const express = require("express");
const {
  getAllProducts,
  getNewCollections,
  getPopularInWomen,
  addToCart,
  removeFromCart,
  getCart,
  addProduct,
  removeProduct,
} = require("../controllers/productController");
const { fetchAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/allproducts").get(getAllProducts);
router.route("/newcollections").get(getNewCollections);
router.route("/popularinwomen").get(getPopularInWomen);
router.route("/addtocart").post(fetchAuthenticatedUser, addToCart);
router.route("/removefromcart").post(fetchAuthenticatedUser, removeFromCart);
router.route("/getcart").post(fetchAuthenticatedUser, getCart);

//Admin Routes
router.route("/addproduct").post(addProduct);
router.route("/removeproduct").post(removeProduct);


module.exports = router;
