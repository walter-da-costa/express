
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require( 'mongoose' );
var config = require('./config/config')
var glob = require('glob')

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

/** =========== Chargement de models =========== */
var models = glob.sync(config.root + '/models/*.js');
models.forEach(function (model) {
  require(model);
});

/** =========== lancement d'express =========== */
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
    var Message  = mongoose.model( 'Message' );
    Message.
    find({}).
    exec( function ( err, messages ){
      if( err ) return next( err );
      response.render( 'pages/index', {
          messages : messages
      });
    });
})

app.post('/', (request, response) => {
    if(request.body.message === undefined || request.body.message ===''){
      request.flash('error', 'Il y a une erreur !')
      response.redirect('/');
    }else{
      var Message  = mongoose.model( 'Message' );
      Message.create({ content: request.body.message, created_at: new Date },
      function (err, message) {
        if (err) return handleError(err);
        request.flash('success', 'Merci !')
        response.redirect('/');
      })
    }
})

app.get('/message/:id', (request, response) => {
    var Message  = mongoose.model( 'Message' )
    Message.findById(request.params.id, function (err, message) {
      response.render('pages/message', {'message' : message})
    });
})


/** =========== Port =========== */
app.listen('3000');

