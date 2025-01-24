
const mongoose = require("mongoose");
const product_sch = mongoose.Schema({
    name: String,
    price: String,
    category: String,
    image: String
})
const product = mongoose.model("product", product_sch)
exports.get_home_model = () => {
    return new Promise((acc, rej) => {
        mongoose.connect("mongodb://localhost:27017/online-shop").then(() => {
            console.log("db connected")
            return product.find({})
        }).then(products => {
            mongoose.disconnect()
            acc(products)

        }).catch((err) => rej(err))
    })
}
exports.get_productbyid = (category) => {
    return new Promise((resolve, reject) => {
        mongoose.connect("mongodb://localhost:27017/online-shop").then(() => {
            return product.find({ category: category })
        }).then(product => {
            mongoose.disconnect()
            resolve(product)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}
exports.getproductmodel = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect("mongodb://localhost:27017/online-shop").then(() => {
            console.log("connnnected")
            product.findById(id).then(product => {
                console.log(product)
                mongoose.disconnect()
                resolve(product)
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}
exports.add = (n, p, c, i) => {
    return new Promise((resolve, reject) => {
        mongoose.connect("mongodb://localhost:27017/online-shop").then(() => {
            let newp = new product({
                name: n,
                price: p,
                category: c,
                image: i
            }

            )
            newp.save().then(() => {

                mongoose.disconnect()
                resolve(newp)
            }).catch(() => {
                mongoose.disconnect()
                reject()
            })
        })
    })
}