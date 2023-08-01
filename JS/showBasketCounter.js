const counterBasketBlock = document.querySelector('.counter-total-basket');

window.addEventListener('DOMContentLoaded', function (){
    if (counterBasketBlock.innerText !== '0' && counterBasketBlock.innerText != '') {
        counterBasketBlock.classList.add('show');
    } else  {
        counterBasketBlock.classList.remove('show');
    }
})   

function showBasketCounter () {
    const counterBasketBlock = document.querySelector('.counter-total-basket');
    totalCounterBasket.innerHTML = JSON.parse(localStorage.getItem('cart')).length;
    if (counterBasketBlock.innerText !== '0') {
        counterBasketBlock.classList.add('show');
    } else {
        counterBasketBlock.classList.remove('show');
    }
}