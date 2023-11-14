const updateLoggedUser = (req, res, next) => {
    if (req.session && req.session.currentUser) {
        res.locals.logged = true;
    } else {
        res.locals.logged = false;
    }
    return (res.locals.logged)
}
module.exports = { updateLoggedUser };
