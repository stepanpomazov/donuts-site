const btnInCart = document.querySelector('.incart'); // кнопка "Добавить в корзину"
const cartLabel = document.querySelector('.header_login-cart_styles'); // корзина
const chkboxTopping = document.querySelectorAll('.optiontop'); // чекбоксы топпинга

let counter = 0; // счетчик нажатий кнопки "В корзину"
let cartList = []; // список товаров в корзине, изначально пустой

// Элемент для всплывающего окна
const cartPopup = document.querySelector('.cart-popup');
const cartItemsList = document.getElementById('cartItemsList'); // Список товаров в корзине
const totalPriceElem = document.getElementById('totalPrice'); // Элемент для отображения общей стоимости

// Загружаем данные из localStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const storedCartList = localStorage.getItem('cartList');
    if (storedCartList) {
        try {
            cartList = JSON.parse(storedCartList);
            counter = parseInt(localStorage.getItem('cartCount'), 10) || 0;
            
            // Если cartList пустой, инициализируем его как пустой массив
            if (!Array.isArray(cartList)) {
                cartList = [];
            }

            if (counter > 0) {
                cartLabel.classList.remove('hidden');
                cartLabel.setAttribute('data-before', counter);
            } else {
                cartLabel.classList.add('hidden');
            }

            updateCartPopup(); // Обновляем корзину
        } catch (error) {
            console.error('Ошибка при загрузке корзины из localStorage:', error);
            cartList = []; // Если произошла ошибка, инициализируем корзину как пустой массив
        }
    }
});

// Обработчик нажатия на кнопку "Добавить в корзину"
btnInCart.addEventListener('click', () => {
    const fillGlazebtn = document.querySelectorAll('.selected');
    const totalPrice = document.querySelector('.totalprice');

    // начальный товар
    let cartItem = {
        name: "Пончик-конструктор",
        description: "",
        amount: 1,
        price: parseInt(totalPrice.textContent.replace(/\D/g, ''), 10),
        imageLayers: getAllImageLayers() // Получаем все слои
    };

    let txt = ''; // переменная для описания начинки/глазури и топпинга
    let donutInCart = false;

    // делаем счетчик товаров в корзине видимым и увеличиваем его
    cartLabel.classList.remove('hidden');
    cartLabel.setAttribute('data-before', ++counter);

    // добавляем описание начинки/глазури/вкуса в переменную txt
    fillGlazebtn.forEach((btn) => {
        const spanChild = Array.from(btn.children).find(child => child.classList.contains('sort'));
        txt += spanChild.textContent + '/';
    });

    // добавляем описание топпинга в txt
    chkboxTopping.forEach((inp) => {
        if (inp.checked) {
            const labelTopping = document.querySelector(`label[for="${inp.id}"]`);
            txt += labelTopping.textContent + ',';
        }
    });

    // ищем товар с тем же описанием в корзине, если он есть - увеличиваем количество
    cartList.forEach((item) => {
        if (item.description === txt) {
            item.price += cartItem.price;
            item.amount++;
            donutInCart = true;
        }
    });

    // если товара нет, добавляем его в корзину
    if (!donutInCart) {
        cartItem.description = txt;
        cartList.push(cartItem);
    }

    // обновляем список товаров в корзине
    updateCartPopup();

    // Сохраняем данные в localStorage
    localStorage.setItem('cartList', JSON.stringify(cartList));
    localStorage.setItem('cartCount', counter.toString());
});

// Функция для получения всех слоев (изображений) из #donut-frame
function getAllImageLayers() {
    const frame = document.getElementById('donut-frame');
    const images = frame.querySelectorAll('img'); // Получаем все изображения внутри frame

    let imagePaths = [];
    images.forEach(image => {
        imagePaths.push(image.src); // Собираем пути всех изображений
    });

    return imagePaths; // Возвращаем массив всех путей изображений
}

