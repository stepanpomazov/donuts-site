
// сохраняем данные с нажатой кнопки (начинка, глазурь)
export function setOption(buttons, button, option) {                
        buttons.forEach(b => b.classList.remove('selected'));            
        button.classList.add('selected');
            const data = button.dataset;
            option = {
                image: data.image,
                price: parseInt(data.price),
                calories: parseInt(data.calories),
                proteins: parseFloat(data.proteins),
                fats: parseFloat(data.fats),
                carbs: parseFloat(data.carbs)
            };
        return {...option}
}

// отображаем выбранную глазурь 
export function setGlaze(glaze) {
    let glazeLayer = document.getElementById('glaze-layer');
    if (!glazeLayer) {
        glazeLayer = document.createElement('img');
        glazeLayer.classList.add('image-layer');
        glazeLayer.id = 'glaze-layer';
        document.getElementById('donut-frame').appendChild(glazeLayer);
    }
    glazeLayer.src = `../../images/glaze/${glaze.image}`;
    glazeLayer.style.zIndex = 2; // Устанавливаем z-index для глазури
}
