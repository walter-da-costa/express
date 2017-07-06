var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'test-express'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/test-express-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'test-express'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/test-express-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'test-express'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/test-express-production'
  }
};

module.exports = config[env];
