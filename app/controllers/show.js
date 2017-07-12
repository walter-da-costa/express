var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Message = mongoose.model('Message');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/message/:id', function (req, res, next) {
  Message.findById(req.params.id, function (err, message) {
    if (err) return next(err);
    res.render('show', {message: message});
  });
});
