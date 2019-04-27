const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');


var cors = require('cors')
var connection = require('./conn');
var routes = require('./route');
var response = require('./res');

app.use((req,res,next)=>{
    global.connection = connection;
    global.response = response;
    next()
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: true}))

routes(app);

app.use((req, res, next)=>{
    var err = new Error('no page mate');
    err.status = 404;
    next(err);
});

app.listen(port);
console.log("server running at 3000");