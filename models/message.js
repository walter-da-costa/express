var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var MessageSchema = new Schema({
    content    : String,
    created_at : Date,
});

mongoose.model( 'Message', MessageSchema );
