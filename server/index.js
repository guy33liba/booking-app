import express from "express"
import cors from "cors"
import User from "./models/User.js"
const app = express()

app.use(cors({ credentials: "true", origin: "http://localhost:3000" }))
app.use(express.json())

app.post("/register", (req, res) => {
  const { name, password, email } = req.body
  res.json({ name, password, email })
})
app.listen(4000)
