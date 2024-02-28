const express = require('express')
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config()
const admin = require('firebase-admin');

const serviceAccount = require('../hcmut-ltnc-232-6adb8-firebase-adminsdk-1gsru-231b51a067.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const path = require('path')
const app = express()
const configViewEngine = require('./config/viewEngine')
const webRouter = require('./routes/web')

const port = process.env.PORT || 8888
const hostname = process.env.HOST_NAME

//config template engine, static file
configViewEngine(app)
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

//cái này để dùng req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//khai báo router
app.use('/', webRouter)

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})