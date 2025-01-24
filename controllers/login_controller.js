const loginmodel = require("../models/sineup.model")
const validationresult = require("express-validator").validationResult;
exports.post_login_mw = ((req, res, next) => {
    let x = validationresult(req).array()
    if (x.length === 0) {
        loginmodel.login_model(req.body.email, req.body.password).then(user => {
            req.session.userId = user._id,
                req.session.admin = user.admin,
                res.redirect("/")

        }).catch(err => {
            res.redirect("/login")
            req.flash("loginflash", err)
            console.log(err)
        })
    } else {
        res.render("login", {
            err: validationresult(req).array(),
            isuser: req.session.userId
        })
    }


})