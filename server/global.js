const { initDbConnection } = require('./connection');
global.CLIENT_CONNECTION = initDbConnection();