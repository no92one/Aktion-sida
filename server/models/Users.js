import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  username: { type: String, require: true },
  lowercaseUsername: { type: String, require: true },
  password: { type: String, require: true },
  watching: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
  bids: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
  sold: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }]
})

const Users = mongoose.model("users", userSchema)

export default Users