const get_home_model = require("../models/get-home.model")
exports.get_home = (req, res, next) => {
    let category = req.query.category;
    if (category && category !== "all") {
        get_home_model.get_productbyid(category).then(products => {
            res.render("home", {
                products: products,
                isuser: req.session.userId,
                isadmin: req.session.admin
            })
        })
    } else {
        get_home_model.get_home_model().then(products => {
            console.log(`ccccc${req.session.admin}`)
            res.render("home", {
                products: products,
                isuser: req.session.userId,
                isadmin: req.session.admin
            })
        })
    }

}