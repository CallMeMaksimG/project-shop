const favoritesWrapper = document.querySelector('.favorites-card-wrapper');
let favoritesItemHTML;
let favorites = [];
let dataFavorites = localStorage.getItem('favorites');
const counterFavorites = document.querySelector('.counter-favorites');
if (localStorage.getItem('favorites') == '' || localStorage.getItem('favorites') == null) {
    counterFavorites.innerHTML = '0';
} else {
    counterFavorites.innerHTML = JSON.parse(localStorage.getItem('favorites')).length;
}




const totalCounterBasketElement = document.querySelector('.counter-total-basket');
let totalCounterBasket = localStorage.getItem('counter'); 
totalCounterBasketElement.innerText = totalCounterBasket;


    if(dataFavorites !== '' && dataFavorites !== null){
        favorites = JSON.parse(dataFavorites);
    }
favorites.forEach ((element) => {
    favoritesItemHTML = `<article class="card favorites-card" data-id=${element.id}>
                            <a href="#"><img class='card-image' src=${element.imgSrc}></a>
                            <div class="name-item-wrapper">
                                <p class="name-item"><a href="#" class="item-name">${element.title}</a></p>
                            </div>
                            <p class="name-category-card">${element.category}</p>
                            <p class="price-item">${element.price}</p>
                            <div class="delete-button-wrapper"><img data-delete class="delete-favorites" src="image/icon/close.png" alt="delete"></div>
                            <button data-basket class="add-cart">в корзину</button>
                        </article>`
                        favoritesWrapper.insertAdjacentHTML('beforeend',favoritesItemHTML);
})
toggleFavoritesStatus()


//массив с информацией о товарах добавленных в корзину
let cart = [];
let data = localStorage.getItem('cart');
//проверяем есть ли записи в local storage
if(data !== '' && data !== null) {
    cart = JSON.parse(data)   
}
cart.forEach (element => {
    const card = document.querySelectorAll('.card');
    card.forEach (elCard => {
        if(elCard.dataset.id == element.id){
            const buttonHTML = elCard.querySelector('.add-cart');
            buttonHTML.outerHTML = element.button;
        }
    })
})

window.addEventListener('click', function(event){
    if(event.target.hasAttribute('data-delete')){
        let card = event.target.closest('.card');
        card.remove();
        favorites.forEach ((element, index) => {
            if(element.id == card.dataset.id){
                favorites.splice(index,1); 
                counterFavorites.innerHTML--;
            }
            saveFavorites()
            toggleFavoritesStatus()
            showFavoritesCounter()
        })
    }
})
function saveFavorites () {
    localStorage.setItem('favorites', JSON.stringify(favorites))
}

const basketWrapper = document.querySelector('.drop-down-basket-item-wrapper');
let itemInfo;
let basketItemHTML;
//массив с информацией о товарах добавленных в корзину

// циклом проходим каждый элемент массива и подставляем в шаблон html
cart.forEach(element => {
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
            //получаем товар в каталоге
            const card = document.querySelectorAll('.card');
            //циклом сравниваем id товара в каталоге и id товара в корзине
            card.forEach((el) => {
                if(el.dataset.id == element.id){
                const buttonHTML = el.querySelector('[data-basket]');
                //меняем кнопку в каталоге на данные из массива
                buttonHTML.outerHTML = element.button;   
            }
        })
        //отображение товара в корзине
            basketWrapper.insertAdjacentHTML('beforeend', basketItemHTML);
            //статус корзины пустая или полная
            toggleBasketStatus()
            //подсчет суммы
            totalBasketPrice()
});



   

//отслеживаем клик по странице
window.addEventListener('click', function(event){
    //проверяем что клик был по кнопке "добавить в корзину"
    if(event.target.hasAttribute('data-basket')){
        //находим карточку товара
        const card = event.target.closest('.card');
        let button;
        //находим кнопку
        button = card.querySelector('[data-basket]')
        // console.log(button)
        //проверяем текст кнопки
        if(button.innerText == 'В КОРЗИНУ') {
            //меняем текс и стиль кнопки на "добавлено"
            button.outerHTML = `<button data-basket="" class="active" disabled="">добавлено</button>`;  
        }
            
        
        //собираем данные с этого товара и записываем в объект

            itemInfo = {
                id: card.dataset.id,
                imgSrc: card.querySelector('.card-image').getAttribute('src'),
                title: card.querySelector('.item-name').innerText,
                category: card.querySelector('.name-category-card').innerText,
                price: card.querySelector('.price-item').innerText,
                amount: '1',
                button: card.querySelector('[data-basket]').outerHTML
            }

            
           

            //проверить есть ли такой товар в корзине
            const itemInBasket = basketWrapper.querySelector(`[data-id="${itemInfo.id}"]`);
            //если товар есть в корзине
            if(itemInBasket){
                let counterEl = itemInBasket.querySelector('[data-counter]');
                counterEl.innerText = parseInt(counterEl.innerText) + parseInt(itemInfo.amount);
                itemInfo.amount = counterEl.innerText
            }else {


            
            
        
        //собранные данные подставим в шаблон для товара в корзине
        basketItemHTML = `    <div class="drop-down-basket-item" data-id='${itemInfo.id}'">
                                    <img src="${itemInfo.imgSrc}">
                                    <div class="info-item-wrapper">
                                    <div class="name-category-wrapper">
                                        <p>${itemInfo.title}</p>
                                        <p class="drop-down-basket-category">${itemInfo.category}</p>
                                        <div class="counter-wrapper">
                                        <img class="counter-control" src="image/icon/minus.png" data-action="minus">
                                        <p class="counter-basket" data-counter>${itemInfo.amount}</p>
                                        <img class="counter-control" src="image/icon/plus.png" data-action="plus">
                                        </div>
                                    </div>
                                    </div>
                                    <div class="price-wrapper">
                                        <p>${itemInfo.price}</p>
                                        </div>
                                    
                                </div>`                    
        //отображение товара в корзине
         basketWrapper.insertAdjacentHTML('beforeend', basketItemHTML);
                saveCart()
            }
            //добавляем данные в массив корзины
            cart.push(itemInfo);  
            totalCounterBasket++; 
            totalCounterBasketElement.innerText = totalCounterBasket;
            saveValueCounter(); 
            showBasketCounter();      
                   
        
        //вызов функции отображение статуса корзины пустая/нет
        toggleBasketStatus()  
        //вызов функуии подсчета стоимости
        totalBasketPrice()
       
        saveCart()
        //функция сохранения всей корзины в local storage
        function saveCart() {
           localStorage.setItem('cart', JSON.stringify(cart))
        }     
}
})
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
            
            //находим все карты товаров
            let cardDocument = document.querySelectorAll('.card')
            //циклом ищем id товара
            cardDocument.forEach((element) => {
                
                //сравниваем id удаленного товара и карты в каталоге
                if(elementDropDownBasket.dataset.id == element.dataset.id) {
                    //если id совпал меняем текст и стили
                    element.querySelector('[data-basket]').outerHTML = `<button data-basket="">в корзину</button>`;
                }
            })
                //удаление товара из local storage при удалении из корзины
                //прохожу циклом по элементам корзины
                cart.forEach((el, index) => {
                    //сравниваю id товаров в корзине после удаления и id в массиве корзины
                    if(elementDropDownBasket.dataset.id == el.id) {
                        cart.splice(index,1)
                        totalCounterBasket--;
                        totalCounterBasketElement.innerText = totalCounterBasket;
                        saveValueCounter();
                        showBasketCounter();
                        //перезаписываю данные
                        saveCart()
                    }
                    //функция сохранения содержимого корзины в local storage
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