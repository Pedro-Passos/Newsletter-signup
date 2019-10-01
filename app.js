//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
// specifies location of static file
app.use(express.static("public"));
// extracts body from HTTP POST request
app.use(bodyParser.urlencoded({extended: true}));
// links our html file to our home route
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  // inserting POST elements into variables, creating object and stringifying.
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  // creating object url we will be making the request to POST
  var options = {
    url: "https://... your Mailchimp server url",
    method: "POST",
    // authorization
    headers: {"Authorization": "access api"},
    body: jsonData
  };

  // sends options object and redirects to success/failure.html
  request(options, function(error, response, body){
    if(error){
      res.sendFile(__dirname + "/failure.html");
    }else{
      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure", function(req,res){
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("Server is runnning on port 3000.");
});