// Функция для обновления содержимого корзины
function updateCartPopup() {
    cartItemsList.innerHTML = ''; // очищаем текущий список товаров

    let totalPrice = 0; // общая стоимость корзины

    // Перебираем все товары в корзине и добавляем их
    cartList.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('cart-item');

        // Создаем контейнер для изображения
        const imageContainer = document.createElement('div');
        imageContainer.style.position = 'relative'; // Позиционирование контейнера
        imageContainer.style.width = '50px'; // ширина контейнера
        imageContainer.style.height = '50px'; // высота контейнера
        imageContainer.style.display = 'inline-block'; // чтобы изображения располагались рядом

        // Если есть imageLayers, показываем их, если нет, показываем обычное изображение
        if (item.imageLayers && item.imageLayers.length > 0) {
            item.imageLayers.forEach((imagePath, index) => {
                const itemImage = document.createElement('img');
                itemImage.src = imagePath; // добавляем изображение товара
                itemImage.style.position = 'absolute'; // Абсолютное позиционирование для наложения
                itemImage.style.top = 0;
                itemImage.style.left = 0;
                itemImage.style.width = '50px'; // размер изображения
                itemImage.style.height = '50px';
                itemImage.style.objectFit = 'contain';
                itemImage.style.zIndex = index; // Устанавливаем z-index для слоев (чтобы порядок был правильным)

                imageContainer.appendChild(itemImage); // Добавляем изображение в контейнер
            });
        } else {
            // Если imageLayers нет, просто показываем одно изображение товара
            const itemImage = document.createElement('img');
            itemImage.src = item.img; // Берем изображение из товара
            itemImage.style.width = '50px';
            itemImage.style.height = '50px';
            itemImage.style.objectFit = 'contain';
            imageContainer.appendChild(itemImage); // Добавляем изображение товара
        }

        li.appendChild(imageContainer); // Добавляем контейнер с изображениями в список

        const itemDetails = document.createElement('div');
        itemDetails.classList.add('cart-item-details');

        const itemName = document.createElement('p');
        itemName.textContent = item.name;

        const itemDescription = document.createElement('p');
        itemDescription.textContent = `Описание: ${item.description}`;
        itemDescription.style.fontSize = '12px';
        const itemPrice = document.createElement('p');
        itemPrice.textContent = `Цена: ${item.price} руб.`;

        itemDetails.appendChild(itemName);
        itemDetails.appendChild(itemDescription);
        itemDetails.appendChild(itemPrice);

        const amountContainer = document.createElement('div');
        amountContainer.classList.add('cart-item-amount');

        const decrementBtn = document.createElement('button');
        decrementBtn.textContent = '-';
        decrementBtn.addEventListener('click', () => changeAmount(item, -1));

        const amountInput = document.createElement('input');
        amountInput.value = item.amount;
        amountInput.disabled = true;

        const incrementBtn = document.createElement('button');
        incrementBtn.textContent = '+';
        incrementBtn.addEventListener('click', () => changeAmount(item, 1));

        amountContainer.appendChild(decrementBtn);
        amountContainer.appendChild(amountInput);
        amountContainer.appendChild(incrementBtn);

        li.appendChild(itemDetails);
        li.appendChild(amountContainer);

        cartItemsList.appendChild(li);

        totalPrice += item.price; // считаем общую стоимость корзины
    });

    // Обновляем общую стоимость
    totalPriceElem.textContent = `${totalPrice} руб.`;
}

// Функция для обновления отображения счетчика корзины
function updateCartLabel() {
    if (counter > 0) {
        cartLabel.classList.remove('hidden');
        cartLabel.setAttribute('data-before', counter);
    } else {
        cartLabel.classList.add('hidden');
    }
}
// Функция для изменения количества товара
function changeAmount(item, delta) {
    const newAmount = item.amount + delta;
    if (newAmount < 0) return; // нельзя уменьшить до 0

    if (newAmount === 0) {
        console.log('amount 0');
        cartList = cartList.filter(cartItem => cartItem !== item);
    } else {
        const pricePerItem = parseInt(item.price / item.amount, 10);
        item.amount = newAmount;
        item.price = item.amount * pricePerItem; // обновляем цену в зависимости от количества
    }
    if (delta>0) {counter++} else {counter--}

    updateCartPopup(); // обновляем корзину после изменения
    updateCartLabel(); // обновляем счетчик на корзине

    // Сохраняем изменения в localStorage
    localStorage.setItem('cartList', JSON.stringify(cartList));
    localStorage.setItem('cartCount', counter.toString());
}

// Функция для показа корзины
function showCart() {
    cartPopup.classList.remove('hidden');
    cartPopup.style.display = 'block';
}

// Функция для скрытия корзины
function hideCart() {
    cartPopup.classList.add('hidden');
    cartPopup.style.display = 'none';
}

// Открытие корзины при наведении на иконку корзины
cartLabel.addEventListener('mouseover', showCart);

// Открытие корзины при клике на иконку корзины
cartLabel.addEventListener('click', (event) => {
    event.stopPropagation(); // предотвращаем распространение клика на документ
    showCart();
});

// Закрытие корзины, когда мышка покидает область корзины
cartPopup.addEventListener('mouseleave', hideCart);

// Также закрыть корзину, если пользователь уходит с кнопки корзины
// cartLabel.addEventListener('mouseleave', hideCart);

// Предотвращаем закрытие при наведении на корзину, если она уже открыта
cartPopup.addEventListener('mouseover', (event) => {
    event.stopPropagation(); // предотвращаем скрытие корзины при наведении на нее
});
