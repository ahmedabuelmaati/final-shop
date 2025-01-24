const route = require("express").Router()
const multer = require("multer")
const model = require("../models/get-home.model")
route.get("/", (req, res, next) => {
    res.render("Additem", {
        isuser: req.session.userId,
        isadmin: req.session.admin
    })
})
route.post("/", multer({
    storage: multer.diskStorage({
        destination: ((req, file, cb) => {
            cb(null, "images");

        }),
        filename: ((req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname)
        })

    })
}).single("image"), (req, res, next) => {
    console.log(req.body)
    // console.log(req.file)

    model.add(

        req.body.name,
        req.body.price,
        req.body.category,
        req.file.filename


    ).then(p => {
        res.redirect("/")
        console.log(req.file)


    }).catch(err => {
        console.log(err)
    })
})
module.exports = route