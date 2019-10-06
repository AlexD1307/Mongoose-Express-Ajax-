const Channel = require("./Channel")

let channelApiController = {}

module.exports = channelApiController

channelApiController.getAll = (req, res) => {
    Channel.find({}, (err, users) => {
        if (err) {
            res.send(err)
        } else {
            res.json(users)
        }
    })
}

channelApiController.get = (req, res) => {
    let id = req.params.id
    let name = req.params.name
    let num = req.params.num
    find = (err, user) => {
        if (user) {
            res.json(user)
        } else {
            res.status(404)
            res.end()
        }
    }

    if (id) {
        Channel.findById( id, (err, user) => find(err, user) )
    } else if (name) {
        Channel.findOne( {name: name}, (err, user) => find(err, user) )
    } else if (num) {
        Channel.findOne( {num: num}, (err, user) => find(err, user) )
    } else {
        res.status(404)
        res.end()
    }
}

channelApiController.post = (req, res) => {
    Channel.create(req.body, (err, user) => {
        if (err) {
            res.status(400)
            res.end()
        } else {
            res.status(201)
            res.set("Location", `${req.baseUrl}/${user.id}`)
            res.end()
        }
    })
}

channelApiController.put = (req, res) => {
   Channel.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}, (err, updatedChannel) => {
      if (updatedChannel) {
         res.end()
      } else if (err) {
         if (err.name === "ValidationError") {
            res.status(400)
         } else {
            res.status(404)
         }
         res.end()
      } else {
         res.status(404)
         res.end()
      }
   })
}

channelApiController.delete = (req, res) => {
    let id = req.params.id
    let name = req.params.name
    let num = req.params.num
    check = (err, deletedChannel) => {
        if (deletedChannel) {
            res.end()
        } else {
            res.status(404)
            res.send(err)
        }
    }
    if (id) {
        Channel.findByIdAndRemove(id, (e, deleted) => check(e, deleted))
    } else if (name) {
        Channel.deleteOne({name: name}, (e, deleted) => check(e, deleted))
    } else if (num) {
        Channel.deleteOne({num: num}, (e, deleted) => check(e, deleted))
    } else {
        res.status(404)
        res.send(err)
    }
}
