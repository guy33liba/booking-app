import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  name: { type: String },
  password: { type: String },
  email: { type: String },
})

const User = mongoose.model("User", userSchema)

export default User
