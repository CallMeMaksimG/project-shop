$(document).ready(function(){
    $('.card').on('mouseenter', function(){
        let favorites = $(this).find('.add-favorites');
        favorites.addClass('active');
    $('.card').on('mouseleave', function(){
        favorites.removeClass('active');
    })

    })
})