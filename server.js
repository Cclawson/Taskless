// server.js

// set up ========================
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var JsonDB = require('node-json-db');


var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(cookieParser());
var db = new JsonDB("myDataBase", true, true);

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
app.use(bodyParser.json());


app.post("/login", urlencodedParser, function (req, res) {
    var obj = {
        "username": req.body.username,
        "password": req.body.password
    };

    console.log(obj);
    var validuser = false;

    var users = db.getData("/users/users");

    users.forEach(function (entry) {
        if (entry.username == obj.username && entry.password == obj.password) {
            validuser = true;
            console.log("logged in");
            res.cookie('username', req.body.username);
            return false;
        }
    });

    if (validuser) {
        res.send(200, JSON.stringify(obj));
    } else {
        res.send(400, "Not a valid user");
    }
});

app.post('/register', urlencodedParser, function (req, res) {
    var obj = {
        "username": req.body.username,
        "password": req.body.password
    };
    var validuser = true;
    var x = db.getData("/users/users");

    x.forEach(function (entry) {
        if (entry.username == obj.username) {
            validuser = false;
            console.log("bad");
            return false;
        };
    });

    if (validuser) {
        console.log(obj);
        if (obj.username != undefined && obj.password != undefined) {
            db.push("/users/users[]", obj, true);
            res.cookie('username', req.body.username);
            res.send(200, JSON.stringify(obj));
        } else {
            //            res.send(400, "Emp");       
        }
    } else {
        res.send(400, "username taken");
    }
});


// listen (start app with node server.js) ======================================
app.listen(8000);
console.log("App listening on port 8080");