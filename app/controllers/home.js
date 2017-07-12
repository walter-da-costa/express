var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Message = mongoose.model('Message');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  Message.find(function (err, messages) {
    if (err) return next(err);
    res.render('index', {
      messages: messages
    });
  });
});

router.post('/', function (request, response, next) {
  if(request.body.message === undefined || request.body.message ===''){
      //request.flash('error', 'Il y a une erreur !')
      //
      response.redirect('/');
    }else{
      Message.create({ content: request.body.message, created_at: new Date },
      function (err, message) {
        if (err) return next(err);
        //request.flash('success', 'Merci !')
        response.redirect('/');
      })
    }
});
