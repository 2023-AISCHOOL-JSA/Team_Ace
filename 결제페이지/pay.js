const orderForm = document.getElementById("order-form");
const submitButton = document.getElementById("check_module");


submitButton.addEventListener("click", function (event) {
    const inputFields = orderForm.querySelectorAll("input[required]");
    for (const inputField of inputFields) {
        if (!inputField.value) {
            event.preventDefault(); // 폼 제출을 막습니다.
            alert("입력 필드를 모두 채워주세요.");
            break;
        }
    }
});


