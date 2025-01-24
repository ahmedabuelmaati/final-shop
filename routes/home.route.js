const route = require("express").Router()
const get_homeee = require("../controllers/get-home")
route.get("/", get_homeee.get_home)
module.exports = route