
const express = require('express');
const app = express();

// const router = require("./router/router");
const page = require("./router/page");
const user = require("./router/user")
const routerCookie = require("./router/cookie");
const routerSession = require("./router/session");

// 쿠키에 있는 데이터를 꺼내올 때 바로 사용할 수 있게 변환
const cookieParse = require("cookie-parser");

// session : 공통 저장 공간을 서버에 만들어사 사용하는 기능
const session = require("express-session");

const ninjucks = require("nunjucks");


app.set("view engine", "html");
ninjucks.configure("views",{
    express: app,
    watch: true
});


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use(session({
    httpOnly : true,     // httpOnly : http 통신일 때 허용?
    secret : 'secretkey', // secret : 암호와키는?
    resave : false,       // resave : 요청이 들어왔을때 수정사항이 없어도 저장?
    saveUninitialized : false
}));
app.use('/s',routerSession);

app.use(cookieParse());
app.use('/c',routerCookie);
// app.use(router);
// 미들웨어 경로 설정
app.use('/page',page);
app.use('/user',user);

app.listen(3000);