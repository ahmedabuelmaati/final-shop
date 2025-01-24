

const route = require("express").Router()
const bp = require("body-parser")
const model = require("../models/cart.module")
const authuser = require("../routes/authguard")

route.post("/", bp.urlencoded({ extended: true }), (req, res, next) => {
    // console.log(
    //     req.body.name,
    //     req.body.amount,
    //     req.session.userId,
    //     req.body.id,
    //     req.body.price,
    //     Date.now()
    // )
    model.postelement(req.body.id,
        +req.body.amount,
        {
            name: req.body.name,
            amount: +req.body.amount,
            userid: req.session.userId,
            elementid: req.body.id,
            price: +req.body.price,
            timestamp: Date.now()

        }
    ).then(() => {
        console.log(`hello ${3 * 5}`)
        console.log(+req.body.amount * +req.body.price, req.session.userId)

        res.redirect("/cart")
        // let a = +req.body.amount;
        // let b = +req.body.price;
        // let c = a * b;
        // console.log(c)
        // console.log(typeof (a))
        // console.log(typeof (b))

    })
})

route.get("/", authuser.isuser, (req, res, next) => {
    model.getelment(req.session.userId).then(elements => {
        // console.log((elements))
        res.render("cart", {
            elements: elements,
            isuser: req.session.userId,
            isadmin: req.session.admin
        })
    }).catch(err => {
        console.log(err)
    })
})
route.post("/save", bp.urlencoded({ extended: true }), (req, res, next) => {
    model.saveitem(req.body.elementid, { amount: req.body.amount, timestamp: Date.now() }).then(() => {
        // console.log(req.body.elementid,
        //     req.body.amount
        // )
        res.redirect("/cart", {
            isuser: req.session.userId,
            isadmin: req.session.admin
        })
    })
})

route.post("/delete", bp.urlencoded({ extended: true }), (req, res, next) => {
    model.deleteitem(req.body.elementid).then(() => {
        res.redirect("/cart")
    })
})
route.post("/deleteall", bp.urlencoded({ extended: true }), (req, res, next) => {
    model.deleteall(req.session.userId).then(() => {
        // console.log(req.body.userid)
        res.redirect("/cart")
    }).catch(err => {
        console.log(err)
    })
})
route.post("/changestatus", bp.urlencoded({ extended: true }), (req, res, next) => {

})

module.exports = route
