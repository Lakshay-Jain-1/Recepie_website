const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/recepiebook")
  .then(() => {
    console.log("Database is connected ");
  })
  .catch((err) => {
    console.log(err);
  });

const userschema = new mongoose.Schema({
  // dish name dish image dish steps  , dish ingredents
  name: String,
  imageurl: String,
  
  ingredients: Array,
});

const user = mongoose.model("recepie", userschema);
module.exports = user;
