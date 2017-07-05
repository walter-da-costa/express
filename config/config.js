var path = require('path')
var rootPath = path.normalize(__dirname + '/..')

var config = {
    db: 'mongodb://localhost/testdb',
    root: rootPath
}

module.exports = config
