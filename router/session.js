const express = require('express');
const router = express.Router();

router.get('/setSession', function(request,response){
    // 세션 생성하기
    request.session.nickName = "apple";
    request.session.age = 20;
    console.log(request.session);
    response.send("세션 생성");
});

router.get('/getSession', function(request,response){
    let cookieData = response.cookie;
    console.log(cookieData);
    
    // 세션 가져오기
    let nick = request.session.nickName;
    console.log(nick);
    console.log(request.session);
    response.send('세션 가져오기');
});

router.get('/deleteSession', function(request,response){
    // 세션 삭제하기
    // delete request.session.nickName;  // 세션 삭제
    // request.session.nickName = null;  // 세션은 남고 값만 null
    // request.session.nickName = NaN;   // 세션은 남고 값만 null
    request.session.destroy();           // 세션 삭제
    console.log(request.session);
    response.send('세션 삭제');
});

module.exports = router;