
// переменные
let back_btn = document.querySelector('.back-btn')
const backButton = document.querySelector('.back-btn');
if (backButton) {
    backButton.addEventListener('click', () => {
        window.history.back();
    });
}

// === 2. СТРАНИЦА МЕНЮ: ДОБАВЛЕНИЕ В КОРЗИНУ ===
const useButtons = document.querySelectorAll('.use-btn');

if (useButtons.length > 0) {
    useButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.cart-menu');
            
            const title = card.querySelector('.p-menu1').textContent;
            const priceText = card.querySelector('.p-menu2').textContent;
            const imgSrc = card.querySelector('.first-part img').getAttribute('src');

            // Очищаем цену от знака $ и превращаем в число
            const price = parseInt(priceText.replace('$', ''));

            const product = {
                title: title,
                price: price,
                img: imgSrc,
                count: 1
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProduct = cart.find(item => item.title === product.title);

            if (existingProduct) {
                existingProduct.count += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'shop.html';
        });
    });
}

// === 3. СТРАНИЦА КОРЗИНЫ (SHOP): ВЫВОД ТОВАРОВ И ПОДСЧЕТ ===
const foodGrid = document.querySelector('.food-grid');
const buyAllBtn = document.querySelector('.buy-all-btn');

if (foodGrid) {
    function renderCart() {
        // Достаем актуальные данные из памяти
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Очищаем контейнер перед новой отрисовкой
        foodGrid.innerHTML = '';
        
        if (cart.length === 0) {
            foodGrid.innerHTML = '<p class="empty-cart-text">Your cart is empty</p>';
            if (buyAllBtn) buyAllBtn.textContent = 'buy all (0$)';
            return;
        }

        let totalPrice = 0;

        // Перебираем товары и создаем HTML-структуру
        cart.forEach((product, index) => {
            const itemPrice = product.price * product.count;
            totalPrice += itemPrice;

            const cardHTML = `
                <div class="cart-menu" data-index="${index}">
                    <div class="first-part">
                        <p class="p-menu1">${product.title} (x${product.count})</p>
                        <div class="white-background-imgo">
                            <img src="${product.img}" alt="${product.title}">
                        </div>
                    </div>
                    <div class="second-part">
                        <button class="delete-btn">delete</button>
                        <p class="p-menu2">${itemPrice}$</p>
                    </div>
                </div>
            `;
            foodGrid.insertAdjacentHTML('beforeend', cardHTML);
        });

        // Обновляем текст на кнопке покупки
        if (buyAllBtn) {
            buyAllBtn.textContent = `buy all (${totalPrice}$)`;
        }

        // Вешаем события на новые кнопки удаления
        initDeleteButtons();
    }

    function initDeleteButtons() {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const card = event.target.closest('.cart-menu');
                const index = card.getAttribute('data-index');
                
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                
                // Удаляем товар из массива по его индексу
                cart.splice(index, 1);
                
                // Сохраняем обновленный массив и перерисовываем экран
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });
    }

    // Запускаем отрисовку корзины при загрузке страницы shop.html
    renderCart();

    // Логика для кнопки "buy all" (очистка после покупки)
    if (buyAllBtn) {
        buyAllBtn.addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length > 0) {
                alert('Thank you for your order!');
                localStorage.removeItem('cart'); // Стираем корзину из памяти
                renderCart(); // Обновляем интерфейс
            }
        });
    }
}

