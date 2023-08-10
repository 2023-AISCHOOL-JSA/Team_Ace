$(document).ready(function () {

    $('ul.tabs li').click(function () {
        console.log('클릭완료!')
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    })

})


/*주문목록 tab*/ 

// 토글창(리뷰)
$(function (){
	$("#reviewBtn").click(function (){
        $("#reviewToggle").toggle();
    });
});

//  별점 리뷰
let index=0
$(document).ready(function () {
    $(".rating__star").click(function () {
        console.log("클릭")
        // 클릭한 별의 인덱스를 가져옴
        index = $(this).index();
        console.log(index)
        // 클릭한 별과 그 이전 별들의 클래스를 변경하여 노란색으로 표시
        $(".rating__star").removeClass("active");
        for (let i = 0; i <= index; i++) {
            $(".rating__star:eq(" + i + ")").addClass("active");
        }
    });
});

// 리뷰작성버튼 클릭 시 리뷰관리 탭에 추가
// let reviewButton = document.querySelector('#reviewButton');
// reviewButton.addEventListener('click',()=>{
    
// })

console.log(a.value)
let a = document.getElementById('reviewText')


// 주문이 1개씩 늘어날 때마다 .product 가 한개씩 늘어남
