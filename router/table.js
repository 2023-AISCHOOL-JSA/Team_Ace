// db 연결시 코드가 단순화 되어짐
const db = require("../config/database");
let conn = db.init();

// 테이블 명을 바꿈
// oldName -> newName
const tableNameChange = (oldName, newName) => {
    conn.connect();
    let query = `ALTER TABLE ${oldName} RENAME ${newName}`
    conn.query(query,function(err, rows){
        if(!err){
            console.log("테이블 이름을 변경했습니다");
        }
        else{
            console.log("테이블 이름 변경 실패");
            console.log(err);
        }
    })
}

// 모든 테이블 명 대문자로 변경
const alltableUpperNameChange = () => {
    conn.connect();
    conn.query('show tables', function(err, rows){
        if(!err){
            console.log("ok");
            for(let myvalue of Object.values(rows)){
                let myOldname = Object.values(myvalue)[0];
                let myNewName = myOldname.toUpperCase();
                tableNameChange(myOldname, myNewName)
            }
        }
        else{
            console.log("err");
            console.log(err);
        }
    })
}

// alltableUpperNameChange();