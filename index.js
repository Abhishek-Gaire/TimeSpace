// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", (req,res) => {
  const dateString = req.params.date;
  console.log(dateString)
  if(!dateString){
    let date = new Date();
    return res.json({
      "unix":date.valueOf(),
      "utc":date.toUTCString(),
    })
  }
  if(dateString.length > 10){
    
    let parsedDate = parseInt(dateString)
    let date = new Date(parsedDate).toUTCString();
    
    return res.json({
      "unix":dateString,
      "utc":date,
    })
  }
 
  const isDate = new Date(dateString);
  if(isDate === "Invalid Date"){
    return res.json({
      "error" :isDate
    })
  }
  const utcDAte = isDate.toUTCString();
  res.json({
    "unix" :isDate.valueOf(),
    "utc" :utcDAte,
  })
})
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
