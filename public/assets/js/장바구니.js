document.addEventListener('DOMContentLoaded', function () {
    // 전체선택 체크박스와 상품 체크박스들을 참조합니다.
    const allSelectCheckbox = document.querySelector('thead input[type="checkbox"]');
    const productCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]');

    // 전체선택 체크박스의 클릭 이벤트를 처리하는 함수를 정의합니다.
    function handleAllSelectCheckboxClick() {
        const isChecked = allSelectCheckbox.checked;

        // 상품 체크박스들의 상태를 전체선택 체크박스와 동기화합니다.
        productCheckboxes.forEach((checkbox) => {
            checkbox.checked = isChecked;
        });
    }
    // 전체선택 체크박스의 클릭 이벤트를 리스닝합니다.
    allSelectCheckbox.addEventListener('click', handleAllSelectCheckboxClick);
});
