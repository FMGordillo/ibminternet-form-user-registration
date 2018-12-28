const express = require("express")
const http = require("http")
const path = require("path")
const port = process.env.PORT || 3000
const app = express()

app.use(express.static(path.join(__dirname, "build")))

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

const server = http.createServer(app)

server.listen(port)
server.on("listening", () => {
  console.log(`Server running on ${port}`)
})
