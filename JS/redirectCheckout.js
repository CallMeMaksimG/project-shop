const checkoutBtn = document.querySelector('#checkout');
const message = document.querySelector('.enter-message');
checkoutBtn.addEventListener('click', redirect);

function redirect() {
    document.location = 'order.html';
//     if(document.cookie.indexOf("email") == -1) {
//         document.location='enter.php';
//         document.cookie = "message=value; max-age=3";
        
//     }else {
//         document.location='order.php';
//     }
// }
// if(document.cookie.indexOf("message") !== -1) {
//     message.style.display = 'block';
}