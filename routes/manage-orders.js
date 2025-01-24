const route = require("express").Router()
const model = require("../models/cart.module")
const bp = require("body-parser")
// const model2 = require("../models/sineup.model")


route.post("/add", bp.urlencoded({ extended: true }), (req, res, next) => {
    model.manage(req.session.userId).then(elements => {
        console.log(elements)
        req.flash("felements", elements)
        res.render("manage-orders", {

            elements: elements,
            un: req.flash("fue"),
            isuser: req.session.userId,
            isadmin: req.session.admin
        })
    }).catch(err => {
        console.log(err)
    })

})

route.post("/add1", bp.urlencoded({ extended: true }), (req, res, next) => {
    model.manage(req.body.elementid).then(element => {
        console.log(element)
        req.flash("felements", element)
        res.render("manage-orders", {

            element: element,
            elements: req.flash("felements"),
            isuser: req.session.userId,
            isadmin: req.session.admin

        })
    }).catch(err => {
        console.log(err)
    })

})
route.get("/", (req, res, next) => {
    res.render("manage-orders", {
        elements: req.flash("felements"),
        isuser: req.session.userId,
        isadmin: req.session.admin


    })
})
// route.get("/", (req, res, next) => {
//     model2.getun(req.session.userId).then(user => {

//     }).catch(err => {
//         console.log(err)
//     })
// })

module.exports = route