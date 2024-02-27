const signUpFunc = require('../models/signUp.js')

const getHomePage = (req, res) => {
    res.render('homePage.ejs')
}

const getSignUpPage = (req, res) => {
    res.render('signUpPage.ejs')
}

const getTestPage = (req, res) => {
    res.render('homePage.ejs')
}

const controllerRunSignUp = (req, res) => {
    console.log(req.body)
    const {username, password} = req.body
    signUpFunc(username, password)
}

module.exports = {
    getHomePage, getSignUpPage, getTestPage, controllerRunSignUp
}