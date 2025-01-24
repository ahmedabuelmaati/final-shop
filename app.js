const express = require('express')
const app = express()
const home_router = require("./routes/home.route")
const productroute = require("./routes/product.route")
const sign_up_router = require("./routes/signup")
const manageorders = require("./routes/manage-orders")
const cart_router = require("./routes/cart.rout")
const flash = require("connect-flash")
const logoutrouter = require("./routes/logout")
const login_router = require("./routes/loginrout")
const session = require("express-session")
const additemroute = require("./routes/Additem")
const sessionStore = require("connect-mongodb-session")(session)
const Store = new sessionStore({
    uri: "mongodb://localhost:27017/online-shop",
    collection: "sessions"
})
const path = require('path')

app.use(express.static(path.join(__dirname, "images")))
app.use(flash())
app.use(express.static(path.join(__dirname, "assets")))
app.use(session({
    secret: "hello every body in our session",
    saveUninitialized: false,
    store: Store,
    // resave: true

}))
app.set("view engine", "ejs")
app.set("views")

app.use("/", home_router)
app.use("/manage-orders", manageorders)
app.use("/product", productroute)
app.use("/login", login_router)
app.use("/signup", sign_up_router)
app.use("/logout", logoutrouter)
app.use("/cart", cart_router)
app.use("/Additem", additemroute)
app.listen(3000, () => {
    console.log("app is listening")
})