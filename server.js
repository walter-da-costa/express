

var express = require('express');
var app = express();

app.get('/', (request, response) => {
    response.send('hello akkiii');
})

app.listen('8080');