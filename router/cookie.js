const express = require("express");
const router = express.Router();

// 쿠키 : 저장공간을 클라이언드로 이용해서 테이터를 관리하는 기술
// 쿠키 생성
router.get("/setCookie", function(request, response){
    let nick = "Jjajang";

    // cookie -? {key:value}
    response.cookie('nickName', nick, {
        maxAge : 10000, // maxAge : 만료기간 (1000 -> 1초), default -> Session (브라우저 닫기 전까지)
    });
    // path : cookie가 어디로 요청이 들어 왔을때만 생성할 것인지!
    // secure : https(보안) 으로 설정되어 있을때만 쿠키를 만들겠다!
    // httpOnly : 웹 서버를 통애서만 (http 통신일때만) 쿠키에 접근가능!

    response.send('쿠키 생성');
});

router.get("/getCookie", function(request, response){
    // 쿠키 가져오기
    // 쿠키 값을 가져올 때만 request객체를 이용
    console.log(request.cookies.nickName);
    response.send('쿠키 가져오기');
});

router.get("/deleteCookie", function(request, response){
    // 쿠키 지우기
    response.clearCookie('nickName');
    response.send('쿠키 삭제');
});

module.exports = router;