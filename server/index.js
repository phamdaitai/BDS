var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const http = require('http');

// import de su dung process.env va bien global
require('dotenv').config();
require('./global');

// khoi tao models mac dinh cho db mac dinh ban dau la base_structure
const { initModels } = require('./helpers/dbHelpers');
const models = require('./models');
initModels(CLIENT_CONNECTION, models);

// khai bao cac route
const user = require('./modules/user/user.route');
const auth = require('./modules/auth/auth.route');
const post = require('./modules/post/post.route');
const country = require('./modules/country/country.route');
const upload = require('./modules/upload/upload.route');
const category = require('./modules/category/category.route');
const payment = require('./modules/payment/payment.route');
const fee = require('./modules/fee/fee.route');

var app = express();

app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());


app.use("/user", user);
app.use("/auth", auth);
app.use("/post", post);
app.use("/country", country);
app.use("/upload", upload);
app.use("/category", category);
app.use("/payment", payment);
app.use("/fee", fee);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server is running at localhost:" + port);
});
// -----------------------START SERVER SUCCESSFULLY---------------------------

// Kiem tra outdated cua the VIP, 1 gio kiem tra 1 lan
const options = {
    port,
    path: '/post/check-outdated-vip',
    method: 'PATCH'
};

setInterval(() => {
    http.request(options, function(res) {
        res.on('data', function () {});
      }).end();
}, 10000);

