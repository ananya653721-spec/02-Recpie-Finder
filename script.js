
let recipeInput = document.getElementById("recipeInput");
let searchBtn = document.getElementById("searchBtn");

let recipeContainer = document.getElementById("recipeContainer");

let recipeModal = document.getElementById("recipeModal");
let closeModal = document.getElementById("closeModal");

let modalImage = document.getElementById("modalImage");
let modalTitle = document.getElementById("modalTitle");
let modalCategory = document.getElementById("modalCategory");

let ingredientsList = document.getElementById("ingredientsList");
let instructions = document.getElementById("instructions");


// Search Button

searchBtn.addEventListener("click", function () {

    let recipeName = recipeInput.value.trim();

    if (recipeName === "") {
        alert("Please enter a recipe name");
        return;
    }

    recipeContainer.innerHTML = "<p>Searching recipes...</p>";


    // API Request
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`)

        .then(function (response) { //promise

            return response.json(); //response object

        })
//actual data
        .then(function (data) {

            recipeContainer.innerHTML = "";

            if (data.meals === null) {

                recipeContainer.innerHTML =
                    "<p>No recipes found.</p>";

                return;
            }


            // Every recipe

            data.meals.forEach(function (meal) {

                let card = document.createElement("div");

                card.classList.add("recipe-card");


                card.innerHTML = `
                    
                    <img 
                        src="${meal.strMealThumb}" 
                        alt="${meal.strMeal}"
                    >

                    <div class="recipe-card-content">

                        <h3>${meal.strMeal}</h3>

                        <p>${meal.strCategory}</p>

                        <button class="view-btn">
                            View Recipe
                        </button>

                    </div>
                `;


                recipeContainer.append(card);


                // View Recipe Button

                let viewBtn =
                    card.querySelector(".view-btn");


                viewBtn.addEventListener("click", function () {

                    showRecipe(meal);

                });

            });

        })

        .catch(function (error) {

            console.log("Error:", error);

            recipeContainer.innerHTML =
                "<p>Something went wrong. Try again.</p>";

        });

;


// Show Recipe Details

function showRecipe(meal) {

    modalImage.src = meal.strMealThumb;

    modalTitle.textContent = meal.strMeal;

    modalCategory.textContent =
        "Category: " + meal.strCategory;


    // Clear old ingredients

    ingredientsList.innerHTML = "";


    // Ingredients

    for (let i = 1; i <= 20; i++) {

        let ingredient =
            meal["strIngredient" + i];

        let measure =
            meal["strMeasure" + i];


        if (
            ingredient !== null &&
            ingredient !== ""
        ) {

            let li = document.createElement("li");

            li.textContent =
                measure + " " + ingredient;

            ingredientsList.append(li);

        }

    }


    // Instructions

    instructions.textContent =
        meal.strInstructions;


    // Open modal

    recipeModal.style.display = "flex";

}


// Close Modal

closeModal.addEventListener("click", function () {

    recipeModal.style.display = "none";

});

});
