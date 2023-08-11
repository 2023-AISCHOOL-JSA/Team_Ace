const errMsg = document.getElementById('errMsg'); 
const inputID= document.getElementById('inputId');
const inputPW= document.getElementById('inputPw');
const loginButton= document.getElementById('loginButton');
const loginForm= document.getElementById("loginForm");

/* db에 담겨있는 'ID' 와 사용자의 입력값, db에 담겨있는 'PW'와 사용자의 입력값
이 다르면 오류메시지가 뜨는 로직 

Back 추가 --> 아이디와 비밀번호가 일치하면 로그인된 페이지로 넘어가기 
*/ 

document.addEventListener('DOMContentLoaded',()=>{
    loginForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        if(inputID.value !=='ID' || inputPW.value !=='PW'){
            errMsg.style.display='block';
        }
        else{errMsg.style.display='none'}
    })
})
