var express     = require('express');
var app         = express();
var routes      = require('./routes')
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var config      = require('./config');

// Configuraiton
var port = process.env.PORT || 8080;
mongoose.connect(config.database);

// Use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use morgan to log requests to the console
app.use(morgan('dev'));

// Set up the routes
app.use(routes);

// Start the server
app.listen(port);
console.log('Server listening at http://localhost:' + port);
