document.addEventListener("DOMContentLoaded", () => {
    const mainImg = document.querySelector(".main-img");
    const subImages = document.querySelectorAll(".sub-img");

    subImages.forEach((subImg) => {
        subImg.addEventListener("click", () => {
            mainImg.src = subImg.src;
        });
    });
});
