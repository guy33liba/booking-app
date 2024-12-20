import express from "express"
import cors from "cors"
import User from "./models/User.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = "secret_key"
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
  const userDoc = await User.findOne({ email })

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err
          res.cookie("token", token).json(userDoc)
        },
      )
    } else {
      res.status(422).json("pass not ok")
    }
  } else {
    res.json("not found")
  }
})
app.get("/profile", async (req, res) => {
  res.json("user info")
})

app.listen(4000, console.log("hello"))
