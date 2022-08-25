// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
//app.use(express.static('.vercel/output/static'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", function (req, res) {
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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


module.exports = app;