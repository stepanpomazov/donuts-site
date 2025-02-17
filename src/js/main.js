import { updateSummary } from './updateSummary.js';
import { setOption, setGlaze} from './fillingHandler.js';
import { toppingHandler } from './toppingHandler.js'; 

document.addEventListener('DOMContentLoaded', () => {
  
   // Начальная начинка (по умолчанию шоколадная)
    let filling = {
        image: "choco.png",
        price: 45,
        calories: 80,
        proteins: 1,
        fats: 5,
        carbs: 9,
    };
    
    let glaze = null; // Начальная глазурь
   
    let toppings = []; // Массив для топпингов
    
    let toppingZIndex = 3; // Начальный z-index для топпингов
   
    // По умолчанию выбираем шоколадную начинку
    document.querySelector('.option.selected').click();

    // Выбор начинки
    const fillingButtons = document.querySelectorAll('.option[data-type="filling"]');
    fillingButtons.forEach(button => {
        button.addEventListener('click', () => { 
            filling = setOption(fillingButtons, button, filling);
            document.getElementById('filling-layer').src = `../../images/filling/${filling.image}`;
            
            // Обновляем итоговую информацию о КБЖУ и стоимости
            updateSummary(filling, glaze, toppings);  
        });       
    });
    
    // Выбор глазури
    const glazeButtons = document.querySelectorAll('.option[data-type="glaze"]');
    glazeButtons.forEach(button => {
        button.addEventListener('click', () => {
            glaze = setOption(glazeButtons, button, glaze);

            // Добавляем глазурь только если она выбрана
            setGlaze(glaze); 

            // Обновляем итоговую информацию о КБЖУ и стоимости
            updateSummary(filling, glaze, toppings); 
        });    
    });
    
    // Выбор топпинга
    const toppingButtons = document.querySelectorAll('.optiontop[data-type="topping"]');
    toppingButtons.forEach(button => {
        button.addEventListener('click', () => {
            const result  = toppingHandler(button, glaze, toppings, toppingZIndex); 
            if (result.length!=0) {
                toppings = result.toppings;
                toppingZIndex = result.toppingZIndex; 
            }
            // Обновляем итоговую информацию о КБЖУ и стоимости
            updateSummary(filling, glaze, toppings);  
        });
    });
});




