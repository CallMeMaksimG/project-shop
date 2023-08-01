$(document).ready(function(){
    if($('.menu').css('display') == 'flex'){
        $('.category').on('mouseenter', function(){
            let subcategory = $(this).parent().find('.subcategory');
            // subcategory.addClass('active');
            subcategory.fadeIn(90);
        
            $(this).parent().on('mouseleave', function(){
                // subcategory.removeClass('active');
                subcategory.fadeOut(90);
            })
        })
    }
})
