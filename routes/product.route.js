const route = require("express").Router()
const model = require("../models/get-home.model")
route.get("/:id", (req, res, next) => {
    const id = req.params.id
    console.log(id)
    model.getproductmodel(id).then(product => [
        res.render("product", {
            product: product,
            isuser: req.session.userId
        })
    ])
})
module.exports = route