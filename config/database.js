// config -> 개발에 관련된 환경설정 정보 전체를 관리

const mysql = require("mysql2");

let conn = {
    host : "localhost",
    user : "root",
    password : "123456",
    port : "3306",
    database : "nodejs_DB"
};

module.exports = {
    init : function(){
        return mysql.createConnection(conn);
    }
};
