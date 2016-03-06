'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
//var massive = require('massive');

var app = express();

var port = process.env.PORT || 5000;

var nav =  [{
    Link:'/Books',
    Text: 'Books'
}, {
    Link: '/Authors',
    Text: 'Authors'
}];

//var url = 'postgres://localhost/postgres';
//var massiveInstance = massive.connectSync({connectionString: url});
//app.set('db', massiveInstance);
//var db = app.get('db');

var bookRouter = require('./src/routes/bookRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: 'library',
    saveUninitialized: true,
    resave: true}));
require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: [{
                Link:'/Books',
                Text: 'Books'
            }, {
                Link: '/Authors',
                Text: 'Authors'
            }]});
});

app.get('/books', function(req, res) {
    res.send('Hello Books');
});

app.listen(port, function(err) {
    if (!err) {
        console.log('running server on port: ' + port);
    } else {
        console.log(err.message);
    }

});