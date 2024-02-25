const express = require('express')
const bodyParser = require('body-parser');
require('dotenv').config()

const path = require('path')
const app = express()
const configViewEngine = require('./config/viewEngine')
const webRouter = require('./routes/web')

const port = process.env.PORT || 8888
const hostname = process.env.HOST_NAME

//config template engine, static file
configViewEngine(app)

//cái này để dùng req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//khai báo router
app.use('/', webRouter)

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})