
export function toppingHandler(button, glaze, toppings, toppingZIndex) {
    
    // Проверка, выбрана ли глазурь перед выбором топпинга
    if (!glaze) {
        alert('Выберите глазурь, чтобы добавить топпинги!');
        button.checked = false; // убираем галочку из чекбокса
        return toppings; // Прекращаем выполнение, если глазурь не выбрана
    }

    const data = button.dataset;
    const topping = {
        image: data.image,
        price: parseInt(data.price),
        calories: parseInt(data.calories),
        proteins: parseFloat(data.proteins),
        fats: parseFloat(data.fats),
        carbs: parseFloat(data.carbs)
    };

    // Проверка, не был ли уже выбран этот топпинг
    const index = toppings.findIndex(t => t.image === topping.image);
    if (index === -1) {
        toppings.push(topping);
        

        // Создаем элемент изображения для топпинга
        const toppingLayer = document.createElement('img');
        toppingLayer.classList.add('image-layer');
        toppingLayer.src = `../../images/topping/${topping.image}`;
        toppingLayer.style.zIndex = toppingZIndex; // Устанавливаем уникальный z-index
        toppingLayer.alt = topping.image;
        toppingLayer.id = `topping-layer-${topping.image}`;

        // Добавляем изображение на пончик
        document.getElementById('donut-frame').appendChild(toppingLayer);

        // Увеличиваем z-index для следующего топпинга
        toppingZIndex++;
    } 
    else {

        // Удаляем топпинг, если он уже был выбран
        toppings.splice(index, 1);

        // Удаляем изображение с пончика
        const toppingLayer = document.getElementById(`topping-layer-${topping.image}`);
        if (toppingLayer) {
            toppingLayer.remove();
        }
    }
    return { toppings, toppingZIndex } 
}        