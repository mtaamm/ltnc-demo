const signUpFunc = require('../models/signUp.js')
const loginFunc = require('../models/login.js')

const getHomePage = (req, res) => {res.render('homePage.ejs')}

const getLoginPage =(req, res) => {res.render('loginPage.ejs')}

const getSignUpPage = (req, res) => {res.render('signUpPage.ejs')}

const getLogoutPage = (req, res) => {res.render('logoutPage.ejs')}

function checkAdminLogin(req, res, next) {
    if (req.session.loggedIn&&req.session.role=='admin') {
        return next(); // Tiếp tục nếu đã đăng nhập
    } else {
        res.redirect('/login'); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
    }
}

const getAdminWorkspace = (req, res) => {res.render('adminWorkspace.ejs')}

function checkUserLogin(req, res, next) {
    if (req.session.loggedIn&&req.session.role=='user') {
        return next(); // Tiếp tục nếu đã đăng nhập
    } else {
        res.redirect('/login'); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
    }
}

const getUserWorkspace = (req, res) => {res.render('norUserWorkspace.ejs')}

const controllerRunSignUp = async (req, res) => {
    console.log(req.body)
    const {username, password} = req.body
    var signUpResult = await signUpFunc(username, password)
    if (signUpResult==='success') {
        res.send('Success! Close this tab and Login!')
    } else if (signUpResult==='nameExisted') {
        res.send('Username already exists:(')
    } else if (signUpResult==='invalidPass') {
        res.send('Invalid Pass:(')
    } else if (signUpResult==='err') {
        res.send('Username or Password invalid:(')
    }
}

const controllerRunLogin = async (req, res) => {
    console.log(req.body)
    const {username, password} = req.body
    var loginResult = await loginFunc(username, password)
    console.log(loginResult)
    if (loginResult.isLogin) {
        req.session.loggedIn = true;
        req.session.username = username;
        req.session.role = loginResult.role;
        if (loginResult.role=='admin') {res.redirect('/adminWorkspace')}
        else if (loginResult.role=='user') {res.redirect('/norUserWorkspace')}
    } else {
        res.send('Username or Password is incorrect')
    }
}

const logout = (req, res) => {
    res.session.destroy();
    res.send("Log out complete!")
}



module.exports = {
    getHomePage, getLoginPage, getSignUpPage, getLogoutPage,
    controllerRunSignUp, controllerRunLogin, logout,
    checkAdminLogin, checkUserLogin, getAdminWorkspace, getUserWorkspace
}