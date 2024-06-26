const Users = require('../models/userModel');
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY

//Login User
exports.userLogin = async (req, res) => {
    console.log("Login");
    let success = false;
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            success = true;
            console.log(user.id);
            const token = jwt.sign(data, SECRET_KEY);   //secret_ecom
            res.json({ success, token });
        }
        else {
            return res.status(400).json({ success: success, errors: "please try with correct email/password" })
        }
    }
    else {
        return res.status(400).json({ success: success, errors: "please try with correct email/password" })
    }
}

//Register User
exports.userRegister = async (req, res) => {
    console.log("Sign Up");
    let success = false;
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: success, errors: "existing user found with this email" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });
    await user.save();
    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, SECRET_KEY);
    success = true;
    res.json({ success, token })
}