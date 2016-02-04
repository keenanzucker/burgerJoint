var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');

var index = require('./routes/index');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.showIngredients);

app.get('/ingredients', index.showIngredients);
app.post('/new', index.addNewIngredient);


// app.get('/order', index.order);
// app.get('/kitchen', index.kitchen);


mongoose.connect('mongodb://keenan:olinjs@ds055495.mongolab.com:55495/burger');

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port: ", PORT);
});
