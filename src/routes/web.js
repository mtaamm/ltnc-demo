const express = require('express')
const router = express.Router()
const controller = require('../controllers/homeController')

router.get('/', controller.getHomePage)
router.get('/loginPage', controller.getLoginPage)
router.get('/signUpPage', controller.getSignUpPage)
router.get('/logout', controller.getLogoutPage)
router.get('/adminWorkspace', controller.checkAdminLogin, controller.getAdminWorkspace)
router.get('/norUserWorkspace', controller.checkUserLogin, controller.getUserWorkspace)
router.post('/signup', controller.controllerRunSignUp);
router.post('/login', controller.controllerRunLogin);
router.post('/logout', controller.logout);

module.exports = router