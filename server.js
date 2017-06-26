
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
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
        response.render('pages/index', {'messages' : messages})
    })
})

app.post('/', (request, response) => {
    if(request.body.message === undefined || request.body.message ===''){
        request.flash('error', 'Il y a une erreur !')
        response.redirect('/');
    }else{
        var Message = require('./models/message')
        Message.create(request.body.message, function () {
            request.flash('success', 'Merci !')
            response.redirect('/');
        })
    }
})

/** =========== Port =========== */
app.listen('8080');