function toggleFavoritesStatus (){
    const favoritesWrapper = document.querySelector('.favorites-card-wrapper');
    const favoritesEmptyBadge = document.querySelector('.empty-favorites');

    if(favoritesWrapper.children.length > 0){
        favoritesEmptyBadge.classList.add('none');
    }else {
        favoritesEmptyBadge.classList.remove('none');
    }

}