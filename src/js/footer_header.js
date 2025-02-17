import Cart from "./Cart.js";
const headerNavLinks = document.querySelectorAll('.link_style');
const productId = localStorage.getItem('selectedProductId');
const totalPriceElem = document.querySelector('#totalPrice');

fetch('./data/data.json')
    .then(response => response.json())
    .then(data => {
        const productData = data.find(product => product.id === productId);
        const cart = new Cart(productData);

        const handleClickHeaderNavLinks = (event) => {
            event.preventDefault();
            event.target.classList.add('link_style_clicked');
        };

        const handleMouseIn = (event) => {
            event.target.classList.add('link_style_hovered');
        };

        const handleMouseOut = (event) => {
            event.target.classList.remove('link_style_hovered');
        };

        headerNavLinks.forEach((headerLink) => {
            headerLink.addEventListener('mouseover', handleMouseIn);
            headerLink.addEventListener('mouseout', handleMouseOut);
            headerLink.addEventListener('click', handleClickHeaderNavLinks);
        });

        const headerCart = document.querySelector('.header_login-cart_styles.header_cart');
        const headerLogin = document.querySelector('.header_login-cart_styles.header_login');

        const handleClickHeaderIcons = (event) => {
            event.preventDefault();
            event.currentTarget.classList.add('header_login-cart_styles_clicked');
        };

        if (headerCart) {
            headerCart.addEventListener('click', handleClickHeaderIcons);
        }

        if (headerLogin) {
            headerLogin.addEventListener('click', handleClickHeaderIcons);
        }

        const cartDigit = document.querySelector('.cart_digit');
        const cartCount = localStorage.getItem('cartCount' );
        const cartHeaderCounter = document.querySelector('[data-id="cart_header_counter_wrapper"]');
        if (cartCount) {
            cartHeaderCounter.classList.remove('hidden');
            cartDigit.textContent = cartCount;
        }

        const cartLabel = document.querySelector('.header_login-cart_styles');
        const cartPopup = document.querySelector('.cart-popup');
        let cartList = JSON.parse(localStorage.getItem('cartList')) || [];
        let counter = 0;

        // ------------------------------------------------------------------------------------------------------------------------------------------------------------------

        function renderCart() {
            const cartItemsList = cartPopup.querySelector('.cart-items');
            cartItemsList.innerHTML = '';
            let totalPrice = 0;

            cartList.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('cart-item');

                const imageContainer = document.createElement('div');
                imageContainer.style.position = 'relative';
                imageContainer.style.width = '50px';
                imageContainer.style.height = '50px';
                imageContainer.style.display = 'inline-block';

                const productData = data.find(product => product.id === item.id);
                if (productData && productData.img) {
                    const itemImage = document.createElement('img');
                    itemImage.src = productData.img;
                    itemImage.style.width = '50px';
                    itemImage.style.height = '50px';
                    itemImage.style.objectFit = 'contain';
                    imageContainer.appendChild(itemImage);
                }

                li.appendChild(imageContainer);

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
                amountInput.disabled = true; // Невозможно редактировать вручную

                const incrementBtn = document.createElement('button');
                incrementBtn.textContent = '+';
                incrementBtn.addEventListener('click', () => changeAmount(item, 1));

                amountContainer.appendChild(decrementBtn);
                amountContainer.appendChild(amountInput);
                amountContainer.appendChild(incrementBtn);

                li.appendChild(itemDetails);
                li.appendChild(amountContainer);
                cartItemsList.appendChild(li);

                totalPrice += item.price;
            });

            totalPriceElem.textContent = `${totalPrice} руб.`;

            const totalCostMedia = document.querySelector('.total_cost_media_card');

            totalCostMedia.textContent = `${totalPrice}₽`;
        }

        function showCart() {
            cartPopup.classList.remove('hidden');
            cartPopup.style.display = 'block';
            renderCart();
        }

        function hideCart() {
            cartPopup.classList.add('hidden');
            cartPopup.style.display = 'none';
        }

        cartLabel.addEventListener('mouseover', showCart);

        cartLabel.addEventListener('click', (event) => {
            event.stopPropagation();
            showCart();
        });

        cartPopup.addEventListener('mouseleave', hideCart);

        cartPopup.addEventListener('mouseover', (event) => {
            event.stopPropagation();
        });

        document.addEventListener('DOMContentLoaded', () => {
            cartLabel.addEventListener('mouseover', showCart);
            cartLabel.addEventListener('click', (event) => {
                event.stopPropagation();
                showCart();
            });
            const boxes_store = store.slice(0, 5);
            renderAll('', boxes_store);
            boxes.classList.add('selected-menu');
            const storedCartList = localStorage.getItem('cartList');
            if (storedCartList) {
                try {
                    cartList = JSON.parse(storedCartList);
                    counter = parseInt(localStorage.getItem('cartCount'), 10) || 0;

                    if (!Array.isArray(cartList)) {
                        cartList = [];
                    }

                    if (counter > 0) {
                        cartLabel.classList.remove('hidden');
                        cartLabel.setAttribute('data-before', counter);
                    } else {
                        cartLabel.classList.add('hidden');
                    }

                } catch (error) {
                    console.error('Ошибка при загрузке корзины из localStorage:', error);
                    cartList = [];
                }
            }
        });

        function changeAmount(item, delta) {
            const newAmount = item.amount + delta;
            if (newAmount < 0) return;

            if (newAmount === 0) {
                console.log('amount 0');
                cartList = cartList.filter(cartItem => cartItem !== item);
            } else {
                const pricePerItem = parseInt(item.price / item.amount, 10);
                item.amount = newAmount;
                item.price = item.amount * pricePerItem;
            }
            if (delta>0) {counter++} else {counter--}

            renderCart();
            localStorage.setItem('cartCount', counter);
            localStorage.setItem('cartList', JSON.stringify(cartList));
            localStorage.setItem('cartCount', counter.toString());
        }

        cartLabel.addEventListener('mouseover', showCart);

        cartLabel.addEventListener('click', (event) => {
            event.stopPropagation();
            showCart();
        });

        cartPopup.addEventListener('mouseleave', hideCart);

        cartPopup.addEventListener('mouseover', (event) => {
            event.stopPropagation();
        });

        const cardListAdded = [];
        cardListAdded.join(cart.loadCart());
    });

const linkMenus = document.querySelectorAll('.links_dinamic');

linkMenus.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetUrl = link.getAttribute('data-url');

        if (targetUrl) {
            window.location.href = targetUrl;
        }
    });
});



