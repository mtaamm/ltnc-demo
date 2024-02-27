const express = require('express')
const router = express.Router()
const {getHomePage, getSignUpPage, getTestPage, controllerRunSignUp} = require('../controllers/homeController')

router.get('/', getHomePage)

router.get('/signUpPage', getSignUpPage)

router.get('/test', getTestPage)

router.post('/signup', controllerRunSignUp);

module.exports = router