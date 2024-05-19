const express = require("express");
const { userLogin, userRegister } = require("../controllers/userController");
const router = express.Router();

router.route("/login").post(userLogin);
router.route("/signup").post(userRegister);

module.exports = router;
