
// переменные
let back_btn = document.querySelector('.back-btn')
let use_btn = document.querySelectorAll('.use_btn')

// возврат на страничку

if (back_btn) {
    back_btn.addEventListener('click', function() {
        window.history.back()
    })
}

// добавление товара в корзину

if(use_btn.length > 0) {
    use_btn.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.cart-menu');
            const title = card.querySelector('.p-menu1').textContent;
            const priceText = card.querySelector('.p-menu2').textContent;
            const imgSrc = card.querySelector('.first-part img').getAttribute('src');
            const price = parseInt(priceText.replace('$', ''));
        })
    })
}
