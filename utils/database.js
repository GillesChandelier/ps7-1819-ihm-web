const mongoose = require('mongoose'),
      host = "localhost",
      database = "polymuseum"
      connectionString = 'mongodb://' + host + '/' + database;

let   connection = null;

/**
 * Database utility class to open and close connection
 */
class Database {

    /**
     * Open database connection
     * @param {*} callback
     */
    open(callback) {
        var options = {
            promiseLibrary: global.Promise,
            useNewUrlParser: true
        };
        mongoose.connect(connectionString, options, (err) => {
            if (err) {
                console.log('mongoose.connect() failed: ' + err);
            }
        });
        connection = mongoose.connection;

        mongoose.connection.on('error', (err) => {
            console.log('Error connecting to MongoDB: ' + err);
            callback(err, false);
        });

        mongoose.connection.once('open', () => {
            console.log('*** Connected to mongodb');
            callback(null, true);
        });

    }

    /**
     *  Disconnect from database
     */
    close() {
        connection.close(() => {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    }

}

module.exports = new Database();
