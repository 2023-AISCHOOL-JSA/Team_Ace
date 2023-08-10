// views 안에 있는 html 파일끼리 페이지 이동을 가능하게 해줌

const express = require("express");
const router = express.Router();

const db = require("../config/database");
let conn = db.init();

// http://localhost:8787/page
router.get('/', function (request, response) {
    console.log("메인");
    conn.connect();
    const query1 = () => {
        let sql = `SELECT D.IMG_PATH, C.PRD_NO, C.PRD_NM, C.PRD_PRICE, C.PRD_SCORE, C.CNT
                     FROM (SELECT A.PRD_NO, A.PRD_NM, A.PRD_PRICE, A.PRD_SCORE, A.PRD_RP/COUNT(*) AS CNT
                             FROM PRD A, PRD_ST B
                            WHERE A.PRD_NO = B.PRD_NO
                            GROUP BY B.PRD_NO) C , PRD_IMG D
                    WHERE D.PRD_NO = C.PRD_NO
                    ORDER BY CNT DESC
                    LIMIT 10;`;
        // rows.PRD_PRICE = String(rows.PRD_PRICE)[:-3]
        conn.query(sql, function (err, rows) {
            console.log(String(rows[0].PRD_PRICE).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'));
            console.log(err);
            console.log(rows);
            if (!err) {
                request.session.best = rows;
                query2()
            } else {
                console.log(err);
            }
        });
    }
    const query2 = () => {
        let sql2 = `SELECT B.IMG_PATH, A.PRD_NO, A.PRD_NM, A.PRD_PRICE, A.PRD_SCORE, A.PRD_SIGN
                      FROM (SELECT PRD_NO, PRD_SIGN, PRD_NM, PRD_PRICE, PRD_SCORE
                              FROM PRD
                             WHERE PRD_SIGN > CURDATE()-100) A, PRD_IMG B
                     WHERE A.PRD_NO = B.PRD_NO
                     ORDER BY PRD_SIGN DESC
                     LIMIT 10;`;
        conn.query(sql2, function (err, rows) {
            console.log(err);
            console.log(rows);
            if (!err) {
                request.session.new = rows;
                query3()
            } else {
                console.log(err);
            }
        });

    }
    const query3 = () => {
        console.log("실행1")
        let sql3 = `SELECT B.IMG_PATH, A.PRD_NO, A.PRD_NM, A.PRD_PRICE, A.PRD_SCORE, A.PRD_SALE
                      FROM (SELECT PRD_NO, PRD_NM, PRD_PRICE, PRD_SCORE, PRD_SALE
                              FROM PRD
                             WHERE PRD_SALE > 0) A, PRD_IMG B
                     WHERE A.PRD_NO = B.PRD_NO
                     ORDER BY PRD_SALE DESC
                     LIMIT 10;`;
                     
        conn.query(sql3, function (err, rows) {
            console.log("실행2")
            console.log(err);
            console.log(rows);
            if (!err) {
                request.session.sale = rows;
                console.log(String(rows[0].PRD_PRICE).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'));
                console.log(parseInt('1234567,456'));
                response.render('Main', {
                    info: request.cookies.info, best: request.session.best,
                    new: request.session.new, sale: request.session.sale
                });
                // response.render('Main');
            } else {
                console.log(err);
                
            }
        });
    }
    
    query1()

});

// http://localhost:8787/page/Login
router.get('/Login', function (request, response) {
    response.render("Login", { loginFlag: request.session.loginFlag });
});

// http://localhost:8787/page/Join
router.get('/Join', function (request, response) {
    response.render("Join");
});

// http://localhost:8787/page/Delete
router.get('/Delete', function (request, response) {
    response.render("Delete");
});

// http://localhost:8787/page/Update
router.get('/Update', function (request, response) {
    response.render("Update");
});

router.get('/Find', function (request, response) {
    response.render("Find");
});

router.get('/Cart', function (request, response) {
    response.render("Cart");
});

router.get('/detail', function (request, response) {
    console.log(request.query.PRD_NO);
    let PRD_NO = request.query.PRD_NO;

    // conn.connect();
    // let sql = `SELECT *
    //              FROM (SELECT * FROM PRD where PRD_NO = ?) A,
    //                   (SELECT IMG_PATH FROM PRD_IMG where PRD_NO = ?) B,
    //                   (SELECT COUNT(*) FROM PRD_ST where PRD_NO = ? GROUP BY PRD_NO) C`;
    
    // // 쿼리 결과 
    // conn.query(sql, PRD_NO, PRD_NO, PRD_NO, function(err, rows){
    //     if(!err){
    //         request.session.detail = rows[0];
    //         console.log(rows);
    //         response.render("detail", {detail: request.session.detail});
    //     }
    //     else{
    //         console.log(err);
    //     }
    // })
    response.render("detail");
});

router.get('/Pay', function (request, response) {
    response.render("Pay", {
        info: request.session.info,
        order: request.session.order
    });
});

// http://localhost:8787/page/selectAll
router.get('/selectAll', function (request, response) {
    response.render("selectAll");
});

// http://localhost:8787/page/selectOne
router.get('/selectOne', function (request, response) {
    response.render('selectOne', { info: request.cookies.info });
});

router.get('/basket', function (request, response) {
    response.render('basket', { basket: request.session.basket });
});

router.post('/Search', function(request,response){
    let option = request.body.option;
    let searching = request.body.searching;


    conn.connect();
    let sql = "select * from PRD A JOIN PRD_IMG B ON (A.PRD_NO = B.PRD_NO) where (PRD_NM LIKE %?% OR PRD_DT LIKE %?%) AND A.PRD_CODE = ?";
    conn.query(sql, [searching, searching, option], function(err, rows){
        console.log(rows);

        if(!err){
            console.log("조회 성공");
            response.render("Search", {searched: rows});
        } else {
            console.log("조회 실패");
            response.redirect("/page/");
        }

    });
})
module.exports = router;