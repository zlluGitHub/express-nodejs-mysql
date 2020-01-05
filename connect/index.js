let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'qdm169940144_db'

    // host: '49.233.172.175',
    // user: 'root',
    // password: '1q2w3e4r@!Ab',
    // database: 'qdm169940144_db'
    // useConnectionPooling: true
});
// module.exports = connection;

//链接数据库
connection.connect((err, result) => {
    if (err) {
        console.log(err);
        console.log("数据库连接失败！");
        return;
    }
    console.log(result);
    console.log("数据库连接成功！");
});