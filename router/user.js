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

router.get("/Logout", function(request, response){
    response.clearCookie('info');
    console.log("쿠키 삭제");
    request.session.destroy();
    console.log("세션 삭제");
    response.redirect("/page/");
});

router.get("/basket", function(request, response){
    request.session.payflag = 0;
    console.log("장바구니");
    // let id = request.session.info.ID;
    // userId는 로그인 성공 시 저장
    
    let id = request.session.info.ID;
    console.log(request.session.info.ID);
    console.log(id);
    conn.connect();
    let sql = `SELECT *, DATE_FORMAT(DATE_ADD(NOW(), INTERVAL A.DEL_TIME  DAY), '%m') AS M, DATE_FORMAT(DATE_ADD(NOW(), INTERVAL A.DEL_TIME  DAY), '%d') AS D
                 FROM PRD A JOIN PRD_IMG B
                   ON A.PRD_NO=B.PRD_NO
                WHERE A.PRD_NO IN (SELECT PRD_NO
                                     FROM BASKET
                                    WHERE ID = ?);`;
    conn.query(sql, [id], function(err, rows){
        // console.log(err);
        // console.log(rows);
        if (!err){
            if (rows.length > 0){
                request.session.basket = rows;
                response.render('basket', { basket: request.session.basket });
            } else {
                response.render('basket', { basket: null });
            }
        } else {
            console.log(err);
            response.redirect('/page');
        }
    });
});

// 장바구니에 상품을 넣는 우회하는 라우터
router.post('/updatebasket', function(request,response){
    let id = request.session.info.ID
    let prd_no = request.session.detail.PRD_NO;
    console.log(prd_no)
    conn.connect();
    let sql = "INSERT INTO BASKET (ID, PRD_NO) VALUES (?, ?);"
    conn.query(sql, [id, prd_no], function(err, rows){
        if(!err){
            console.log(rows);
        }
        else{
            console.log(err);
        }
    })
    response.redirect('/user/basket')
})
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

router.get("/pay", function(request,response){
    if (request.query.payflag == '1') {
        response.render("pay", {totalPrice: request.session.totalPrice, info: request.session.info, payflag: '1'});
    } else if (request.query.payflag == '0'){
        response.render("pay", {totalPrice: request.session.totalPrice, info: request.session.info, payflag: '0'});
    }
});

// 결제 시 결제 정보를 ORDER 테이블에 저장
router.post("/pay", function(request,response){
    console.log("주문")
    let o_cnt = request.body.cnt;
    let n_cnt = o_cnt.filter(function(data) {
        return data > 0;
    });
    console.log(n_cnt);
    let ordered = request.body.selectedPrds;
    console.log(request.body.selectedPrds);
    conn.connect();
    let sql = "select PRD_PRICE, DEL_PRICE, DATE_FORMAT(DATE_ADD(NOW(), INTERVAL DEL_TIME DAY), '%y%m%d') AS M from PRD where PRD_NO IN (?)";
    conn.query(sql, [ordered], function(err, rows){
        console.log(err);
        console.log(rows);
        if(!err){
            let price = 0;
            let deliverdDay = 0;
            let deliverPrice = 0;
            for (let i = 0; i < rows.length; i++) {
                if (deliverdDay < parseInt(rows[i].M)){
                    deliverdDay = parseInt(rows[i].M);
                };
                if(deliverPrice < rows[i].DEL_PRICE){
                    deliverPrice = rows[i].DEL_PRICE;
                };
                price += rows[i].PRD_PRICE * n_cnt[i];
            }
            let mo = parseInt((deliverdDay%10000)/100);
            let da = deliverdDay%100;
            request.session.payInfo = {totalprice :price, del:deliverPrice, sum:price+deliverPrice, m:mo,d:da};
            console.log(request.session.payInfo)
            response.render("pay", {payInfo: request.session.payInfo, info: request.session.info, payflag: '0'});
            
        } else {
            console.log("조회 실패");
            response.redirect("/user/basket");
        }

    });
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

router.post("/collection", function(request,response){
    conn.connect()
    let id = request.session.info.ID
    let sql = 'SELECT * FROM PRD A JOIN `ORDER` B ON A.PRD_NO = B.PRD_NO WHERE ID=?;'
    conn.query(sql, id, function(err, rows){
        if(!err){
            request.session.order = rows
        }
        else {
            
        }
    })
})

module.exports = router;