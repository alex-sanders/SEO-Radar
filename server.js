//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
  //var sql = require("mssql");
var app = express(); 

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//adding for password session verification
// app.use(express.cookieSession());
require('./routes/users')(app);

app.get('/test_url', (req, res) => {
  res.send('we just wanna see this work');
});

//Setting up server
 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

/*//Initiallising connection string
var dbConfig = {
  user: "RadarUser",
  password: "RadarUser2017",
  server: "HQITSQL90",
  database: "Radar"
};
*/

//Function to connect to database and execute query
/*var  executeQuery = function(res, query){             
     sql.connect(dbConfig, function (err) {
         if (err) {   
                     console.log("Error while connecting database :- " + err);
                     res.send(err);
                  }
                  else {
                         // create Request object
                         var request = new sql.Request();
                         // query to the database
                         request.query(query, function (err, res) {
                           if (err) {
                                      console.log("Error while querying database :- " + err);
                                      res.send(err);
                                     }
                                     else {
                                       res.send(res);
                                            }
                               });
                       }
      });           
}*/

