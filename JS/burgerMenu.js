document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#burger').addEventListener('click', function(){
        document.querySelector('.navbar').classList.toggle('open');
        document.querySelector('.search-burger').classList.toggle('open');
        document.querySelector('.account-burger').classList.toggle('open');
        if(document.querySelector('.shadow').style.display == 'none'){

            document.querySelector('.shadow').style.display = 'block';
        }else {
            document.querySelector('.shadow').style.display = 'none';
        }
        
    })
    window.addEventListener('click', function(event){
        if(event.target.hasAttribute('data-down')){
            const category = event.target.closest('.category-wrapper');
            const subcategory = category.querySelector('.subcategory');
            const button = category.querySelector('.accordion-btn');
            button.classList.toggle('open');
            subcategory.classList.toggle('open');
        }
    })
})
