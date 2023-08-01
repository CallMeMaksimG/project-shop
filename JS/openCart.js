window.onload = document.querySelector('#basket').addEventListener('click', openCart)

function openCart(){
    if(document.querySelector('.drop-down-basket').style.display == 'none'){
    document.querySelector('.drop-down-basket').style.display = 'block';
    } else{
      document.querySelector('.drop-down-basket').style.display = 'none';
    }
    
  }
  document.addEventListener("DOMContentLoaded", openCart);

  document.querySelector('.close-basket').addEventListener('click', function(){
    document.querySelector('.drop-down-basket').style.display = 'none';
  })
  

