var express = require('express');
var bodyParser = require('body-parser');

// import de su dung process.env va bien global
require('dotenv').config();
require('./global');

// khoi tao models mac dinh cho db mac dinh ban dau la base_structure
const { initModels } = require('./helpers/dbHelpers');
const models = require('./models');
initModels(CLIENT_CONNECTION, models);

// khai bao cac route
const user = require('./modules/user/user.route');


var app = express();

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());

app.use("/user", user);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server is running at localhost:" + port);
});

