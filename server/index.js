import express from "express"
import cors from "cors"
import User from "./models/User.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"

const bcryptSalt = bcrypt.genSaltSync(10)
const app = express()
dotenv.config()
mongoose.connect(process.env.MONGO_URL)

app.use(express.json())
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))

app.get("/test", (req, res) => {
  res.json("test ok")
})

app.post("/register", async (req, res) => {
  const { name, password, email } = req.body
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    })
    res.json(userDoc)
  } catch (error) {
    res.status(422).json(error)
  }
})
app.post("/login", async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.status(404).json({ message: "User not found" })
  const isMatch = bcrypt.compareSync(password, user.password)
  if (!isMatch) return res.status(401).json({ message: "Invalid password" })
  res.json({ message: "Login successful" })
})
app.listen(4000, console.log("hello"))
