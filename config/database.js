// config -> 개발에 관련된 환경설정 정보 전체를 관리

const mysql = require("mysql2");

let conn = {
    host : "project-db-stu3.smhrd.com",
    user : "Insa4_JSA_hacksim_4",
    password : "aishcool4",
    port : "3307",
    database : "Insa4_JSA_hacksim_4"
};

module.exports = {
    init : function(){
        return mysql.createConnection(conn);
    }
};
