const express = require("express")
const channelApiController = require("./channelApiController")
const bodyParser = require('body-parser')
let channelApiRouter = express.Router()

module.exports = channelApiRouter
channelApiRouter.use("/", bodyParser.json());

function route(param) {
    channelApiRouter.route(`/${param}/:${param}`)
        .get(channelApiController.get)
        .put(channelApiController.put)
        .delete(channelApiController.delete)
}
route(`id`)
route(`name`)
route(`num`)

channelApiRouter.route("/")
   .get(channelApiController.getAll)
   .post(channelApiController.post)
