const express = require('express')
const router = express.Router()
const {getHomePage, getSignInPage, getTestPage, controllerRunSignIn} = require('../controllers/homeController')

router.get('/', getHomePage)

router.get('/signInPage', getSignInPage)

router.get('/test', getTestPage)

router.post('/signin', controllerRunSignIn);

module.exports = router