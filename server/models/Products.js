import mongoose from "mongoose"

const productSchema = mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "users", require: true },
  name: { type: String, require: true },
  endTime: { type: Date, required: true },
  startingBid: { type: Number, min: 1, require: true },
  activeBid: {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    amount: { type: Number, min: 1 },
    time: { type: Date, default: Date.now }
  },
  bidHistory: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    amount: { type: Number, min: 1 },
    time: { type: Date, default: Date.now }
  }],
  description: String,
  images: [String]
})

const Products = mongoose.model("products", productSchema)

export default Products