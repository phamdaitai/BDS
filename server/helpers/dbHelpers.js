exports.initModels = (connection, models) => {
    const arrayKeys = Object.keys(models);
    arrayKeys.forEach(key => {
        global[key] = connection.model(key);
    });
}

exports.initConnection = (dbName) => {
    const db = CLIENT_CONNECTION.useDb(dbName);
    return db;
}