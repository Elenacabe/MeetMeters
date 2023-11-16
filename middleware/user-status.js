
const updateLoggedUser = (req, res, next) => {
    const result = {}

    result.logged = req.session && req.session.currentUser

    result.guide = req.session && req.session.currentUser && req.session.currentUser.role === "GUIDE"
    result.admin = req.session && req.session.currentUser && req.session.currentUser.role === "ADMIN"
    result.rights = req.session && req.session.currentUser && (req.session.currentUser.role === "GUIDE" || req.session.currentUser.role === "ADMIN")

    res.locals.result = result


    next()
}

module.exports = { updateLoggedUser }