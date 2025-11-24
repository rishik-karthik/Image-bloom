import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";

import Image from "./user.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//set view engine
app.set("view engine", "ejs");
//join path
app.set('views', path.join(__dirname, "views"));

//over-write method
app.use(methodOverride("_method"));

// --- 1. STORAGE CONFIG ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to store images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); 
  }
});

const upload = multer({ storage });
// --------------

app.get("/", async (req, res) =>{
    let images = await Image.find();
    res.render("index.ejs", {images});
});

//add
app.post("/upload", upload.single("image"), async (req, res) =>{
    const newImage = await new Image({
        name : req.body.name,
        imageURL : "/uploads/" + req.file.filename,
    }).save();

    res.redirect("/");
});
//delete
app.delete("/upload/:id", async (req, res) =>{
    let {id} = req.params;
    let delImage = await Image.findByIdAndDelete(id);
    res.redirect("/");
})
//expose the upload folder
app.use("/uploads", express.static("uploads"));

app.listen(8080, () =>{
    console.log("Server listening: http://localhost:8080/");
})