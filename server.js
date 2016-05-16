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


app.post('/register', urlencodedParser, function (req, res) {
    var obj = {
        "username": req.body.username,
        "password": req.body.password,
    };
    if (obj.password != undefined && obj.username != undefined) {
        db.push("/users/users[]", obj, true);
        var x = db.getData("/users/users");

        x.forEach(function (entry) {
            console.log(entry.username);
        });
        res.cookie('username', req.body.username);

        res.sendStatus(200);
    } else {
        res.send(400, "Empty Fields")
    }
});


// listen (start app with node server.js) ======================================
app.listen(8000);
console.log("App listening on port 8080");