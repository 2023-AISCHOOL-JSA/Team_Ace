// views 안에 있는 html 파일끼리 페이지 이동을 가능하게 해줌

const express = require("express");
const router = express.Router();

// http://localhost:3000/page
router.get('/', function(request,response){
    response.render('Main', {info: request.cookies.info});
});

// http://localhost:3000/page/Login
router.get('/Login', function(request,response){
    response.render("Login");
});

// http://localhost:3000/page/Join
router.get('/Join', function(request,response){
    response.render("Join");
});

// http://localhost:3000/page/Delete
router.get('/Delete', function(request,response){
    response.render("Delete");
});

// http://localhost:3000/page/Update
router.get('/Update', function(request,response){
    response.render("Update");
});

router.get('/Find', function(request,response){
    response.render("Find");
});

router.get('/Pay', function(request,response){
    response.render("Pay", {info: request.session.info,
    order: request.session.order});
});

// http://localhost:3000/page/selectAll
router.get('/selectAll', function(request,response){
    response.render("selectAll");
});

// http://localhost:3000/page/selectOne
router.get('/selectOne', function(request,response){
    response.render('selectOne', {info: request.cookies.info});
});


module.exports = router;