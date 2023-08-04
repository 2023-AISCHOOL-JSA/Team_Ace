const express = require("express");
const router = express.Router();

const db = require("../config/database");
let conn = db.init();

router.get("/", function(request, response){
    console.log("접속 확인");
    response.render("Main")
});

router.get("/response", function(request, response){
    console.log(request.query.text);
    response.end();
});

router.get("/nextPage", function(request, response){
    console.log(request.query.addr);
    let addr = request.query.addr;
    response.redirect(addr);
});

router.get("/logout", function(request, response){
    response.clearCookie('info');
    console.log("쿠키 삭제");
    request.session.destroy();
    console.log("세션 삭제");
    response.redirect("/page/");
});

router.post("/login", function(request, response){
    let id = request.body.id;
    let pw = request.body.pw;
    
    conn.connect();

    let sql = "select * from MEMBER where ID=? and PW=?";

    conn.query(sql, [id, pw], function(err, rows){
        console.log(err);
        console.log(rows);

        if (!err & rows.length > 0){
            response.cookie('info', rows[0]);
            console.log("쿠키 생성");
            request.session.info = rows[0];
            console.log("세션 생성");
            response.redirect("/page/");
        } else {
            response.redirect("/page/Login");
        }
    });

    // 로그인 시 유저 주문 정보 테이블을 가져옴
    // 세션에 보관함
    // sql = `SELECT * FROM ORDER WHERE ID=${id}`
    // conn.query(sql, function(err, rows){
    //     if(!err & rows){
    //         request.session.order = rows;
    //     }
    //     else{
    //         console.log(err)
    //     }
    // })
});

// 아이디 찾기
router.post("/findId", function(request, response){
    // 모달창에서 아이디를 찾을 때 요청보낸 이름
    let nameforFindid = request.body.name;
    let phoneforFindid = request.body.phone;

    conn.connect();

    // id 찾기 쿼리문 이름과 전화번호로 찾음
    let findsql = `select id from MEMBER where 
            userName=${nameforFindid} 
            and phonenum=${phoneforFindid}`;
    
    // 쿼리 결과 
    conn.query(findsql, function(err, rows){
        console.log(err);
        console.log(rows);

        if(!err & rows.length > 0){
            console.log(`ID 찾음:${rows[0].id}`)
        }
        else{
            console.log('ID를 찾을 수 없습니다.')
        }
    })
})

// 패스워드 찾기
router.post("/findPw", function(request, response){
    let nameforFindPW = request.body.name;
    let phoneforFindPW = request.body.phone;
    let idforFindPW = request.body.id;

    conn.connect();

    // PW찾기 쿼리문 이름, 전화번호, 아이디를 통해 찾음
    let findsql = `select pw from MEMBER where 
            userName=${nameforFindPW} 
            and phonenum=${phoneforFindPW}
            and id=${idforFindPW}`;

    // 쿼리 결과
    conn.query(findsql, function(err, rows){
        console.log(err);
        console.log(rows);

        if(!err & rows.length > 0){
            console.log(`PW 찾음:${rows[0].pw}`);
        }
        else{
            console.log('PW를 찾을 수 없습니다.');
        }
    })
})

router.post("/delete", function(request, response){
    let deleteNick = request.body.deleteNick;

    conn.connect();

    let sql = "delete from MEMBER where nick=?";

    conn.query(sql, [deleteNick], function(err, rows){
        console.log(err);
        console.log(rows.affectedRows);

        if (!err){
            console.log("삭제 성공!!");
            response.clearCookie('info');
            request.session.destroy(); 
            response.redirect("/page/");
        } else {
            console.log("삭제 실패!!");
            response.redirect("/page/Login");
        }
    });
});

router.post("/update", function(request, response){
    let id = request.body.id;
    let pw = request.body.pw;
    let nick = request.body.nick;

    conn.connect();

    let sql = "update MEMBER set pw=?, nick=? where id=?";

    conn.query(sql, [pw, nick, id], function(err, rows){
        console.log(err);
        console.log(rows);

        if (!err){
            console.log("수정 성공!!");
            response.redirect("/page/");
        } else {
            console.log("수정 실패!!");
            response.redirect("/page/Update");
        }
    });
});

router.post("/join", function(request, response){
    let id = request.body.id;
    let pw = request.body.password;
    let name = request.body.fullname;
    let nick = request.body.nick;
    let phonenum = request.body.phonenum;
    let date = request.body.date;
    let gender = request.body.gender;
    let email = request.body.email;
    let postcode = parseInt(request.body.sample6_postcode);
    let address = request.body.sample6_address;
    let detailAddress = request.body.sample6_detailAddress;
    let extraAddress = request.body.sample6_extraAddress;


    conn.connect();
    let sql = "insert into MEMBER values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    console.log("비번 통과, 커넥션");
    conn.query(sql, [id, pw, name, nick, phonenum, date, gender, email, address, postcode, detailAddress, extraAddress], function(err, rows){
        if(!err){
            console.log("가입 성공");
            response.redirect("/page/");
        }
        else {
            console.log("가입 실패");
            console.log(err);
            response.redirect("/page/Join");
        }
    });
});

router.get("/selectAll", function(request, response){
    console.log("접근완");

    conn.connect();
    let sql = "select * from MEMBER";
    conn.query(sql, function(err, rows){
        console.log(rows);

        if(!err && rows.length > 0){
            response.render("selectAll", {userList: rows});
        } else {
            response.send("회원이 없거나 조회에 실패했습니다.");
        }

    });
});

router.post("/selectOne", function(request, response){
    console.log("접근완");
    let nickorphonenum = request.body.nickorphonenum;

    conn.connect();
    let sql = "select * from MEMBER where nick = ? or phonenum = ?";
    conn.query(sql, [nickorphonenum, nickorphonenum], function(err, rows){
        console.log(rows);

        if(!err){
            console.log("조회 성공");
            response.render("selectOne", {user: rows, info: request.cookies.info});
        } else {
            console.log("조회 실패");
            response.send("회원이 없거나 조회에 실패했습니다.");
        }

    });
});

// 결제 시 결제 정보를 ORDER 테이블에 저장
router.post("/pay", function(request,response){
    // conn.connect();
    // let name = request.body.recipient_name;
    // let addr = request.body.recipient_address;
    // let memo = request.body.recipient_place;

    // let sql = ``;
    // conn.query(sql, function(err, rows){

    // })
})

module.exports = router;