const express = require('express');
const { router } = require('./router/routes')
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

app.use(router)

// app.use('/auth', require('./middleware'));

app.listen('3000', () => {
    console.log('Server Running at http://localhost:3000')
})