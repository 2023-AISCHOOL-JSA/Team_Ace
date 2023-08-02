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

    let sql = "select * from member where ID=? and PW=?";

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
});
router.post("/delete", function(request, response){
    let deleteNick = request.body.deleteNick;

    conn.connect();

    let sql = "delete from member where nick=?";

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

    let sql = "update member set pw=?, nick=? where id=?";

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
    let pw = request.body.pw;
    let pwr = request.body.pwr;
    let userName = request.body.userName;
    let nick = request.body.nick;
    let phonenum = request.body.phonenum;

    if (pw == pwr){
        conn.connect();
        let sql = "insert into member values ( ?, ?, ?, ?, ? )";
        console.log("비번 통과, 커넥션");
        conn.query(sql, [id, pw, userName, nick, phonenum], function(err, rows){
            if(!err){
                console.log("가입 성공");
                response.redirect("/page/");
            }
            else {
                console.log("가입 실패");
                response.redirect("/page/Join");
            }
        });
    } else {
        console.log("비번미일치");
        response.redirect("/Join");
    }
    
});

router.get("/selectAll", function(request, response){
    console.log("접근완");

    conn.connect();
    let sql = "select * from member";
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
    let sql = "select * from member where nick = ? or phonenum = ?";
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

module.exports = router;