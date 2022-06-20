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
  res.sendFile();
});



// app.get('/api/',(request,response)=>{
//   const date_string = new Date();
//   response.json({ 
//     "unix":date_string.getTime(),
//     "utc":date_string.toUTCString()
//    });
// });



// // your first API endpoint... 
// app.get('/api/:date?',(request,response) => {
//   const date_string = request.params.date; 


//   const date_ = new Date( parseInt(date_string) );
//   console.log(typeof date_);

//   const date_milli = new Date(date_string);

//   if(date_.toUTCString() === "Invalid Date"){
//     return response.json({ "error":"Invalid Date" });
//   }

//   if((/\d{4}-\d{2}-\d{2}/).test(date_string)){
//     return response.json({
//       "unix":date_milli.getTime(),
//       "utc":date_milli.toUTCString()
//     });
//   }
//   response.json({
//     "unix":date_.getTime(),
//     "utc":date_.toUTCString()
//   });

  
// });








app.get("/api/", (request, response)=>{
  let date_string = new Date();
  
  return response.json({
    'unix': date_string.getTime(), 
    'utc': date_string.toUTCString()
  });  
});

app.get("/api/:date", (request,response)=>{

  const date_string_request = request.params.date;
  let date_string = new Date(date_string_request);
  if(date_string.toUTCString() === "Invalid Date"){

    date_string = new Date(parseInt(request.params.date));

  }
 
  if(date_string.toUTCString() === "Invalid Date") {
    return response.json({error: "Invalid Date"});
  } else {
    return response.json({   
      unix: date_string.getTime(), 
      utc: date_string.toUTCString() 
    }) 
  }
});








const PORT = 3000;

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});