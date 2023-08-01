// открытие поисковой строки
function openSearchBar() {
    let display = document.querySelectorAll('#search_bar')[0].style.display;
    if(display == 'none') {
      document.querySelectorAll('#search_bar')[0].style.display = 'flex';
    }
    else {
      document.querySelectorAll('#search_bar')[0].style.display = 'none';
    }
  }
  document.addEventListener("DOMContentLoaded", openSearchBar);

  // закрытие строки поика кнопокой "закрыть"
  function closeSearchBar() {
    document.querySelector('#search_bar').style.display = "none";
  }