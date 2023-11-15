const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const uploaderMiddleware = require('../middleware/uploader-middleware')
const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard")
const saltRounds = 10

// Signup
router.get('/signUp', (req, res, next) => res.render('auth/signup'))
router.post('/signUp', uploaderMiddleware.single('avatar'), (req, res, next) => {

    const { path: avatar } = req.file
    const { email, password, username, about } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => User.create({ email, password: hashedPassword, username, about, avatar }))
        .then(() => res.redirect('/'))
        .catch(error => next(error))
})



// Login
router.get('/logIn', (req, res, next) => res.render('auth/login'))
router.post('/logIn', (req, res, next) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email no registrado en la Base de Datos' })
                return
            } else if (bcrypt.compareSync(password, user.password) === false) {
                res.render('auth/login', { errorMessage: 'La contraseña es incorrecta' })
                return
            } else {
                req.session.currentUser = user
                res.redirect('/gallery')
            }
        })
        .catch(error => next(error))
})


// Logout
router.post('/logOut', isLoggedIn, (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})

module.exports = router
