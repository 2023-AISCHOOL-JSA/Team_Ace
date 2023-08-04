document.addEventListener('DOMContentLoaded', function () {
    // 삭제 버튼을 참조합니다.
    const deleteButton = document.getElementById('deleteButton');

    // 삭제 버튼의 클릭 이벤트를 처리하는 함수를 정의합니다.
    function handleDeleteButtonClick(event) {
        // 선택된 상품 체크박스들을 찾습니다.
        const selectedProductCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');

        // 선택된 상품들이 있는 경우에만 삭제를 진행합니다.
        if (selectedProductCheckboxes.length > 0) {
            // 선택된 상품들을 삭제합니다.
            selectedProductCheckboxes.forEach((checkbox) => {
                const rowToDelete = checkbox.closest('tr');
                rowToDelete.remove();
            });

            // 전체선택 체크박스를 해제합니다.
            const allSelectCheckbox = document.querySelector('thead input[type="checkbox"]');
            allSelectCheckbox.checked = false;
        }
    }

    // 삭제 버튼의 클릭 이벤트를 리스닝합니다.
    deleteButton.addEventListener('click', handleDeleteButtonClick);
});
