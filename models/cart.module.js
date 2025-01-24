
const mongoose = require("mongoose")


const element_sch = mongoose.Schema({
    name: String,
    amount: Number,
    userid: String,
    elementid: String,
    price: String,
    timestamp: String





})
const db = "mongodb://localhost:27017/online-shop"
const element = mongoose.model("element", element_sch)
// exports.get_elements = (userid) => {
//     return new Promise((resolve, reject) => {
//         mongoose.connect(db).then(() => {
//             element.find({ userid: userid }).then(elements => {
//                 mongoose.disconnect()
//                 resolve(elements)
//             })
//         }).catch(err => {
//             mongoose.disconnect()
//             reject(err)
//         })
//     })
// }
exports.postelement = (d1, d2, d3) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(db).then(() => {
            element.find({ elementid: d1 }).then(products => {

                if (products.length == 0) {
                    let newelement = new element(d3)
                    newelement.save().then(() => {
                        // console.log(newelement)
                        mongoose.disconnect()
                        resolve()
                    }).catch(err => {
                        mongoose.disconnect()
                        reject(err)
                    })
                } else {
                    console.log(products[0])
                    const amountt = products[0].amount + d2
                    console.log(amountt)
                    element.updateOne({ elementid: d1 }, { amount: amountt }).then(() => {
                        mongoose.disconnect()
                        resolve()
                    }).catch(err => {
                        mongoose.disconnect()
                        reject(err)
                    })
                }
            })
        })
    })
}
exports.getelment = (userid) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(db).then(() => {
            element.find({ userid: userid }, {}, { sort: { timestamp: 1 } }).then(elements => {
                mongoose.disconnect()
                resolve(elements)
            })
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}
exports.saveitem = (id, data) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(db).then(() => {
            return element.updateOne({ _id: id }, data)


        }).then(e => {
            console.log(e)
            mongoose.disconnect()
            resolve()
        }).catch(err => {

            mongoose.disconnect()
            reject(err)
        })
    })
}
exports.deleteitem = (id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(db).then(() => {
            element.findByIdAndDelete(id).then(() => {
                mongoose.disconnect()
                resolve()
            }).catch(err => {
                mongoose.disconnect()
                reject(err)

            })
        })
    })
})
exports.deleteall = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(db).then(() => {
            element.deleteMany({ userid: id }).then(() => {
                mongoose.disconnect()
                resolve()
            }).catch(err => {
                mongoose.disconnect()
                reject()
            })
        })
    })
}
exports.manage = (uid) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(db).then(() => {
            element.find({ userid: uid }).then(elements => {
                mongoose.disconnect()
                resolve(elements)
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}
exports.manage1 = (eid) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(db).then(() => {
            element.find({ elementid: eid }).then(element => {
                mongoose.disconnect()
                resolve(element)
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}