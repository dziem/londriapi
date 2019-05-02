var mysql = require('mysql');
/*
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "londri"
});
*/
//Format connString
//'mysql://myuser:mypass@myhost/mdb?charset=utf8_general_ci&timezone=-0700';
var connString = 'mysql://root:@localhost/londri?charset=utf8_general_ci&timezone=-0700';
 
var con = mysql.createConnection(connString);
con.connect(function (err){
    if(err) throw err;
});


module.exports = con;