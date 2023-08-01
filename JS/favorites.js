const favoritesWrapper = document.querySelector('.favorites-card-wrapper');
const iconActive = "image/icon/like-active.png";
const iconNotActive = "image/icon/like.png";
const card = document.querySelectorAll('.card');
const counterFavorites = document.querySelector('.counter-favorites');

if (localStorage.getItem('favorites') == '' || localStorage.getItem('favorites') == null) {
    counterFavorites.innerHTML = '0';
} else {
    counterFavorites.innerHTML = JSON.parse(localStorage.getItem('favorites')).length;
}

let itemInfoCard;
let favorites = [];
let dataFavorites = localStorage.getItem('favorites');

    if(dataFavorites !== '' && dataFavorites !== null){
        favorites = JSON.parse(dataFavorites);
    }
    favorites.forEach(element => {
        card.forEach(el => {
            let favoritesButton = el.querySelector('.add-favorites');
            if(element.id == el.dataset.id){
                favoritesButton.outerHTML = element.button;
            }
        })
    });

 window.addEventListener('click', function(event){
    //проверяем что клик был по кнопке "добавить в избранное"
    if(event.target.hasAttribute('data-favorites')) {
        //находим карту товара
        const card = event.target.closest('.card');
        //находим кнопку 
        const favoritesButton = card.querySelector('.add-favorites');
        //меняем стиль кнопки(активна)
        if(favoritesButton.getAttribute('src') == iconNotActive){

            favoritesButton.src = iconActive;
            favoritesButton.style.display = 'block';
        
            //собираем данные карты в объект
        itemInfoCard = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.card-image').getAttribute('src'),
            title: card.querySelector('.item-name').innerText,
            category: card.querySelector('.name-category-card').innerText,
            price: card.querySelector('.price-item').innerText,
            button: card.querySelector('.add-favorites').outerHTML
        }
        favorites.push(itemInfoCard);
    } else if (favoritesButton.getAttribute('src') === "image/icon/like-active.png"){
        const card = favoritesButton.closest('.card')
        favoritesButton.src = iconNotActive;
        favoritesButton.style.display = 'none';
         favorites.forEach((element, index) => {
                    if(element.id === card.dataset.id){
                        favorites.splice(index,1);
                        counterFavorites.innerHTML--;
                    }
                    showFavoritesCounter();
    })
}
    
    saveFavorites();
    showFavoritesCounter();

                    }
    
})
function saveFavorites () {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}