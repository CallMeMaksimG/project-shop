let orderItemHTML;
let orderWrapper = document.querySelector('.order-table');
let order = [];
let dataOrder = localStorage.getItem('cart');

if(dataOrder !== '' && dataOrder !== null) {
    order = JSON.parse(dataOrder);
}

order.forEach(element => {
    orderItemHTML = `<tr class="order-item-table" data-id='${element.id}'>
    <td>
        <div class="order-item" data-id='${element.id}' >
            <img src="${element.imgSrc}">
            <div class="info-item-wrapper-order">
            <div class="name-category-wrapper-order">
                <p>${element.title}</p>
                <p class="order-category">${element.category}</p>
            </div>
        </div>
    </td>
    <td>
        <div class="counter-wrapper order">
            <img class="counter-control-order" src="image/icon/minus.png" data-action="minus-order">
            <p class="counter-order" data-counter-order>${element.amount}</p>
            <img class="counter-control-order" src="image/icon/plus.png" data-action="plus-order">
            </div>
    </td>
    <td>
        <div class="order-price-wrapper">
            <p>${element.price}</p>
            </div>
    </td>
    <td>
    <div class="delete-item-order-wrapper" >
            <img src="image/icon/close-white.png" alt="delete" data-action="delete-item-order">
        </div>
    </td>
    </tr>
`
orderWrapper.insertAdjacentHTML('beforeend', orderItemHTML);
})
totalOrderPrice()

function totalOrderPrice(){
    const orderItems = document.querySelectorAll('.order-item-table');
    const totalPriceElOrd = document.querySelector('.total-price-order');
    
    let totalPriceOrder = 0;

    orderItems.forEach(function(item) {
 
        const amountEl = item.querySelector('[data-counter-order]');
        const priceEl = item.querySelector('.order-price-wrapper');
        const currentPrice = parseInt(amountEl.innerText) * parseInt(priceEl.innerText.replace(/\s/g,''));
       
        totalPriceOrder += currentPrice;
        
    })

    totalPriceElOrd.innerText = (totalPriceOrder).toLocaleString('ru');
    document.cookie = "totalPrice="+totalPriceElOrd.innerText;
    
}

//счетчик

window.addEventListener('click', function(event) {
    let counterOrder;

    if(event.target.dataset.action == 'delete-item-order') {
        let elementOrder = event.target.closest('.order-item-table');
        elementOrder.remove();
        totalOrderPrice();
    
        order.forEach((el, index) => {
            let elementOrder = event.target.closest('.order-item-table');
            let counterOrder = elementOrder.querySelector('.counter-order');
        //сравниваю id товаров в корзине после удаления и id в массиве корзины
        if(elementOrder.dataset.id == el.id) {
            order.splice(index,1);
            totalCounterBasket = totalCounterBasket - counterOrder.innerText;
            totalCounterBasketElement.innerText = totalCounterBasket;
            saveValueCounter();
            showBasketCounter();
            //перезаписываю данные
            saveCart();    
        }  
    })
    }

    if(event.target.dataset.action == 'plus-order' || event.target.dataset.action == 'minus-order') {
        const counterWrapperOrder = event.target.closest('.counter-wrapper');
        counterOrder = counterWrapperOrder.querySelector('[data-counter-order]');
    }
    //   является ли элемент плюсом
    if(event.target.dataset.action == 'plus-order'){
    
    //увеличиваем счетчик
    counterOrder.innerText = ++counterOrder.innerText;
    totalCounterBasket++;
            totalCounterBasketElement.innerText = totalCounterBasket;
            saveValueCounter();
            showBasketCounter();
    
    let itemOrders = event.target.closest('.order-item-table');
    //увеличиваем количество товаров в массиве
    order.forEach ((element) => {
        if(itemOrders.dataset.id == element.id){
            element.amount = parseInt(element.amount) + 1; 
        }
    })
    totalOrderPrice();
    saveCart();
}
function saveCart() {
            localStorage.setItem('cart', JSON.stringify(order))
            setCookie('order', JSON.stringify(order));
         }   
        saveCart();
    if(event.target.dataset.action == 'minus-order'){
        
                //проверяем чтобы счетчик был больше 1
                if(parseInt(counterOrder.innerText) > 1) {
                    //уменьшаем счетчик
                    counterOrder.innerText = --counterOrder.innerText;
                    totalCounterBasket--;
            totalCounterBasketElement.innerText = totalCounterBasket;
            saveValueCounter();
            showBasketCounter();
                    let itemOrders = event.target.closest('.order-item-table');
                    //уменьшаем количество товаров в массиве
                    order.forEach ((element) => {
                        if(itemOrders.dataset.id == element.id){
                            element.amount = parseInt(element.amount) - 1 ;   
                        }
                    })
                    totalOrderPrice();
                    saveCart();
                    // setCookie('order', dataOrder);
                    // document.cookie = "order="+dataOrder;
                }else if(parseInt(counterOrder.innerText) === 1){
                    //             //удаляем товар из корзины
                                let elementOrder = event.target.closest('.order-item-table');
                                elementOrder.remove();
                                totalOrderPrice();
                                 //удаление товара из local storage при удалении из корзины
                //                 //прохожу циклом по элементам корзины
                                order.forEach((el, index) => {
                //                     //сравниваю id товаров в корзине после удаления и id в массиве корзины
                                    if(elementOrder.dataset.id == el.id) {
                                        order.splice(index,1);
                                        totalCounterBasket--;
            totalCounterBasketElement.innerText = totalCounterBasket;
            saveValueCounter();
            showBasketCounter();
                //                         //перезаписываю данные
                                        saveCart()
                                       
                                    }
                })
            }           
}
})



function setCookie(name, value, options = {}) {

    options = {
      path: '/',
      // при необходимости добавьте другие значения по умолчанию
      ...options
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
  }
  

document.onchange = changeStyleBtn;

function changeStyleBtn () {
    let radioBtn = document.getElementsByName('delivery');
    let radioBtnPay = document.getElementsByName('payment');

        for (let i = 0; i < radioBtn.length; i++) {
            if (radioBtn[i].checked == true) {
                // console.log(radioBtn[i])
                radioBtn[i].parentNode.classList.add('active')
            } else {
                radioBtn[i].parentNode.classList.remove('active')
            }
        }
        const btnSubmit = document.querySelector('#submit-order');
        // console.log(btnSubmit.value);
        for (let i = 0; i < radioBtnPay.length; i++) {
            if (radioBtnPay[i].checked == true && radioBtnPay[i].id == 'bank-card') {
                radioBtnPay[i].parentNode.classList.add('active');
                btnSubmit.value = 'Перейти к оплате';
            } else if (radioBtnPay[i].checked == true && radioBtnPay[i].id == 'cash'){
                radioBtnPay[i].parentNode.classList.add('active');
            }else {
                radioBtnPay[i].parentNode.classList.remove('active');
                btnSubmit.value = 'Подтвердить заказ';
            }
        }  
}


