"use strict";

var connection = require('../config/db')

class Message {

    static create(content, callback_function){
        connection.query('INSERT INTO messages SET content = ? , created_at = ?',
        [content, new Date()], function (error, results, fields) {
            if (error) throw error;
            callback_function(results)
        });
    }
}

module.exports = Message