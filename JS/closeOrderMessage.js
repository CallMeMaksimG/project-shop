const closeBtn = document.querySelector('.close-order-message');
const block = document.querySelector('.create-order-message');

if(closeBtn) {
    closeBtn.addEventListener('click',  function () {
        block.style.display = 'none';
    })
}
