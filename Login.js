    // 
const form = document.querySelector("form");
const passwordInput = document.getElementById("password");
const passToggleBtn = document.getElementById("pass-toggle-btn");

    //
const showError = (field, errorText) => {
    field.classList.add("error");
    const errorElement = document.createElement("small");
    errorElement.classList.add("error-text");
    errorElement.innerText = errorText;
    field.closest(".form-group").appendChild(errorElement);
}

//
const handleFormData = (e) => {
    e.preventDefault();

    // 
    const fullnameInput = document.getElementById("fullname");
    const idInput = document.getElementById("id");
    const dateInput = document.getElementById("date");
    const genderInput = document.getElementById("gender");

    // 
    const fullname = fullnameInput.value.trim();
    const id = idInput.value.trim();
    const password = passwordInput.value.trim();
    const date = dateInput.value;
    const gender = genderInput.value;


    // 
    document.querySelectorAll(".form-group .error").forEach(field => field.classList.remove("error"));
    document.querySelectorAll(".error-text").forEach(errorText => errorText.remove());

    // 빈칸 입력시 에러메세지 출력
    if (fullname === "") {
        showError(fullnameInput, "이름을 입력해주세요");
    }
    if (id === "") {
        showError(idInput, "아이디를 입력해주세요");
    }
    if (password === "") {
        showError(passwordInput, "비밀번호를 입력해주세요");
    }
    if (date === "") {
        showError(dateInput, "생년월일을 입력해주세요");
    }
    if (gender === "") {
        showError(genderInput, "성병을 입력해주세요");
    }

    // 
    const errorInputs = document.querySelectorAll(".form-group .error");
    if (errorInputs.length > 0) return;

    // 
    form.submit();
}

// 비밀번호 아이콘
passToggleBtn.addEventListener('click', () => {
    passToggleBtn.className = passwordInput.type === "password" ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

// 회원가입 버튼
form.addEventListener("submit", handleFormData);