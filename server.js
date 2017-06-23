
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

/** =========== Moteur de template =========== */
app.set('view engine', 'ejs')

/** =========== MiddleWare =========== */
app.use('/assets', express.static('public'))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

/** =========== Routes =========== */
app.get('/', (req, res) => {
    res.render('pages/index')
})

app.post('/', (req, res) => {
    if(req.body.message === undefined || req.body.message ===''){
        res.render('pages/index', {'error':'Enter a message please !'})
    }
})

/** =========== Port =========== */
app.listen('8080');