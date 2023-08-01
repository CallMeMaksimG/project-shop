function totalBasketPrice(){
    const basketItems = document.querySelectorAll('.drop-down-basket-item');
    const totalPriceEl = document.querySelector('.total-price');

    

    let totalPrice = 0;

    basketItems.forEach(function(item) {
        // console.log(item)
        const amountEl = item.querySelector('[data-counter]');
        const priceEl = item.querySelector('.price-wrapper');

        const currentPrice = parseInt(amountEl.innerText) * parseInt(priceEl.innerText.replace(/\s/g,''));
        // console.log(currentPrice)
        
        totalPrice += currentPrice;
        
    })
    // console.log(totalPrice)
    totalPriceEl.innerText = String(totalPrice).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
    // String(nubmer).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
    // console.log(totalPriceEl)
}