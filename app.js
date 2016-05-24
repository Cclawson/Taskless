// server.js

// set up ========================
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var JsonDB = require('node-json-db');
var moment = require('moment');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(cookieParser());
var db = new JsonDB("myDataBase", true, true);

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
app.use(bodyParser.json());




app.get('/home', function (req, res) {
    var data = db.getData("/users/assignments");
    var userdata = [];
    var userid = req.cookies['username'];
    data.forEach(function (entry) {
        if (entry.userID == userid) {
            userdata.push(entry);
        }
    });


    res.send(200, userdata);

});

app.get('/teacher', function (req, res) {
    var data = db.getData("/users/teachers");
    var userdata = [];
    var userid = req.cookies['username'];
    data.forEach(function (entry) {
        if (entry.userId == userid) {
            userdata.push(entry);
        }
    });


    res.send(200, userdata);
});

app.get('/events', function (req, res) {
    var data = db.getData('/users/assignments');
    var events = [];

    var userid = req.cookies['username'];
    data.forEach(function (entry) {
        if (entry.userID == userid) {
            events.push({
                id: entry.userID,
                title: entry.name,
                start: moment(entry.StartDate),
                end: moment(entry.EndDate),
                color: entry.color,
                textColor: "#000",
                allDay: false
            });
        }
    });
    res.send(200, JSON.stringify(events));
})

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
        }
    } else {
        res.send(400, "username taken");
    }
});


app.post('/addassignment', urlencodedParser, function (req, res) {
    var obj = {
        "name": req.body.name,
        "class": req.body.className,
        "difficulty": req.body.rating,
        "userID": req.body.userId,
        "StartDate": req.body.StartDate,
        "EndDate": req.body.EndDate,
        "color": req.body.color
    };

    var data = db.getData('/users/assignments');

    var duplicateentry = false;

    data.forEach(function (entry) {
        if (entry.name == obj.name && entry.userID == obj.userID) {
            res.send(400, "You already have an assignment under this name.");
            duplicateentry = true;
        }

    });

    if (!duplicateentry) {
        if (obj.StartDate == undefined || obj.EndDate == undefined) {

            res.send(400, "No dates specified");
        } else {
            db.push("/users/assignments[]", obj, true);
            res.send(200, JSON.stringify(obj));
        }
    }
});

app.post('/removeassignment', urlencodedParser, function (req, res) {
    var obj = {
        "user": req.body.user,
        "name": req.body.name
    };

    var data = db.getData('/users/assignments');
    var counter = 0;
    data.forEach(function (entry) {

        if (entry.userID == obj.user && entry.name == obj.name) {
            db.delete("/users/assignments[" + counter + "]");
        };
        counter++;
    });
});


app.post('/addteacher', urlencodedParser, function (req, res) {
    var obj = {
        "name": req.body.name,
        "class": req.body.className,
        "email": req.body.email,
        "phone": req.body.phone,
        "userId": req.body.userId
    };
    console.log(obj);
    db.push("/users/teachers[]", obj, true);

    var data = db.getData("/users/teachers");
    var userdata = [];
    var userid = req.cookies['username'];
    data.forEach(function (entry) {
        if (entry.userId == userid) {
            userdata.push(entry);
        }
    });

    res.send(200, userdata);
})

// listen (start app with node server.js) ======================================
app.listen(3000);
console.log("App listening on port 3000");