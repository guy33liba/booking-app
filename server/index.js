import express from "express"
import cors from "cors"
const app = express()

app.use(cors({ credentials: "true", origin: "http://localhost:3000" }))
app.use(express.json())

app.get("/test", (req, res) => {
  res.json("test ok")
})
app.listen(4000)
