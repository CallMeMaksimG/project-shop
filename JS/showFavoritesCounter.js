const counterFavoritesBlock = document.querySelector('.counter-favorites');

window.addEventListener('DOMContentLoaded', function (){
    if (counterFavoritesBlock.innerText !== '0') {
        counterFavoritesBlock.classList.add('show');
    } else  {
        counterFavoritesBlock.classList.remove('show');
    }
})   


// function showFavoritesCounter () {
//     if (counterFavoritesBlock.innerHTML == '') {
//         console.log('ноль')
//         counterFavoritesBlock.classList.add('none');
//     } else if (counterFavoritesBlock.innerHTML > 0) {
//         counterFavoritesBlock.classList.remove('none');
//     }
// }


function showFavoritesCounter () {
    const counterFavoritesBlock = document.querySelector('.counter-favorites');
    counterFavorites.innerHTML = JSON.parse(localStorage.getItem('favorites')).length;
    if (counterFavoritesBlock.innerText !== '0') {
        counterFavoritesBlock.classList.add('show');
    } else {
        counterFavoritesBlock.classList.remove('show');
    }
}