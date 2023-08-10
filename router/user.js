const express = require("express");
const router = express.Router();

const db = require("../config/database");
let conn = db.init();

// 로그인 시 ID 값이 들어감 userId 변수
let userId;

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

router.get("/basket", function(request, response){
    console.log("장바구니");
    // let id = request.session.info.ID;
    // userId는 로그인 성공 시 저장
    let prdRow = [];
    if(userId){
        let id = userId;
        conn.connect();
        let sql = "select * from BASKET where ID=?";
        // BASKET 테이블에서 ID로 찾은 데이터 쿼리
        conn.query(sql, [id], function(err, rows){
            // console.log(err);
            // console.log(rows);
            if (!err & rows.length > 0){
                let prdNo = [];
                // 한 명의 고객은 여러개의 상품을 장바구니에 담음
                // 반복문으로 장바구니에 담은 상품을 PRD테이블에서 찾아 쿼리문을 보냄
                let prdsql = "select * from PRD where PRD_NO IN (?)";
                for(let i in rows){
                    prdNo.push(rows[i].PRD_NO);
                }
                console.log(prdNo)
                console.log(prdsql)
                // console.log(rows)
                // console.log(prdNo)
                conn.query(prdsql, [prdNo], function (err2, prdrows) {
                    // 쿼리 보내기가 성공했을 시
                    if (!err2) {
                        console.log(prdrows);
                        // html 세션에 담음
                        request.session.basket = prdrows;
                    }
                    else {
                        console.log(err2);
                        response.redirect("/page")
                    }
                })
            } else {
                console.log(err);
                response.redirect("/page/");
            }
        });
    }
    // 에러가 없을 경우 페이지를 장바구니로 리다이렉트 
    console.log("리다이렉트 바스켓");
    response.redirect("/page/basket");
});

router.get("/login", function(request, response){
    request.session.loginFlag = 1;
    response.redirect("/page/login");
});

router.post("/login", function(request, response){
    let id = request.body.inputId;
    let pw = request.body.inputPw;
    conn.connect();

    let sql = "select * from MEMBER where ID=? and PW=?";

    conn.query(sql, [id, pw], function(err, rows){
        console.log(err);
        console.log(rows);

        if (!err){
            if(rows.length > 0){
                response.cookie('info', rows[0]);
                console.log("쿠키 생성");
                // console.log(request.cookies.info);
                request.session.info = rows[0];
                console.log("세션 생성");
                console.log(request.session.info);

                request.session.loginFlag = 1;
                userId = id;
                response.redirect("/page/");
            }
            else{
                request.session.loginFlag = 0;
                response.redirect("/page/Login");
            }
        } else {
            console.log(err);
        }
    });

    // 로그인 시 유저 주문 정보 테이블을 가져와서
    // 세션에 보관함
// <<<<<<< HEAD
    // sql = `SELECT * FROM BASKET WHERE ID=${id}`
    // conn.query(sql, function(err, rows){
    //     if(!err & rows){
    //         request.session.order = rows;
    //     }
    //     else{
    //         console.log(err)
    //     }
    // });
// =======
//     // sql = `select * from ORDER where ID=${id}`
//     // conn.query(sql, function(err, rows){
//     //     if(!err & rows){
//     //         request.session.order = rows;
//     //     }
//     //     else{
//     //         console.log(err)
//     //     }
//     // })
// >>>>>>> 60ddfeab0f1845f1929ea1a23e89df1a31ad80bb
});

// 아이디 찾기
router.post("/findId", function(request, response){
    // 모달창에서 아이디를 찾을 때 요청보낸 이름
    let nameforFindid = request.body.name;
    let phoneforFindid = request.body.phone;

    conn.connect();

    // id 찾기 쿼리문 이름과 전화번호로 찾음
    let findsql = `select id from MEMBER where NAME=${nameforFindid} and TEL=${phoneforFindid}`;
    
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
            NAME=${nameforFindPW}
            and TEL=${phoneforFindPW}
            and ID=${idforFindPW}`;

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

    let sql = "delete from MEMBER where NICK=?";

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
    console.log("주문")
    console.log(request.session.info);
    console.log(request.session.basket);
    console.log(request.session.info.ID);

    // request.session.pay.ID = request.session.info.ID;
    // request.session.pay.PRD_NO = request.session.order.PRD_NO;
    // request.session.pay.SELLER_CODE = request.session.order.SELLER_CODE;
    // request.session.pay.TOTAL_PRICE = request.session.order.TOTAL_PRICE;
    // request.session.pay.TAKER_NM;
    // request.session.pay.TAKER_TEL;
    // request.session.pay.TAKER_ADDR;
    // request.session.pay.ORDER_COM_TEL = request.session.order.ORDER_COM_TEL;
    // request.session.pay.ORDER_MEMO;
    // request.session.pay.ORDER_STATUS;
    // request.session.pay.PAY_DATE;
    // request.session.pay.PAY_CODE;

    response.render("pay", {info: request.cookies.info, order:request.session.order});
});

router.post("/pay_c", function(request,response){
    console.log("결제 성공")
    console.log(request.session.info);
    console.log(request.session.order);
    console.log(request.session.pay);

    // let id = request.session.pay.ID;
    // let prd_no = request.session.pay.PRD_NO;
    // let seller_code = request.session.pay.SELLER_CODE;
    // let total_price = request.session.pay.TOTAL_PRICE;
    // let taker_nm = request.body.recipient_name;
    // let taker_tel = request.body.recipient_tel;
    // let taker_addr = request.body.recipient_address;
    // let order_com_tel = request.session.pay.ORDER_COM_TEL;
    // let order_memo = request.body.recipient_place;
    // let order_status = 1;
    // let pay_date = Date().getTime();
    // let pay_code = 'card';

    // conn.connect();
    // let sql = "INSERT INTO `ORDER` VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";
    // conn.query(sql, [id, prd_no, seller_code, total_price, taker_nm, taker_tel, taker_addr, order_com_tel, ,order_memo,
    //                 order_status, pay_date, pay_code ], function(err, rows){
    //     console.log(rows);
    //     if(!err){
    //         console.log("결제 성공, db입력 성공");
    //     } else {
    //         console.log("결제 성공, db입력 실패");
    //     }
        response.render("main");
    // });
});

router.post("/cart", function(request,response){

})

module.exports = router;