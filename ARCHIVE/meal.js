// meal.js
document.getElementById("fetch-menu").addEventListener("click", async () => {
    try {
      const res = await fetch("http://localhost:3000/api/meals");
      const data = await res.json();
  
      const display = document.getElementById("menu-display");
      display.innerHTML = ""; // Clear old content
  
      for (let mealTime of ["breakfast", "lunch", "dinner"]) {
        const meal = data[mealTime];
        const section = document.createElement("section");
  
        const title = document.createElement("h2");
        title.textContent = `${meal.name} (${mealTime.charAt(0).toUpperCase() + mealTime.slice(1)})`;
        section.appendChild(title);
  
        const desc = document.createElement("p");
        desc.textContent = meal.description;
        section.appendChild(desc);
  
        const label = document.createElement("p");
        label.textContent = "Food Groups:";
        section.appendChild(label);
  
        const list = document.createElement("ul");
        for (let group of meal["food-groups"]) {
          const li = document.createElement("li");
          li.textContent = group;
          list.appendChild(li);
        }
        section.appendChild(list);
  
        display.appendChild(section);
      }
    } catch (err) {
      console.error("Failed to fetch meal plan:", err);
    }
  });