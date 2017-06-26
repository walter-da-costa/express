"use strict";

var connection = require('../config/db')
var moment = require('moment');

class Message {

    constructor (row){
        this.row = row
    }

    get content() {
        return this.row.content
    }


    get created_at() {
        return moment(this.row.created_at)
    }

    static create(content, callback_function){
        connection.query('INSERT INTO messages SET content = ? , created_at = ?',
        [content, new Date()], function (error, results, fields) {
            if (error) throw error;
            callback_function(results)
        });
    }

    static all(callback_function){
        connection.query('SELECT * FROM messages', function (error, rows, fields) {
            if (error) throw error;
            callback_function( rows.map( (row) => new Message(row) ) )
        });
    }
}

module.exports = Message