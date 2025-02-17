const mainGrid = document.querySelector('.grid-card');
const boxes = document.querySelector('#boxes');
const donuts = document.querySelector('#donuts');
const searchField = document.querySelector('.search');
const btnSearch = document.querySelector('.btn-search');
const btnBack = document.querySelector('.btn-back');
const cartLabel = document.querySelector('.header_login-cart_styles'); // корзина
const cartPopup = document.querySelector('.cart-popup');
const totalPriceElem = document.querySelector('#totalPrice'); // Элемент для отображения общей цены
const store = [
  {
    id:'11',
    img: '../../images/boxes/Xmas_box1.png',
    name: 'Новогодний набор 1',
    description:'воздушное тесто, фруктовая начинка, разноцветная глазурь, посыпка конфети',
    price: 1700
  },

  {
    id:'12',
    img:  '../../images/boxes/Xmas_box2.png',
    name: 'Новогодний набор 2',
    description:'воздушное тесто, карамельная начинка, разноцветная глазурь, посыпка снег',
    price: 1700
  },

  {
    id:'13',
    img:  '../../images/boxes/box2.png',
    name: 'Фруктовый микс',
    description:'воздушное тесто, фруктовая начинка, разноцветная глазурь, посыпка кокос',
    price: 1700
  },

  {
    id:'14',
    img:  '../../images/boxes/box1.png',
    name: 'Шоколадный набор 1',
    description:'воздушное тесто,  карамельная и фруктовая начинка, глаузурь  - молочный и белый шоколад, посыпка орех',
    price: 1700
  },

  {
    id:'15',
    img:  '../../images/boxes/box3.png',
    name: 'Шоколадный набор 2',
    description:'воздушное тесто, карамельная и шоколадная начинка, глаузурь  - молочный и темный шоколад, посыпка орех',
    price: 1700
  },

  {
    id:'21',
    img:  '../../images/menu_donuts/xmas1.png',
    name: 'Елочка',
    description:'воздушное тесто, карамельная начинка,разноцветная глазурь',
    price: 189
  },
  {
    id:'22',
    img:  '../../images/menu_donuts/zmas2.png',
    name: 'Еловый шар',
    description:'воздушное тесто, карамельная начинка,  разноцветная глазурь',
    price: 189
  },
  {
    id:'23',
    img:  '../../images/menu_donuts/orange_donut.png',
    name: 'Апельсиновый',
    description:'воздушное тесто, карамельная начинка, апельсиновая глазурь, посыпка конфети',
    price: 189
  },
  {
    id:'24',
    img:  '../../images/menu_donuts/nuts.png',
    name: 'Молочный шоколад',
    description:'воздушное тесто, карамельная начинка, глазурь молочный шоколад, посыпка орех',
    price: 189
  },
  {
    id:'25',
    img:  '../../images/menu_donuts/Strawberry_nuts.png',
    name: 'Клубничный',
    description:'воздушное тесто, клубничная начинка, клубничная глазурь, посыпка орех',
    price: 189
  },
  {
    id:'26',
    img:  '../../images/menu_donuts/lemon.png',
    name: 'Лимон',
    description:'воздушное тесто, лимонная начинка, лимонная глазурь, посыпка конфети',
    price: 189
  },
  {
    id:'27',
    img:  '../../images/menu_donuts/caramel_cho.png',
    name: 'Карамельный',
    description:'воздушное тесто, карамельная начинка, карамельная глазурь, посыпка шоколадная крошка',
    price: 189
  },
  {
    id:'28',
    img:  '../../images/menu_donuts/cho_cho.png',
    name: 'Темный шоколад',
    description:'воздушное тесто, шоколадная начинка, шоколадная глазурь, посыпка конфетти',
    price: 189
  },
  {
    id:'31',
    img:  '../../images/menu_donuts/nutscho.png', 
    name: 'Карамельно-шоколадный',
    description:'воздушное тесто, карамельная начинка, шоколадная глазурь, посыпка шоколадная крошка',
    price: 189
  },
  {
    id:'32',
    img:  '../../images/menu_donuts/Strawberry_choc.png',
    name: 'Вишневый',
    description:'воздушное тесто, вишневая начинка, вишневая глазурь, посыпка шоколадная крошка',
    price: 189
  },
  {
    id:'33',
    img:  '../../images/menu_donuts/white_coconut.png',
    name: 'Белый шоколад',
    description:'воздушное тесто, карамельная начинка, глазурь белый шоколад, посыпка кокос',
    price: 189
  },
  {
    id:'34',
    img:  '../../images/menu_donuts/choco.png',
    name: 'Брауни',
    description:'воздушное тесто, шоколадная начинка, шоколадная глазурь, посыпка конфети',
    price: 189
  },
  {
    id:'35',
    img:  '../../images/menu_donuts/strawberry.png',
    name: 'Малиновый',
    description:'воздушное тесто, малиновая начинка, малиновая глазурь, посыпка кокос',
    price: 189
  },
  {
    id:'36',
    img:  '../../images/menu_donuts/vanil.png',
    name: 'Жемчужный светлый',
    description:'воздушное тесто, шоколадная начинка, шоколадная глазурь, посыпка жемчужины',
    price: 189
  },
  {
    id:'37',
    img:  '../../images/menu_donuts/cho_sphere.png',
    name: 'Жемчужный темный',
    description:'воздушное тесто, шоколадная начинка, шоколадная глазурь, посыпка жемчужины',
    price: 189
  },
  {
    id:'38',
    img:  '../../images/menu_donuts/white.png',
    name: 'Конфети',
    description:'воздушное тесто, шоколадная начинка, глазурь белый шоколад, посыпка конфетти',
    price: 189
  },
]

