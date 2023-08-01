const basketWrapper = document.querySelector('.drop-down-basket-item-wrapper');
let cart = [];
let data = localStorage.getItem('cart');
const totalCounterBasketElement = document.querySelector('.counter-total-basket');
let totalCounterBasket = localStorage.getItem('counter'); 
totalCounterBasketElement.innerText = totalCounterBasket;
if(data !== '' && data !== null) {
    cart = JSON.parse(data)
    
}
if(cart !== null || cart !== undefined){

    cart.forEach((element) => {
        basketItemHTML =  `    <div class="drop-down-basket-item" data-id='${element.id}'">
                                    <img src="${element.imgSrc}">
                                    <div class="info-item-wrapper">
                                    <div class="name-category-wrapper">
                                        <p>${element.title}</p>
                                        <p class="drop-down-basket-category">${element.category}</p>
                                        <div class="counter-wrapper">
                                        <img class="counter-control" src="image/icon/minus.png" data-action="minus">
                                        <p class="counter-basket" data-counter>${element.amount}</p>
                                        <img class="counter-control" src="image/icon/plus.png" data-action="plus">
                                        </div>
                                    </div>
                                    </div>
                                    <div class="price-wrapper">
                                        <p>${element.price}</p>
                                        </div>
                                    
                                </div>`                    
                                        //отображение товара в корзине
                                        
                                        basketWrapper.insertAdjacentHTML('beforeend', basketItemHTML);
                                        toggleBasketStatus()
                                        totalBasketPrice()
                                    });
                                }
function totalBasketPrice() {
    const basketItems = document.querySelectorAll('.drop-down-basket-item');
    const totalPriceEl = document.querySelector('.total-price');

    let totalPrice = 0;
    basketItems.forEach(function(item) {
        const amountEl = item.querySelector('.counter-basket');
        const priceEl = item.querySelector('.price-wrapper');

        const currentPrice = parseInt(amountEl.innerText) * parseInt(priceEl.innerText.replace(/\s/g,''));
        totalPrice += currentPrice;
    })
    totalPriceEl.innerText = (totalPrice).toLocaleString('ru');
}


// счетчик количества одного товара в корзине
window.addEventListener('click', function(event) {
    //объявляем переменную счетчика
    let counter;
    
    //проверяем клик по кнопкам плюс или минус(чтобы не возникала ошибка)
    if(event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
       //находим родителя
     const counterWrapper = event.target.closest('.counter-wrapper');
   
     //в родителе находим число счетчика
     counter = counterWrapper.querySelector('[data-counter]');
    }

     
    //является ли элемент плюсом
    if(event.target.dataset.action == 'plus'){
    
    //увеличиваем счетчик
    counter.innerText = ++counter.innerText;
    totalCounterBasket++; 
            totalCounterBasketElement.innerText = totalCounterBasket;
            saveValueCounter(); 
            showBasketCounter();
    let itemBasket = event.target.closest('.drop-down-basket-item');
    //увеличиваем количество товаров в массиве
    cart.forEach ((element) => {
        if(itemBasket.dataset.id == element.id){
            element.amount = parseInt(element.amount) + 1;
            
        }
    })
    
    totalBasketPrice();
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart))
     }   
    saveCart();

    
    }
    //является ли элемент минусом
    if(event.target.dataset.action == 'minus'){
        
        //проверяем чтобы счетчик был больше 1
        if(parseInt(counter.innerText) > 1) {
            //уменьшаем счетчик
            counter.innerText = --counter.innerText;
            totalCounterBasket--; 
            totalCounterBasketElement.innerText = totalCounterBasket;
            saveValueCounter(); 
            showBasketCounter();
            let itemBasket = event.target.closest('.drop-down-basket-item');
            //уменьшаем количество товаров в массиве
            cart.forEach ((element) => {
                if(itemBasket.dataset.id == element.id){
                    element.amount = parseInt(element.amount) - 1 ;   
                }
            })
            
            totalBasketPrice();
            function saveCart() {
                localStorage.setItem('cart', JSON.stringify(cart))
             }   
            saveCart();
        }else if(parseInt(counter.innerText) === 1){
            //удаляем товар из корзины
            let elementDropDownBasket = event.target.closest('.drop-down-basket-item')
            elementDropDownBasket.remove();


            toggleBasketStatus();
            totalBasketPrice();
            cart.forEach((el, index) => {
                if(elementDropDownBasket.dataset.id == el.id) {
                    // console.log('el равны')
                    cart.splice(index,1)
                    totalCounterBasket--; 
            totalCounterBasketElement.innerText = totalCounterBasket;
            saveValueCounter(); 
            showBasketCounter();
                    saveCart()
                }
                function saveCart() {
                    localStorage.setItem('cart', JSON.stringify(cart))
                 }     
                
            })
            
        
    }
    
    }
})

function saveValueCounter() {
    localStorage.setItem('counter', totalCounterBasket);
}