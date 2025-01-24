

const route = require("express").Router()
route.post("/", (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
})
module.exports = route