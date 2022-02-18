const express= require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { options } = require("request");


const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName= req.body.fName;
    const lastName= req.body.Lname;
    const email= req.body.email;

   const data={
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

   const jsonData= JSON.stringify(data);

   const url ="https://us14.api.mailchimp.com/3.0/lists/211e740a01";

   const options={
       method: "POST",
       auth: "yo1:89bea32cb343bf11228afc5fd6520234-us14"
   }

   const request= https.request(url,options,function(response){

       if(response.statusCode ===200){
           res.sendFile(__dirname + "/success.html");
           

       }else{
           res.sendFile(__dirname + "/failure.html");
       }
       response.on("data", function(data){
           console.log(JSON.parse(data));
       })
       

   })

   request.write(jsonData);
   request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
});

//api
//89bea32cb343bf11228afc5fd6520234-us14//


//listid

//211e740a01