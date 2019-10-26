const uuid = require('node-uuid');
const Token = require('../config/token')
const model = require('../models/user_model')

function getUserInfo(token, user_name) {
    return new Promise((resolve, reject) => {
        if (Token.decrypt(token)['token']) {
            model.select('SELECT user_id, user_name, user_realname, user_gender, user_birthday, user_email, user_interest, user_address, user_profile FROM users WHERE user_name = $1', [user_name], (err, res) => {
                err ? reject(err) : resolve(res.rows[0]);
            })
        } else {
            reject("Invalid token");
        }
    })
}

function isUserNameExists(user_name) {
    return new Promise((resolve, reject) => {
        model.select('SELECT count(*) FROM users WHERE user_name = $1', [user_name], (err, res) => {
            err ? reject(err) :
                data = (res.rows[0]['count'] != 0) ? {
                    'exists': true
                } : {
                    'exists': false
                }
            resolve(data);
        })
    })
}

function addUser(user) {
    var uid = uuid.v1().replace(/\-/g, '');
    var gender = user.sex == 0 ? 'M' : 'F';
    return new Promise((resolve, reject) => {
        model.insert('INSERT INTO users (user_id, user_name, user_pwd, user_gender, user_email) VALUES( $1, $2, $3, $4, $5)', [uid, user.username, user.password, gender, user.email], (err, data) => {
            err ? reject(err) : resolve(data);
        })
    })
}

function login(user) {
    return new Promise((resolve, reject) => {
        model.select('SELECT user_id FROM users WHERE user_name = $1 AND user_pwd = $2', [user.username, user.password], (err, res) => {
            err ? reject(err) : data = {
                token: Token.encrypt({
                    id: res.rows[0]
                }, '3d') //Token expiration time(3days).
            };
            resolve(data);
        })
    })
}


module.exports = {
    getUserInfo,
    isUserNameExists,
    addUser,
    login
}