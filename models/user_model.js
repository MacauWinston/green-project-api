const pool = require('../config/pgdb');

exports.select = (SQLString, params, callback) => {
    pool.connect().then(client => {
        client.query(SQLString, params)
            .then(res => {
                callback(null, res);
                client.release();
            }).catch(e => {
                callback(e);
                client.release();
                console.error('query error', e.message, e.stack)
            })
    })
}

exports.insert = (SQLString, params, callback) => {
    pool.connect().then(client => {
        client.query(SQLString, params)
            .then(res => {
                data = {
                    success: true
                };
                callback(null, data);
                client.release();
            }).catch(e => {
                callback(e);
                client.release();
                console.error('query error', e.message, e.stack)
            })
    })
}