const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be provided"],
    maxlength: [20, "Maximum length of the name is 20 characters"],
  },
  price: {
    type: Number,
    required: [true, "Price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }, 
  company: {
    type: String,
    enum: {
        values: ["ikea", "liddy", "caressa", "marcos"],
        message: "{VALUE} is not provided"
    }
  }
});


module.exports = mongoose.model("Product", ProductSchema)
