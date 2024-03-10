<template>
  <div class="center">
    <h1>User page</h1>
    <h2>Välj att visa dina matplaneringar eller recept</h2>
  <div class="buttons">
   <button @click="viewAllRecipes = false">Se dina matplaneringar</button>
      <button @click="viewAllRecipes = true">Se alla recept</button>
      </div>
      <div class="buttons">
      <input type="text" v-model="searchTerm" placeholder="Sök...">
      </div>
      <!-- Dynamisk rubrik baserad på vilken vy som visas -->
      
  </div>
  <hr>
  <div class="center">
  <h2 v-if="!viewAllRecipes">Här är dina matplaneringar</h2>
  <h2 v-else>Här är alla recept</h2>
  </div>
  <div class="card-container" v-if="!viewAllRecipes">
    <div v-for="mealPlan in filteredItems()" :key="mealPlan.id" class="card">
      <MealPlanCard :mealPlan="mealPlan" />
      <button class="generateButton" @click="showModal(mealPlan)">
          Exportera alla ingredienser <Icon icon="carbon:document-download" />
        </button>
      <!-- Knappar och annat innehåll för matplaneringar -->
    </div>
  </div>
  <div class="card-container" v-else>
    <div v-for="recipe in filteredItems()" :key="recipe.id" class="card">
      <h3>{{ recipe.title.replace(":","") }}</h3>
      
      <a  :href="`/recipe/${recipe.id}`"><button class="generateButton"> Visa recept</button></a>
    </div>
  </div>
  <div v-if="isModalVisible">
    <div class="modal">
      <div class="modal-content">
        <h2>Exportera ingredienser</h2>
        <form @submit.prevent="exportIngredientModal">
          <p>
            Klicka nedan för att exportera alla ingredienser för
            {{ selectedMealPlan.name }}
          </p>
          <!-- Lägg till formulärfält för att ange recept -->
          <button class="copyButton" @click="copyIngredients(selectedMealPlan)">
            Kopiera alla ingredienser
          </button>
          <button
            class="icaButton"
            type="submit"
            @click="exportIngredientModal(selectedMealPlan)"
          >
            Exportera till Mathem
          </button>
          <br />
          <button @click="closeModal">Stäng</button>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.buttons{
  display:flex;
}
.center {
  display: Flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

button {
  background-color: #4CAF50; /* Grön bakgrund */
  color: white;
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  ;
  transition: background-color 0.3s ease;
}
button a{
  text-decoration: none;
  color:white;
}

button:hover {
  background-color: #45a049; /* Mörkare grön färg vid hover */
}

input[type="text"] {
  padding: 10px;
  margin: 5px 0; /* Lite marginal ovanför och under sökfältet */
  box-sizing: border-box; /* Säkerställer att padding inte lägger till bredden */
  border: 2px solid #ccc; /* Grå kant */
  border-radius: 4px; /* Rundade hörn */
  width:20rem;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-right: 5%;
  margin-left: 5%;
  justify-content: center;
  margin-bottom:5rem;
  margin-top:2rem;
}
.card {
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
  width:350px;
  border: 1px solid #1cb732c9;
}
.copyButton {
  background-color: #1cb732c9;
  padding: 10px;
  color: white;
  margin: 2px;
  border-radius: 8px;
}
.copyButton:hover {
  background-color: #58d36ac9;
  padding: 10px;
  margin: 2px;
  box-shadow: 1px 1px 3px black;
  border-radius: 8px;
}

.card h3 {
  color: #1cb732c9;
}
.icaButton {
  background-color: #26263a;
  color: #fffcfd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 1px 1px 2px rgb(63, 63, 63);
  cursor: pointer;
}
.icaButton:hover {
  background-color: #313145;

  box-shadow: 1px 2px 4px black;
}
</style>

<script>
import MealPlanCard from "../components/MealPlanCard.vue";
export default {
  data() {
    return {
      selectedMealPlan: null,
      isModalVisible: false,
      viewAllRecipes: false,
      copied_text: "",
      showAll: false, // Styr om alla recept eller matplaneringar ska visas
      searchTerm: '', // Söktermen som används för filtrering
      mealplans: [],
      recipes: [],
    };
  },

  components: {
    MealPlanCard
  },
  methods: {
    copyIngredients(selectedMealPlan) {
      for (let i = 0; i < selectedMealPlan.recipes.length; i++) {
        this.copied_text += selectedMealPlan.recipes[i].ingredients;
      }

      navigator.clipboard.writeText(this.copied_text);
      console.log(this.copied_text);
      alert("Kopierat alla ingredienser");
    },
    exportIngredientModal(selectedMealPlan) {
      fetch("http://127.0.0.1:8000/api/export_ingredients/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(selectedMealPlan),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    closeModal() {
      this.selectedMealPlan = null;
      this.isModalVisible = false;
    },
    showModal(mealPlan) {
      this.selectedMealPlan = mealPlan;
      this.isModalVisible = true;
    },
    get_recipes() {
      fetch("http://127.0.0.1:8000/api/get_mealplans/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(localStorage.getItem("user")),
      })
        .then((response) => response.json())
        .then((data) => {
          this.mealplans = data;
          console.log(data.length);
          for(let i=0; i<data.length;i++){
              this.recipes = data[i].recipes;
          }
          
          
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    filteredItems() {
      return this.viewAllRecipes ? this.filterRecipes() : this.filterMealPlans();
    },
    filterRecipes() {

      // Filtrerar recept baserat på searchTerm
   
      return this.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    filterMealPlans() {
      // Filtrerar matplaneringar baserat på searchTerm
      return this.mealplans.filter((mealPlan) =>
        mealPlan.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  mounted() {
    this.get_recipes();
  },
};
</script>
