var express  = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var multer = require('multer');
var upload = multer({dest: './public/img/'});

var app = express();

// Config
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

var multer = require('multer');
var upload = multer({dest: './uploads/'});

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', upload.single('image'), function(request, respond) {
    if(request.file) console.log(request.file);
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000");
});
