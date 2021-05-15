var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

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

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server is running at localhost:" + port);
});

