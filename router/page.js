// views 안에 있는 html 파일끼리 페이지 이동을 가능하게 해줌

const express = require("express");
const router = express.Router();

const db = require("../config/database");
let conn = db.init();

// http://localhost:3000/page
router.get('/', function (request, response) {
    console.log("메인");
    conn.connect();
    // let id = '';
    // if (request.session.info != null){
    //     id = request.session.info.ID
    // } else {



    // }

    const query1 = () => {
        let sql = `SELECT IMG_PATH, C.PRD_NO, C.CNT
                     FROM (SELECT A.PRD_NO, A.PRD_RP/COUNT(*) AS CNT
                             FROM PRD A, PRD_ST B
                            WHERE A.PRD_NO = B.PRD_NO
                            GROUP BY B.PRD_NO
                            LIMIT 10) C , PRD_IMG D
                    WHERE D.PRD_NO = C.PRD_NO
                    ORDER BY CNT DESC;`;
        conn.query(sql, function (err, rows) {
            console.log(err);
            console.log(rows);
            if (!err) {
                request.session.best = rows;
                console.log(request.session.best[0].PRD_NO);
                query2()
            } else {
                console.log(err);
            }
        });
    }
    const query2 = () => {
        let sql2 = `SELECT B.IMG_PATH, A.PRD_NO, A.PRD_SIGN
                      FROM (SELECT PRD_NO, PRD_SIGN
                              FROM PRD
                             WHERE PRD_SIGN > CURDATE()-100
                             LIMIT 10) A, PRD_IMG B
                     WHERE A.PRD_NO = B.PRD_NO
                     ORDER BY PRD_SIGN DESC;`;
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

        let sql3 = `SELECT B.IMG_PATH, A.PRD_NO, A.PRD_SALE
                      FROM (SELECT PRD_NO, PRD_SALE
                              FROM PRD
                             WHERE PRD_SALE > 0
                             LIMIT 10) A, PRD_IMG B
                     WHERE A.PRD_NO = B.PRD_NO
                     ORDER BY PRD_SALE DESC`;
        conn.query(sql3, function (err, rows) {
            console.log(err);
            console.log(rows);
            if (!err) {
                request.session.sale = rows;
                response.render('Main', {
                    info: request.cookies.info, best: request.session.best,
                    new: request.session.new, sale: request.session.sale
                });
            } else {
                console.log(err);
            }
        });
    }

    query1()

});

// http://localhost:3000/page/Login
router.get('/Login', function (request, response) {
    response.render("Login", { loginFlag: request.session.loginFlag });
});

// http://localhost:3000/page/Join
router.get('/Join', function (request, response) {
    response.render("Join");
});

// http://localhost:3000/page/Delete
router.get('/Delete', function (request, response) {
    response.render("Delete");
});

// http://localhost:3000/page/Update
router.get('/Update', function (request, response) {
    response.render("Update");
});

router.get('/Find', function (request, response) {
    response.render("Find");
});

router.get('/Cart', function (request, response) {
    response.render("Cart");
});

router.get('/Pay', function (request, response) {
    response.render("Pay", {
        info: request.session.info,
        order: request.session.order
    });
});

// http://localhost:3000/page/selectAll
router.get('/selectAll', function (request, response) {
    response.render("selectAll");
});

// http://localhost:3000/page/selectOne
router.get('/selectOne', function (request, response) {
    response.render('selectOne', { info: request.cookies.info });
});

router.get('/basket', function (request, response) {
    response.render('basket', { basket: request.session.basket });
});


module.exports = router;