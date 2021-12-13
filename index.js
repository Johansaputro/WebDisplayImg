var express  = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var fs = require('fs');
var glob = require("glob");

var multer = require('multer');
var upload = multer({dest: './public/img/'});

var app = express();
var imgName = [];

// Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Tell express where to serve static files from
app.use(express.static(__dirname + '/public'));
app.set('views', './views');
app.set("view engine", "ejs");

// Connect to DB
var db = mysql.createPool({
  host: "10.252.242.121",
  user: "root",
  password: "",
  port: "3306",
  database: "steering"
})

// var multer = require('multer');
// var upload = multer({dest: './public/img/'});
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/img');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

app.get('/', function(req, res) {
//   fs.readdirSync(__dirname + '/public/img', (err, files) => {
//   if (err)
//     console.log(err);
//   else {
//     console.log("\nCurrent directory filenames:");
//     files.forEach(file => {
//       // console.log(file);
//       imgName.push(file);
//     });
//     console.log(imgName);
//     console.log(typeof imgName[0]);
//   };
// });
  glob("**/*.jpg", options, function (er, files) {
    if (err) throw err;
    else {
      imgName = files;
      console.log(imgName);
    };
  });
  res.render('index', {nameArray: imgName});
});

// app.get('/', function(req, res) {
//   res.render('ekg');
// });
//
// app.get('/getekg', function(req, res) {
//
// });
//
// app.post('/postekg', function(req, res) {
//   let parsedContent = JSON.parse(req.query);
//   let data = req.body.payload;
//   db.query("INSERT INTO EKG (Voltage) VALUES (?)",[data], function(err,rs) {
//     if (err) throw err;
//     // console.log("Sequence updated")
//   });
//   res.status(204).send();
// });

app.post('/', upload.single('image'), function(request, respond) {
    if(request.file) console.log(request.file.filename);
    respond.status(204).send();
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000");
});
