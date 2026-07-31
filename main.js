
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
            const product = {
                title: title,
                price: price,
                img: imgSrc,
                count: 1,
            };
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            if(existingProduct) {
                existingProduct.count + 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'shop.html';
        });
    })
}



// страница корзина вывод товаров и подсчет

const foodGrid = document.querySelector('.food-grid');
const buyAllBtn = document.querySelector('.buy-all-btn')

if(foodGrid) {
    function  renderCart() {
        let cart =  JSON.parse(localStorage.getItem('cart')) || []
        foodGrid.innerHTML = '';
        if(cart.length === 0) {
            foodGrid.innerHTML = '<p class ="empty-card-text">Your cart is empty</p>';
            if(buyAllBtn) buyAllBtn.textContent = 'buy all(0$)'
            return
        }

        let totalPrice = 0;
        

        cart.forEach((product, index) => {
            const itemPrice = product.price * product.count;
            totalPrice += itemPrice;

            const cardHTML = `
                <div class = "cart-menu" data-index="${index}
                    <p class ="p-1menu">${product.title} (x${product.count}</p>
                    <div>
                        <img src="${product.img}" alt="${product.title}">
                    </div>
                    <button class="delete-btn">delete</button>
                    <p class="p2-menu">${item.price}$</p>
                </div>`;
            foodGrid.insertAdjacentHTML('beforeend', cardHTML)
        });

    }
}



