//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 


// Body Parser Middleware
app.use(bodyParser.json()); 

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Initiallising connection string
var dbConfig = {
  user: "RadarUser",
  password: "RadarUser2017",
  server: "HQITSQL90",
  database: "Radar"
};


//Function to connect to database and execute query
var  executeQuery = function(res, query){             
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
}

//adding for password session verification
app.use(express.cookieSession());

//GET API
app.get("/seo-radar", function(req , res){

                var user = "select * from [Users]";
                var skills = "select * from [UserSkills]";

                /*
                FirstName
                LastName
                Email
                Cross reference the Pin
                SkillName
                titleName
                */
                executeQuery (res, user);
                executeQuery (res, skills);

});

//POST API
 app.post("/seo-radar", function(req , res){

  //post email and pin to get information
    if (req.session.Email & req.session.Pin != null) {
       // Already logged in.
    } else {
       var q = db.query("SELECT * FROM `Users` WHERE `Email`='" + req.params.Email + "' AND `password`='" + req.params.Pin + "'");

       if (q) {
          // Set the sessions.
          req.session.Email = req.params.Email;
          req.session.Pin = req.params.Pin;
       }
    }

      //question - should we add these in only once a user is logged in?
      //question - should we post title id and skill id? Or should we post the skill/title name and get the associated id?
      //question - can I add to one variable? Should I add to one variable?
                var user = "INSERT INTO [Users] (FirstName, LastName, Email, Pin, TitleId) VALUES (req.body.FirstName,req.body.LastName,req.body.Email, req.body.Pin,req.body.TitleId”);
                var skills = "INSERT INTO [UserSkills] (SkillId) VALUES (req.body.SkillId)"; 

      //should I have two executeQuery(s)?
                executeQuery (res, user);
                executeQuery (res, skills);

});

/* //Don't need PUT or DELETE

//PUT API
app.put("/api/user/:id", function(req , res){
                var query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
                executeQuery (res, query);
});

// DELETE API
 app.delete("/api/user /:id", function(req , res){
                var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
                executeQuery (res, query);
});

*/
