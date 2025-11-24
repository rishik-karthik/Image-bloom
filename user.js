// getting-started.js
import mongoose from "mongoose";

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/gallery');
}

const userSchema = new mongoose.Schema({
    name : String,
    imageURL : String,
});

const Image = new mongoose.model("Image", userSchema);

export default Image;