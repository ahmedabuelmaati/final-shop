const check = require("express-validator").check
const valerr = require("express-validator").validationResult

const route = require("express").Router()
const bp = require("body-parser")
const controller = require("../controllers/login_controller")
route.get("/", (req, res, next) => {

    res.render("login", {
        err: valerr(req).array(),
        isuser: req.session.userId,
        isadmin: req.session.admin
    }

    )
})
route.post("/",

    bp.urlencoded({ extended: true }),
    check("email").isEmail().withMessage("must be email"),


    check("password").not().isEmpty().withMessage("this field is required"),
    controller.post_login_mw)
module.exports = route