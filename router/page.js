// views 안에 있는 html 파일끼리 페이지 이동을 가능하게 해줌

const express = require("express");
const router = express.Router();

const db = require("../config/database");
let conn = db.init();

// http://localhost:8787/page
router.get('/', function (request, response) {
    let prd_size = request.query.ps;
    console.log("메인");
    console.log(prd_size);

    conn.connect();
    const query1 = () => {
        let sql = "";
        let val = [];
        if (prd_size == 'A' || prd_size == null){
            console.log("전체");
            sql = `SELECT D.IMG_PATH, C.PRD_NO, C.PRD_NM, C.PRD_PRICE, C.PRD_SCORE, C.CNT
                    FROM (SELECT A.PRD_NO, A.PRD_NM, A.PRD_PRICE, A.PRD_SCORE, A.PRD_RP/COUNT(*) AS CNT
                            FROM PRD A, PRD_ST B
                        WHERE A.PRD_NO = B.PRD_NO
                        GROUP BY B.PRD_NO) C , PRD_IMG D
                    WHERE D.PRD_NO = C.PRD_NO
                    ORDER BY CNT DESC
                    LIMIT 15;`;
        } else {
            console.log("일부");
            sql = `SELECT D.IMG_PATH, C.PRD_NO, C.PRD_NM, C.PRD_PRICE, C.PRD_SCORE, C.CNT
                    FROM (SELECT A.PRD_NO, A.PRD_NM, A.PRD_PRICE, A.PRD_SCORE, A.PRD_RP/COUNT(*) AS CNT
                            FROM PRD A, PRD_ST B
                        WHERE A.PRD_NO = B.PRD_NO
                          AND A.PRD_SIZE = ?
                        GROUP BY B.PRD_NO) C , PRD_IMG D
                    WHERE D.PRD_NO = C.PRD_NO
                    ORDER BY CNT DESC
                    LIMIT 15;`;
            val = [prd_size]
        }
        // rows.PRD_PRICE = String(rows.PRD_PRICE)[:-3]
        conn.query(sql, val, function (err, rows) {
            console.log(err);
            console.log(rows);
            console.log(String(rows[0].PRD_PRICE).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'));
            if (!err) {
                request.session.best = rows;
                query2();
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
                     LIMIT 20;`;
        conn.query(sql2, function (err, rows) {
            console.log(err);
            console.log(rows);
            if (!err) {
                request.session.new = rows;
                query3();
            } else {
                console.log(err);
            }
        });

    }
    const query3 = () => {
        let sql3 = `SELECT B.IMG_PATH, A.PRD_NO, A.PRD_NM, A.PRD_PRICE, A.PRD_SCORE, A.PRD_SALE
                      FROM (SELECT PRD_NO, PRD_NM, PRD_PRICE, PRD_SCORE, PRD_SALE
                              FROM PRD
                             WHERE PRD_SALE > 0) A, PRD_IMG B
                     WHERE A.PRD_NO = B.PRD_NO
                     ORDER BY PRD_SALE DESC
                     LIMIT 20;`;
                     
        conn.query(sql3, function (err, rows) {
            console.log(rows);
            if (!err) {
                request.session.sale = rows;
                query4();
            } else {
                console.log(err);
            }
        });
    }
    const query4 = () => {
        request.session.payflag = 0;
        let prc = [];
        let tpr = 0;
        let bpl = [];
        let l = 0;
        if (request.session.info != null){
            let id = request.session.info.ID;
            console.log(request.session.info.ID);
            console.log(id);
            conn.connect();
            let sql = `SELECT *
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
                        l = rows.length;
                        request.session.basket = rows;
                        for (let i = 0; i<rows.length; i++){
                            prc.push(String(rows[i].PRD_PRICE).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'));
                            tpr += rows[i].PRD_PRICE;
                            bpl.push(i);
                        }
                        tpr = String(tpr).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
                        console.log(prc);
                        console.log(tpr);
                        console.log(bpl);
                        console.log(l);
                        request.session.tpr = tpr;
                        request.session.bpl = bpl;
                        request.session.prc = prc;
                        request.session.length = l;
                        console.log(request.session.basket[0]);
                        console.log(prd_size);
                        response.render('Main', {
                            info: request.cookies.info, best: request.session.best, basket: request.session.basket,
                            new: request.session.new, sale: request.session.sale, p: prc, tp: tpr, arr: bpl, length: l, ps: prd_size
                        });
                    }
                } else {
                    console.log(err);
                    console.log(prd_size);
                    response.render('Main', {
                        info: request.cookies.info, best: request.session.best,
                        new: request.session.new, sale: request.session.sale, ps: prd_size
                    });
                }
            });
        } else {
            response.render('Main', {
                info: request.cookies.info, best: request.session.best, basket: [],
                new: request.session.new, sale: request.session.sale, p: [], tp: 0, arr: [], length: 0, ps: prd_size
            });
        }
    }

    query1();

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

    conn.connect();
    let sql = `SELECT A.*, B.IMG_PATH
                 FROM PRD A JOIN PRD_IMG B
                   ON A.PRD_NO = B.PRD_NO
                WHERE A.PRD_NO = ?`;
    
    // 쿼리 결과 
    conn.query(sql, PRD_NO, function(err, rows){
        if(!err){
            request.session.detail = rows[0];
            console.log(rows);
            response.render("detail", {detail: request.session.detail, 
                info : request.cookies.info,
                basket: request.session.basket,
                bpl: request.session.bpl, tpr: request.session.tpr,
                prc: request.session.prc, length: request.session.length});
        }
        else{
            console.log(err);
            response.redirect("/page/");
        }
    });
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

router.get("/delPrds", function(request, response){
    console.log("접근완");
    let delPrds = request.query.PRD_NO;
    let id = request.session.info.ID;
    console.log(delPrds);
    conn.connect();
    const query1 = () => {
        let sql = "delete from BASKET where ID = ? and PRD_NO =?";
        conn.query(sql, [id, delPrds], function(err, rows){
            console.log(rows);

            if(!err){
                console.log("장바구니 항목 삭제 성공");
                query2()
            } else {
                console.log("장바구니 항목 삭제 실패");
                response.render('basket', { basket: request.session.basket });
            }
        });
    }
    const query2 = () => {
        let sql2 = `SELECT *, DATE_FORMAT(DATE_ADD(NOW(), INTERVAL A.DEL_TIME  DAY), '%m') AS M, DATE_FORMAT(DATE_ADD(NOW(), INTERVAL A.DEL_TIME  DAY), '%d') AS D
                      FROM PRD A JOIN PRD_IMG B
                        ON A.PRD_NO=B.PRD_NO
                     WHERE A.PRD_NO IN (SELECT PRD_NO
                                          FROM BASKET
                                         WHERE ID = ?);`;
        conn.query(sql2, [id], function(err, rows){
            console.log(err);
            console.log(rows);
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
    }
    query1();
});

router.post('/autoSearch', function(request,response){
    let autoSearch = request.body.autoSearch;
    let as = request.body.as;
    console.log(autoSearch);
    console.log("!!!");
    console.log(as);
    console.log("!!!");

    conn.connect();
    let sql = "";
    let val = [];
    if (autoSearch.length < 1){
        if (as == 'b'){
            sql = `SELECT D.IMG_PATH, C.PRD_NO, C.PRD_NM, C.PRD_PRICE, C.PRD_SCORE, C.PRD_DETAIL, C.CNT
                    FROM (SELECT A.PRD_NO, A.PRD_NM, A.PRD_PRICE, A.PRD_SCORE, A.PRD_DETAIL, A.PRD_RP/COUNT(*) AS CNT
                            FROM PRD A, PRD_ST B
                            WHERE A.PRD_NO = B.PRD_NO
                            GROUP BY B.PRD_NO) C , PRD_IMG D
                    WHERE D.PRD_NO = C.PRD_NO
                    ORDER BY CNT DESC
                    LIMIT 20;`;
            val = []
        } else if (as == 's'){
            sql = `SELECT B.IMG_PATH, A.PRD_NO, A.PRD_NM, A.PRD_PRICE, A.PRD_SCORE, A.PRD_DETAIL, A.PRD_SALE
                     FROM (SELECT PRD_NO, PRD_NM, PRD_PRICE, PRD_SCORE, PRD_DETAIL, PRD_SALE
                             FROM PRD
                            WHERE PRD_SALE > 0) A, PRD_IMG B
                    WHERE A.PRD_NO = B.PRD_NO
                    ORDER BY PRD_SALE DESC
                    LIMIT 20;`;
            val = []
        } else if (as == 'n'){
            sql = `SELECT B.IMG_PATH, A.PRD_NO, A.PRD_NM, A.PRD_PRICE, A.PRD_SCORE, A.PRD_DETAIL, A.PRD_SIGN
                     FROM (SELECT PRD_NO, PRD_SIGN, PRD_NM, PRD_PRICE, PRD_DETAIL, PRD_SCORE
                             FROM PRD
                            WHERE PRD_SIGN > CURDATE()-100) A, PRD_IMG B
                    WHERE A.PRD_NO = B.PRD_NO
                    ORDER BY PRD_SIGN DESC
                    LIMIT 20;`;
            val = []
        }
    } else {
        if (as == 'b'){
            sql = `SELECT D.IMG_PATH, C.PRD_NO, C.PRD_NM, C.PRD_PRICE, C.PRD_SCORE, C.PRD_DETAIL, C.CNT
                    FROM (SELECT A.PRD_NO, A.PRD_NM, A.PRD_PRICE, A.PRD_SCORE, A.PRD_DETAIL, A.PRD_RP/COUNT(*) AS CNT
                            FROM PRD A, PRD_ST B
                            WHERE A.PRD_NO = B.PRD_NO
                            GROUP BY B.PRD_NO) C , PRD_IMG D
                    WHERE D.PRD_NO = C.PRD_NO
                    AND A.PRD_CODE = ?
                    ORDER BY CNT DESC
                    LIMIT 20;`;
            val = [autoSearch]
        } else if (as == 's'){
            sql = `SELECT B.IMG_PATH, A.PRD_NO, A.PRD_NM, A.PRD_PRICE, A.PRD_SCORE, A.PRD_DETAIL, A.PRD_SALE
                     FROM (SELECT PRD_NO, PRD_NM, PRD_PRICE, PRD_SCORE, PRD_DETAIL, PRD_SALE
                             FROM PRD
                            WHERE PRD_SALE > 0) A, PRD_IMG B
                    WHERE A.PRD_NO = B.PRD_NO
                      AND A.PRD_CODE = ?
                    ORDER BY PRD_SALE DESC
                    LIMIT 20;`;
            val = [autoSearch]
        } else if (as == 'n'){
            sql = `SELECT B.IMG_PATH, A.PRD_NO, A.PRD_NM, A.PRD_PRICE, A.PRD_SCORE, A.PRD_DETAIL, A.PRD_SIGN
                     FROM (SELECT PRD_NO, PRD_SIGN, PRD_NM, PRD_PRICE, PRD_DETAIL, PRD_SCORE
                             FROM PRD
                            WHERE PRD_SIGN > CURDATE()-100) A, PRD_IMG B
                    WHERE A.PRD_NO = B.PRD_NO
                      AND A.PRD_CODE = ?
                    ORDER BY PRD_SIGN DESC
                    LIMIT 20;`;
            val = [autoSearch]
        }
    }
    
    conn.query(sql, val, function(err, rows){
        console.log(rows);

        if(!err){
            console.log("조회 성공");
            response.render("Search", {searched: rows, info: request.cookies.info, os:{'option':autoSearch,'searching':as}});
        } else {
            console.log("조회 실패");
            response.redirect("/page/");
        }

    });
})

router.get('/brand', function (request, response) {
    conn.connect();
    let sql = `SELECT *
                 FROM PRD A JOIN PRD_IMG B
                   ON (A.PRD_NO = B.PRD_NO)
                ORDER BY A.SELLER_CODE ASC`;
    conn.query(sql, function(err, rows){
        if(!err){
            console.log(rows[0].SELLER_CODE);
            let row = [];
            let temp = [];
            let a = String(rows[0].SELLER_CODE);
            for (let i = 0; i<rows.length; i++) {
                if (String(rows[i].SELLER_CODE) == a){
                    temp.push(rows[i]);
                } else {
                    row.push(temp);
                    console.log(temp);
                    temp = [];
                    temp.push(rows[i]);
                    a = rows[i].SELLER_CODE;
                }
                console.log(a);
            }
            row.push(temp);
            console.log(row);
            response.render("Search", {info: request.cookies.info, row: row});
        }
        else{
            console.log(err);
            response.redirect("/page/");
        }
    });
});

router.get('/rentType', function(request,response){
    conn.connect();
    let sql = "";
    let val = [];
    let rentType = "";
    let po = "";
    if ( request.query.po == null){
        if (request.query.rt != null){
            rentType = request.query.rt;
            console.log(rentType);
            sql = `SELECT *
                    FROM PRD A JOIN PRD_IMG B
                    ON (A.PRD_NO = B.PRD_NO)
                    WHERE A.RENT_TYPE = ?;`;
            val = [rentType];
        }
    } else {
        po = request.query.po;
        if (request.query.rt == null){
            if (po == 'A'){
                sql = `SELECT *
                        FROM PRD A JOIN PRD_IMG B
                        ON (A.PRD_NO = B.PRD_NO)`;
                val = [];
            } else if (po == 'L' || po == 'M' || po == 'S'){
                sql = `SELECT *
                        FROM PRD A JOIN PRD_IMG B
                        ON (A.PRD_NO = B.PRD_NO)
                        WHERE A.PRD_SIZE = ?;`;
                val = [po];
            } else if (po == 'H'){
                sql = `SELECT *
                        FROM PRD A JOIN PRD_IMG B
                        ON (A.PRD_NO = B.PRD_NO)
                        ORDER BY A.PRD_RP DESC;`;
                val = [];
            } else if (po == 'E'){
                sql = `SELECT *
                        FROM PRD A JOIN PRD_IMG B
                        ON (A.PRD_NO = B.PRD_NO)
                        ORDER BY A.PRD_PRICE DESC;`;
                val = [];
            } else if (po == 'C'){
                sql = `SELECT *
                        FROM PRD A JOIN PRD_IMG B
                        ON (A.PRD_NO = B.PRD_NO)
                        ORDER BY A.PRD_PRICE ASC;`;
                val = [];
            }
        } else {
            rentType = request.query.rt;
            if (po == 'A'){
                sql = `SELECT *
                        FROM PRD A JOIN PRD_IMG B
                        ON (A.PRD_NO = B.PRD_NO)
                        WHERE A.RENT_TYPE = ?`;
                val = [rentType];
            } else if (po == 'L' || po == 'M' || po == 'S'){
                sql = `SELECT *
                        FROM PRD A JOIN PRD_IMG B
                        ON (A.PRD_NO = B.PRD_NO)
                        WHERE A.PRD_SIZE = ?
                        AND A.RENT_TYPE = ?;`;
                val = [po, rentType];
            } else if (po == 'H'){
                sql = `SELECT *
                        FROM PRD A JOIN PRD_IMG B
                        ON (A.PRD_NO = B.PRD_NO)
                        WHERE A.RENT_TYPE = ?
                        ORDER BY A.PRD_RP DESC;`;
                val = [rentType];
            } else if (po == 'E'){
                sql = `SELECT *
                        FROM PRD A JOIN PRD_IMG B
                        ON (A.PRD_NO = B.PRD_NO)
                        WHERE A.RENT_TYPE = ?
                        ORDER BY A.PRD_PRICE DESC;`;
                val = [rentType];
            } else if (po == 'C'){
                sql = `SELECT *
                        FROM PRD A JOIN PRD_IMG B
                        ON (A.PRD_NO = B.PRD_NO)
                        WHERE A.RENT_TYPE = ?
                        ORDER BY A.PRD_PRICE ASC;`;
                val = [rentType];
            }
        }
    }
    conn.query(sql, val, function(err, rows){
        console.log(rows);

        if(!err){
            console.log("조회 성공");
            response.render("Search", {searched: rows, info: request.cookies.info, rt: rentType, po: po});
        } else {
            console.log("조회 실패");
            response.redirect("/page/");
        }

    });
});

router.post('/Search', function(request,response){
    let option = request.body.option;
    let searching = request.body.searching;
    console.log(option);
    console.log(searching);
    
    conn.connect();
    let sql = "";
    let val = [];
    if (option.length < 1){
        // if (searching.length<1){
        //     response.render("Main", {info: request.cookies.info});
        // };
        sql = `SELECT *
                 FROM PRD A JOIN PRD_IMG B
                   ON (A.PRD_NO = B.PRD_NO)
                WHERE PRD_NM LIKE ? OR PRD_DETAIL LIKE ?;`;
        val = ['%'+searching+'%', '%'+searching+'%']
    } else {
        sql = `SELECT *
                 FROM PRD A JOIN PRD_IMG B
                   ON (A.PRD_NO = B.PRD_NO)
                WHERE (PRD_NM LIKE ? OR PRD_DETAIL LIKE ?)
                  AND A.PRD_CODE = ?;`;
        val = ['%'+searching+'%', '%'+searching+'%', option]
    }
    
    conn.query(sql, val, function(err, rows){
        console.log(rows);

        if(!err){
            console.log("조회 성공");
            response.render("Search", {searched: rows, info: request.cookies.info, os:{'option':option,'searching':searching}});
        } else {
            console.log("조회 실패");
            response.redirect("/page/");
        }

    });
})

router.get('/recall', function(request, response){
    response.render("recall")
})

router.get('/mypage', function(request, response){
    response.render("mypage")
})

router.get('/collection', function(request, response){
    response.render('collection', {order: request.session.order})
})
module.exports = router;