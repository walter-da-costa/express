"use strict";

var connection = require('../config/db')
var moment = require('../config/moment');

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

    get id() {
        return this.row.id
    }

    static create(content, callback){
        connection.query('INSERT INTO messages SET content = ? , created_at = ?',
        [content, new Date()], function (error, results, fields) {
            if (error) throw error;
            callback(results)
        });
    }

    static find(id, callback){
        connection.query('SELECT * FROM messages WHERE id = ? LIMIT 1',
        [id], function (error, rows, fields) {
            if (error) throw error;
            callback( new Message(rows[0]) )
        });
    }

    static all(callback){
        connection.query('SELECT * FROM messages', function (error, rows, fields) {
            if (error) throw error;
            callback( rows.map( (row) => new Message(row) ) )
        });
    }
}

module.exports = Message