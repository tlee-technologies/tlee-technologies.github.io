/*
  Name: Terrance Lee
  Date: 02-17-2025
  CSC 372-01

  This JavaScript file handles interactive elements for the Dine On Campus project.
  It manages dish selection on the main page and meal plan updates on the meal plan page.
*/

document.addEventListener("DOMContentLoaded", () => {
    const dishes = document.querySelectorAll(".dish");
    const dishDescription = document.getElementById("dish-description");
    const dishName = document.getElementById("dish-name");
    const dishPrice = document.getElementById("dish-price");

    // Dish Selection for Main Page
    if (dishes.length > 0) {
        dishes.forEach(dish => {
            dish.addEventListener("click", () => {
                dishes.forEach(d => d.classList.remove("selected"));
                dish.classList.add("selected");

                dishName.textContent = dish.dataset.name;
                dishPrice.textContent = `Price: ${dish.dataset.price}`;
                dishDescription.style.display = "block";
            });
        });
    }

    // Meal Plan Page - Dish Selection
    const dishOptions = document.getElementById("dish-options");
    const selectedDishes = document.getElementById("selected-dishes");
    const totalCostElement = document.getElementById("total-cost");

    if (dishOptions && selectedDishes && totalCostElement) {
        let totalCost = 0;

        // Updated dish options to match index.html
        const menuItems = [
            { name: "Eggplant Tofu", price: 8.70 },
            { name: "Sweetfire Chicken Breast", price: 8.70 },
            { name: "Honey Walnut Shrimp", price: 11.70 },
            { name: "String Bean Chicken Breast", price: 8.70 }
        ];

        // Populate the dish options list
        menuItems.forEach(item => {
            let li = document.createElement("li");
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            li.dataset.name = item.name;
            li.dataset.price = item.price;
            
            li.addEventListener("click", () => {
                addToMealPlan(item.name, item.price);
            });

            dishOptions.appendChild(li);
        });

        function addToMealPlan(name, price) {
            let selectedItem = document.createElement("li");
            selectedItem.textContent = `${name} - $${price.toFixed(2)}`;

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", () => {
                totalCost -= price;
                totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
                selectedDishes.removeChild(selectedItem);
            });

            selectedItem.appendChild(removeButton);
            selectedDishes.appendChild(selectedItem);

            totalCost += price;
            totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
        }
    }
});