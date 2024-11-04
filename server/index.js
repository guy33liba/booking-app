import express from "express"
import cors from "cors"
import User from "./models/User.js"

const app = express()

app.use(express.json())
app.use(cors({ credentials: "true", origin: "http://localhost:3000" }))

app.post("/register", (req, res) => {
  const { name, password, email } = req.body
  res.json({ name, password, email })
})
app.listen(4000)
