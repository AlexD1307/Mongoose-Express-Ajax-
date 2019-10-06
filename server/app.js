const mongoose = require("mongoose")
const express = require("express")
const channelApiRouter = require("./TV/channelApiRouter")

mongoose.connect("mongodb://localhost:27017/channeldb", { useNewUrlParser: true })

const app = express()

app.use(express.static(__dirname + '/../public'))
app.use("/api/channels", channelApiRouter)

app.listen(3000)