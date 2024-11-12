import express from "express"
import cors from "cors"
import User from "./models/User.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
const app = express()
dotenv.config()
mongoose.connect(process.env.MONGO_URL)

const bcryptSalt = bcrypt.genSalt(10)

app.use(express.json())
app.use(cors({ credentials: "true", origin: "http://localhost:3000" }))
app.get("/test", (req, res) => {
  res.json("test ok")
})
app.post("/register", async (req, res) => {
  const { name, password, email } = req.body
  const userDoc = await User.create({
    name,
    password: bcrypt.hashSync(password, bcryptSalt),
    email,
  })
  res.json(userDoc)
})
app.listen(4000, console.log("hello"))
