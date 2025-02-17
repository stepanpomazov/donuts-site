document.addEventListener('DOMContentLoaded', () => {
    // Получаем метку корзины
    const cartLabel = document.querySelector('.cart_digit');
    if (!cartLabel) {
        console.error('Элемент .cart_digit не найден в DOM!');
        return;
    }

    const productId = localStorage.getItem('selectProductId');
    let cartList = JSON.parse(localStorage.getItem("cartList")) || [];
    let productData = null;

    // Счетчик количества товаров в корзине
    let counter = cartList.reduce((sum, item) => sum + item.amount, 0);

    // Функция для сохранения корзины в localStorage
    function saveCart() {
        localStorage.setItem("cartList", JSON.stringify(cartList));
    }

    // Функция для обновления cartCount в localStorage
    function updateCartCount() {
        counter = cartList.reduce((sum, item) => sum + item.amount, 0);
        localStorage.setItem('cartCount', counter.toString());
        console.log(`Обновлено количество товаров в корзине: ${counter}`);
    }

    // Функция для обновления метки корзины
    function updateCartLabel() {
        const cartCount = localStorage.getItem('cartCount') || '0';
        // Прямое обновление текста элемента
        if (parseInt(cartCount) > 0) {
            cartLabel.classList.remove('hidden');
            cartLabel.textContent = cartCount;  // Обновляем текст, а не атрибут
            console.log(`Метка корзины обновлена, новое количество товаров: ${cartCount}`);
        } else {
            cartLabel.classList.add('hidden');
            console.log('Метка корзины скрыта (количество равно 0).');
        }
    }

    // Функция для обработки нажатия кнопки добавления товара в корзину
    function handleCartButtonClick(btn) {
        if (!productData) {
            console.error("Данные о товаре не загружены");
            return;
        }

        const existingProduct = cartList.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.amount += 1;
            console.log(`Количество товара "${productData.name}" увеличено на 1.`);
        } else {
            cartList.push({
                id: productData.id,
                name: productData.name,
                description: productData.description,
                img: productData.img,
                price: productData.price,
                amount: 1
            });
            console.log(`Товар "${productData.name}" добавлен в корзину.`);
        }

        saveCart();
        updateCartCount();
        updateCartLabel();

        console.log('Корзина после добавления товара:', cartList);

        const countControls = document.createElement('div');
        btn.replaceWith(countControls);
        countControls.classList.add('count_controls');
        countControls.innerHTML = `
            <div class="count_controls">
                <button class="btn-reset cart_count_change_btns minus_button">-</button>
                <span class="cart_number">${existingProduct ? existingProduct.amount : 1}</span>
                <button class="btn-reset cart_count_change_btns plus_button">+</button>
            </div>`;

        const minusBtn = countControls.querySelector('.minus_button');
        const plusBtn = countControls.querySelector('.plus_button');
        const countProductRender = countControls.querySelector('.cart_number');

        minusBtn.addEventListener('click', () => {
            const cartItem = cartList.find(item => item.id === productId);
            if (cartItem.amount > 1) {
                cartItem.amount -= 1;
                countProductRender.textContent = cartItem.amount;
                console.log(`Количество товара "${productData.name}" уменьшено на 1.`);
            } else {
                cartList = cartList.filter(item => item.id !== productId);
                countControls.replaceWith(btn);
                console.log(`Товар "${productData.name}" удален из корзины.`);
            }
            saveCart();
            updateCartCount();
            updateCartLabel();
        });

        plusBtn.addEventListener('click', () => {
            const cartItem = cartList.find(item => item.id === productId);
            cartItem.amount += 1;
            countProductRender.textContent = cartItem.amount;
            console.log(`Количество товара "${productData.name}" увеличено на 1.`);
            saveCart();
            updateCartCount();
            updateCartLabel();
        });
    }

    fetch('./data/data.json')
        .then(response => response.json())
        .then(data => {
            productData = data.find(product => product.id === productId);

            if (productData) {
                document.querySelector('.routing_card_url').textContent = productData.name;
                document.querySelector('.card_h2').textContent = productData.name;
                document.querySelector('.productImage').src = productData.img;
                document.querySelector('.productImage').alt = productData.name;
                document.querySelector('.productPrice').textContent = `${productData.price} ₽`;
                document.querySelector('.productKcal').textContent = productData.kcal;
                document.querySelector('.productProteins').textContent = productData.proteins;
                document.querySelector('.productFats').textContent = productData.fats;
                document.querySelector('.productCarbohydrates').textContent = productData.carbohydrates;
                document.querySelector('.productDescription').textContent = productData.description;
                document.querySelector('.productComposition').textContent = productData.composition;

                const cartBtn = document.querySelector('.card_btn_cart');
                const cartBtnMobile = document.querySelector('.btn_media_cart_card');

                if (cartBtn) {
                    cartBtn.addEventListener('click', () => handleCartButtonClick(cartBtn));
                }

                if (cartBtnMobile) {
                    cartBtnMobile.addEventListener('click', () => handleCartButtonClick(cartBtnMobile));
                }

                // Инициализируем начальное состояние метки корзины!
                updateCartLabel();
            } else {
                window.location.href = 'index1.html';
            }
        });
});