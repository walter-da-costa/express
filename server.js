
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var db = require('./config/db_mongo');
var moment = require('./config/moment');
var app = express();

/** =========== Moteur de template =========== */
app.set('view engine', 'ejs')

/** =========== MiddleWare =========== */
app.use('/assets', express.static('public'))

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(require('./middlewares/flash'))

/** =========== Routes =========== */
app.get('/', (request, response) => {
    var Message = require('./models/message')
    Message.all(function (messages) {
        //response.render('pages/index', {'messages' : messages})
        response.render('pages/index', {'messages' : messages, 'moment':moment})
    })
})

//example with mongo db
/*app.get('/', (request, response) => {

    var collection = db.get().collection('messages')
    collection.find().toArray(function(err, messages) {

        response.render('pages/index', {'messages' : messages, 'moment':moment})
    })
})*/

app.post('/', (request, response) => {
    if(request.body.message === undefined || request.body.message ===''){
        request.flash('error', 'Il y a une erreur !')
        response.redirect('/');
    }else{
        //MYSQL
        var Message = require('./models/message')
        Message.create(request.body.message, function () {
            request.flash('success', 'Merci !')
            response.redirect('/');
        })//*/

        //MONGO
        /*var collection = db.get().collection('messages')
        collection.insertOne( { content: request.body.message, qty: new Date() } );
        request.flash('success', 'Merci !')
        response.redirect('/');*/
    }
})

app.get('/message/:id', (request, response) => {
    var Message = require('./models/message')
    Message.find(request.params.id, function (message) {
        response.render('pages/message', {'message' : message })
    })
})

/** =========== Start APP =========== */

app.listen('8088');

//test db connection WiTH MONGO
/*db.connect('mongodb://localhost:27017/testdb', function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.')
        process.exit(1)
    } else {
        app.listen(8088, function() {
            console.log('Listening on port 8088...')
        })
    }
})*/

