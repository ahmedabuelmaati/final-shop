const mongoose = require("mongoose");
const { isadmin } = require("../routes/authguard");
const u_she = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    confirmpassword: String,
    admin: String
})
const user = mongoose.model("user", u_she)

exports.postsineup = ((name, email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect("mongodb://localhost:27017/online-shop").then(() => {
            return user.findOne({ email: email })

        }).then(u => {
            if (u) {
                mongoose.disconnect()
                reject("this email used before")
            } else {
                let userr = new user({
                    name: name,
                    email: email,
                    password: password,
                    admin: "false"
                })
                return userr.save()
            }
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
})


exports.login_model = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect("mongodb://localhost:27017/online-shop").then(() => {
            user.findOne({ email: email }).then(user => {
                if (!user) {
                    mongoose.disconnect()

                    reject("no user matches")
                } else {
                    if (user.password !== password) {
                        mongoose.disconnect()
                        reject("incorrect password")

                    } else {
                        mongoose.disconnect()
                        resolve(user)
                    }

                }
            })
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}
exports.getun = (userid) => {
    return new Promise((resolve, reject) => {
        mongoose.connect("mongodb://localhost:27017/online-shop").then(() => {
            user.findOne({ _id: userid }).then(user => {
                mongoose.disconnect()
                resolve(user)
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}


