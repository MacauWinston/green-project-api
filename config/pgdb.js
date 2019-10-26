var pg = require('pg')

var config = {
    user: 'postgres', // 用户名
    database: 'greenproject', // 数据库
    password: 'postgres', // 密码
    host: '127.0.0.1', // 数据库所在IP
    port: 5432, // 端口

    max: 20, // 连接池最大连接数
    idleTimeoutMillis: 5000, // 连接最大空闲时间 3s
}

var pool = new pg.Pool(config);

module.exports = pool;