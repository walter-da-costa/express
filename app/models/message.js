var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MessageSchema = new Schema({
  content: String,
  created_at: Date,
});

MessageSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Message', MessageSchema);

