const signInFunc = require('../models/signIn.js')

const getHomePage = (req, res) => {
    res.render('homePage.ejs')
}

const getSignInPage = (req, res) => {
    res.render('signInPage.ejs')
}

const getTestPage = (req, res) => {
    res.render('homePage.ejs')
}

const controllerRunSignIn = (req, res) => {
    console.log(req.body)
    const {username, password} = req.body
    signInFunc(username, password)
}

module.exports = {
    getHomePage, getSignInPage, getTestPage, controllerRunSignIn
}