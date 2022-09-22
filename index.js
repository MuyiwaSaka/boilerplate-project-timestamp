// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

const bodyParser = require('body-parser');

//Set up middleware for POST FORM Submissions.
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

var useragent = require('express-useragent');
app.use(useragent.express());// what did i just do?
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
//app.use(express.static('.vercel/output/static'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", function (req, res) {
  var timevar= new Date();
  res.send({unix:timevar.getTime(), utc: timevar.toUTCString()});
});

app.get("/api/:timestamp", (req, res) => {
  let timeval = new Date(req.params.timestamp);
  if (isFinite(req.params.timestamp)) {
    var timevar = new Date();
    timevar.setTime(req.params.timestamp);
    res.send({ unix: timevar.getTime(), utc: timevar.toUTCString() });
  } else if (timeval.toString() !== "Invalid Date") {
    res.send({ unix: timeval.getTime(), utc: timeval.toUTCString() });
  } else if(!req.params){
    var timevar= new Date();
    res.send({unix:timevar.getTime(), utc: timevar.toUTCString()});
  }else{
    res.send({ error: "Invalid Date" });
  }

});


app.get('/p2/api/whoami' , (req , res)=>{

   res.send({
    ipaddress:req.socket.remoteAddress, 
    language: req.get("Accept-Language"),
    software:req.useragent.source});

});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

//URL Shortener Microservice.
app.get('/p3/' , (req , res)=>{
  res.sendFile(__dirname + '/views/p2.html');
})

app.post('/p3/api/shorturl' , (req , res)=>{
  res.send(`This is the URL: ${req.body.url}`);
  let url=req.body.url;
  const find_service = require('./myApp.js').findPageByLink;
  if(req.body.url){
    var urlchk = find_service(url);
    res.send(urlchck);
  }
  
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


module.exports = app;