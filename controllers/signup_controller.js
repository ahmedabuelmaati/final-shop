const postsineup = require("../models/sineup.model")

const valres = require("express-validator").validationResult;

exports.get_sign_up = (req, res, next) => {


    res.render("signup", {
        err: req.flash("validation-errors"),
        isuser: req.session.userId,
        isadmin: req.session.admin
    })


}
exports.postsineupcontroller = (req, res, next) => {
    let err = valres(req).array()

    console.log(`error ${err} `)
    if (err.length === 0) {
        console.log(err)

        postsineup.postsineup(req.body.name, req.body.email, req.body.password).then(() => {
            // console.log(`user${userr}`)
            res.redirect("/login")

        }).catch(err => {
            res.redirect("/signup")
            console.log(err)
        })
    } else {
        console.log("sorryyyyyy")
        res.render("signup", {
            err: valres(req).array()
        })
    }

}
