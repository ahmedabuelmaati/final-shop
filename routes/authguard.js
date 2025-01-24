exports.isuser = (req, res, next) => {
    if (req.session.userId) next()
    else res.redirect('/login')
}
exports.notuser = (req, res, next) => {
    if (!req.session.userId) next()
    else res.redirect('/')
}
exports.isadmin = (req, res, next) => {
    if (req.session.admin) next()
    else res.redirect('/')
}