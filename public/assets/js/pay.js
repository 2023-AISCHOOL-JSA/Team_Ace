const orderForm = document.getElementById("order-form");
const submitButton = document.getElementById("check_module");

function inserToDB (info){
    const express = require("express");
    const router = express.Router();
    const db = require("../config/database");
    let conn = db.init();
    conn.connect();
    

    let sql = `update MEMBER set pw=?, nick=? where id=?`;
    conn.query(sql, function(err, rows){

    });
};

console.log(submitButton)

submitButton.addEventListener("click", function (event) {
    const inputFields = orderForm.querySelectorAll("input[required]");
    for (const inputField of inputFields) {
        if (!inputField.value) {
            event.preventDefault(); // 폼 제출을 막습니다.
            alert("입력 필드를 모두 채워주세요.");
            break;
        }
    }

    event.preventDefault();
    var IMP = window.IMP;
    IMP.init('imp84545626');

    IMP.request_pay({
        pg: 'inicis',
        pay_method: 'card',
        merchant_uid: 'merchant_' + new Date().getTime(),
        name: '주문명:결제테스트',
        //결제창에서 보여질 이름
        amount: 1000,
        //가격 
        buyer_email: 'iamport@siot.do',
        buyer_name: '구매자이름',
        buyer_tel: '010-1234-5678',
        buyer_addr: '서울특별시 강남구 삼성동',
        buyer_postcode: '123-456',
        m_redirect_url: 'https://www.yourdomain.com/payments/complete'
    },
        // 결제 성공, 실패
        function (rsp) {
            console.log(rsp);
            if (rsp.success) {
                var msg = '결제가 완료되었습니다.';
                msg += '고유ID : ' + rsp.imp_uid;
                msg += '상점 거래ID : ' + rsp.merchant_uid;
                msg += '결제 금액 : ' + rsp.paid_amount;
                msg += '카드 승인번호 : ' + rsp.apply_num;
                alert(msg);
                document.location.href='/user/basket';
            } else {
                var msg = '결제에 실패하였습니다.';
                msg += '에러내용 : ' + rsp.error_msg;
                alert(msg);
                document.location.href='/user/basket';
            }
            
        });
});