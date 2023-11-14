const userStatus = (req, res, next) => {
    res.locals.loggedUser = req.session.currentUser
    //   
    next()
}

module.exports = { userStatus }