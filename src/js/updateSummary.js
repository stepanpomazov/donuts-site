    let basePrice = 120; // Базовая цена
    let baseCalories = 210; // Калории для основы
    let baseProteins = 3;
    let baseFats = 8;
    let baseCarbs = 30;

// Обновляем итоговую информацию о пончике
 export function updateSummary(filling, glaze, toppings) {
    let totalPrice = basePrice + filling.price + (glaze ? glaze.price : 0) + toppings.reduce((acc, topping) => acc + topping.price, 0);
    let totalCalories = baseCalories + filling.calories + (glaze ? glaze.calories : 0) + toppings.reduce((acc, topping) => acc + topping.calories, 0);
    let totalProteins = baseProteins + filling.proteins + (glaze ? glaze.proteins : 0) + toppings.reduce((acc, topping) => acc + topping.proteins, 0);
    let totalFats = baseFats + filling.fats + (glaze ? glaze.fats : 0) + toppings.reduce((acc, topping) => acc + topping.fats, 0);
    let totalCarbs = baseCarbs + filling.carbs + (glaze ? glaze.carbs : 0) + toppings.reduce((acc, topping) => acc + topping.carbs, 0);

    // Обновляем значения на странице
    document.getElementById('calories').textContent = totalCalories;
    document.getElementById('proteins').textContent = totalProteins;
    document.getElementById('fats').textContent = totalFats;
    document.getElementById('carbs').textContent = totalCarbs;

    // Обновляем итоговую стоимость
    document.getElementById('total-price').textContent = `${totalPrice} ₽`;
}
