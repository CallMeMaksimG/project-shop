function toggleBasketStatus () {
   

    const basketWrapper = document.querySelector('.drop-down-basket-item-wrapper');
    const basketEmptyBadge = document.querySelector('.empty-basket');
    const orderForm = document.querySelector('.footer-drop-down-basket');

    if(basketWrapper.children.length > 0){
        basketEmptyBadge.classList.add('none');
        orderForm.classList.remove('none');
    }else{
        basketEmptyBadge.classList.remove('none');
        orderForm.classList.add('none');
    }
}