const check = require("express-validator").check
const route = require("express").Router()
const signup = require("../controllers/signup_controller")
const bp = require("body-parser")
route.get("/", signup.get_sign_up)
route.post("/", bp.urlencoded({ extended: true }),
    check("name").not().isEmpty().withMessage("write your name"),
    check("email").not().isEmpty().withMessage("email required"),
    check("password").not().isEmpty().withMessage("password required"),
    check("confirm-password").custom((value, { req }) => {
        if (value === req.body.password) return true
        else throw "password not the same"
    }).withMessage("password not the same")
    ,
    signup.postsineupcontroller)

module.exports = route