// Общая корзина (используем localStorage для синхронизации между страницами)
let cartList = JSON.parse(localStorage.getItem("cartList")) || [];

// Счетчик количества товаров в корзине
let counter = cartList.reduce((sum, item) => sum + item.amount, 0);

// Функция для сохранения корзины в localStorage
function saveCart() {
  localStorage.setItem("cartList", JSON.stringify(cartList));
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

// Класс Card с обновленной логикой добавления в корзину
class Card {
  constructor(id, img, name, description, price) {
    this.id = id;
    this.img = img;
    this.name = name;
    this.description = description;
    this.price = price;
  }

  addToCard(id, name, price, img, amount = 1,description) {
    let itemInCart = false;

    // Проверяем, есть ли товар в корзине
    cartList.forEach((item) => {
      if (item.id === id) {
        item.price += price;
        item.amount++;
        itemInCart = true;
      }
    });

    // Если товара нет в корзине, добавляем его
    if (!itemInCart) {
      cartList.push({
        id,
        name,
        price,
        description,
        img, // Добавляем картинку товара
        amount,
      });
    }

    // Обновляем счетчик и сохраняем корзину
    counter = cartList.reduce((sum, item) => sum + item.amount, 0);
    console.log('counter', counter);
    localStorage.setItem('cartCount', counter.toString()); // Сохраняем счетчик
    saveCart();
    updateCartLabel();
  }

  render() {
    const mainWrapper = document.createElement('div');
    mainWrapper.classList.add('card');
    mainWrapper.setAttribute('data-url', 'card.html');

    const HTML = `                       
      <img class="card_img" src="${this.img}" alt="${this.name}">         
      <div class="card_info">             
        <h2 class="card_name">${this.name}</h2>             
        <p>${this.description}</p>               
      </div>         
      <div class="card_control"> 
        <span class="price-span">${this.price} ₽</span>             
        <button data-price="${this.price}" id="${this.id}" class="btn">
          <img class="cart-img" src="../../images/shoping_cart.svg">
        </button>                   
      </div> 
    `;
    mainWrapper.innerHTML = HTML;
    mainGrid.append(mainWrapper);

    const btn = mainWrapper.querySelector('.btn');

    // Добавляем товар в корзину
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.addToCard(this.id, this.name, this.price, this.img,this.amount,this.description); // Передаем картинку товара
    });

    // переход на страницу карточки товара
      mainWrapper.addEventListener('click', (e) => {
          console.log('redirection func')
          if (e.target.classList.contains('btn')) {
              e.stopPropagation(); // при нажатии на корзину останавливаем переход
              return;
          }
          const url = mainWrapper.getAttribute('data-url');
          if (url) {
              localStorage.setItem("selectProductId", this.id);
              window.location.href = url; // Redirect to the URL
          }
      });
  }
}

