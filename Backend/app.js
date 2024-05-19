const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDatabase = require("./config/database");
const multer = require("multer");
const path = require("path");
// Route Imports
const productRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cors());

//Connecting database
connectDatabase();

//Root Endpoint
app.get("/", (req, res) => {
    res.send("You are lovely!");
});

app.use(productRoute);
app.use(userRoute);

//Image Storage Engine 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        console.log(file);
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
    
const upload = multer({ storage: storage })
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `${process.env.BASE_URL}/images/${req.file.filename}`
    })
})
app.use('/images', express.static('upload/images'));

module.exports = app;