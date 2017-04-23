var express = require("express");
var md5 = require("md5");
var app = express();

var path = require('path');
var users = require('./users.json');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/about', function(req, res) {
    res.send("This is about page !");
});

app.post('/login', function(req, res) {
    console.log(req.body); // This your request data
    var token = md5(new Date().toString());

    var findUser = "";

    users.forEach(function(user, index) {
        if (user.login == req.body.login && user.password == req.body.password) {
            users[index].token = token;
            findUser = "1";
        }
    });

    if (findUser.length > 0) {
        res.send({
            result: true,
            token: token
        });
    } else {
        res.send({ result: false });
    }
});

app.post("/token", function(req, res) {
    var findUser = users.filter(function(user) {
        return user.token == req.body.token;
    });

    if (findUser.length > 0) {
        res.send({ result: true })
    } else {
        res.send({ result: false })
    }
})


app.listen(3000, function() {
    console.log("Server is working on http://localhost:3000/");
});