function renderCart() {
  const cartItemsList = cartPopup.querySelector('.cart-items'); // Контейнер для элементов корзины
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
      decrementBtn.addEventListener('click', () => changeAmount(item, -1)); // Функция изменения количества

      const amountInput = document.createElement('input');
      amountInput.value = item.amount;
      amountInput.disabled = true; // Невозможно редактировать вручную

      const incrementBtn = document.createElement('button');
      incrementBtn.textContent = '+';
      incrementBtn.addEventListener('click', () => changeAmount(item, 1)); // Функция изменения количества

      amountContainer.appendChild(decrementBtn);
      amountContainer.appendChild(amountInput);
      amountContainer.appendChild(incrementBtn);

      li.appendChild(itemDetails);
      li.appendChild(amountContainer);

      cartItemsList.appendChild(li);

      totalPrice += item.price; // считаем общую стоимость корзины
      console.log(totalPrice);
  });

  // Обновляем общую стоимость

  totalPriceElem.textContent = `${totalPrice} руб.`;
}

// Функция для изменения количества товара в корзине
function changeAmount(item, delta) {
  const cartItem = cartList.find((cartItem) => cartItem.id === item.id);
  if (cartItem) {
      const pricePerItem = cartItem.price/cartItem.amount;
      cartItem.amount += delta;
      if (delta>0) {
          cartItem.price += pricePerItem;
          counter++;
      }
      else {
          cartItem.price -= pricePerItem
          counter--;
      }
      if (cartItem.amount <= 0) {
          cartList = cartList.filter((cartItem) => cartItem.id !== item.id); // Удаляем товар, если его количество меньше или равно 0
        //  if (cartList.length===0) { localStorage.clear()}
      }

      saveCart(); // Сохраняем корзину в localStorage
      renderCart(); // Обновляем попап с корзиной
      localStorage.setItem('cartCount', counter.toString()); // Сохраняем счетчик
      updateCartLabel(); // Обновляем метку с количеством товаров в корзине
  }
}
// Показ корзины
function showCart() {
  cartPopup.classList.remove('hidden');
  cartPopup.style.display = 'block';
  renderCart(); // Рендерим корзину каждый раз, когда она открывается
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

// Предотвращаем закрытие при наведении на корзину, если она уже открыта
cartPopup.addEventListener('mouseover', (event) => {
  event.stopPropagation(); // предотвращаем скрытие корзины при наведении на нее
});

// Удаляем все карточки перед рендерингом новых
const removeAll = () => {
  while (mainGrid.children[0]) {
    mainGrid.replaceChildren();
  }
};

// Рендерим все карточки
const renderAll = (text, store) => {
  removeAll();
  const filteredStore = !text
    ? store
    : store.filter(
        (el) =>
          el.name.toLocaleLowerCase().includes(text) ||
          el.description.toLocaleLowerCase().includes(text)
      );
  filteredStore.forEach((el) => {
    new Card(el.id, el.img, el.name, el.description, el.price).render();
  });
};

// Загрузка страницы
document.addEventListener('DOMContentLoaded', () => {
  cartLabel.addEventListener('mouseover', showCart);
  cartLabel.addEventListener('click', (event) => {
    event.stopPropagation(); // предотвращаем распространение клика на документ
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

          
      } catch (error) {
          console.error('Ошибка при загрузке корзины из localStorage:', error);
          cartList = []; // Если произошла ошибка, инициализируем корзину как пустой массив
      }
  }
});

// Переход между разделами (наборы/пончики)
boxes.addEventListener('click', () => {
  const boxes_store = store.slice(0, 5);
  renderAll('', boxes_store);
  donuts.classList.remove('selected-menu');
  boxes.classList.add('selected-menu');
});

donuts.addEventListener('click', () => {
  const donuts_store = store.slice(5);
  renderAll('', donuts_store);
  boxes.classList.remove('selected-menu');
  donuts.classList.add('selected-menu');
});

// Поиск
let searchText = '';

searchField.addEventListener('input', (e) => {
  searchText = e.target.value;
});

btnSearch.addEventListener('click', () => {
  renderAll(searchText, store);
});

