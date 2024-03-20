<template>
  <div class="background">
    <div>
      <h1>SmartMatPlanerare - SMP</h1>
    </div>
    <div class="form" v-if="!recipesloaded">
      <div class="register-stepper">
        <div
          class="step"
          :class="{
            'step-active': currentStep === 1,
            'step-done': currentStep > 1,
          }"
        >
          <span class="step-number">1</span>
        </div>
        <div
          class="step"
          :class="{
            'step-active': currentStep === 2,
            'step-done': currentStep > 2,
          }"
        >
          <span class="step-number">2</span>
        </div>
        <div
          class="step"
          :class="{
            'step-active': currentStep === 3,
            'step-done': currentStep > 3,
          }"
        >
          <span class="step-number">3</span>
        </div>
      </div>

      <div v-if="currentStep === 1">
        <!-- Steg 1: Välj Snabbväg eller Välj Mer detaljer -->
        <h2>Välj Snabbväg eller Välj Mer detaljer</h2>
        <button class="quickButton" @click="selectQuickPath">Snabbväg</button>
        <button class="detailButton" @click="selectDetailedPath">
          Mer detaljer
        </button>
      </div>

      <div v-else-if="currentStep === 2 && selectedPath === 'quick'">
        <!-- Steg 2 för Snabbväg: Välj antal dagar, för hur många personer, snabba preferenser -->
        <h2>
          Välj antal dagar, antal personer per måltid, samt snabba preferenser
        </h2>
        <!-- Antal dagar -->
        <label for="numberOfDays">Antal dagar:</label>
        <input
          v-model="formData.numberOfDays"
          type="number"
          id="numberOfDays"
          min="1"
          max="14"
        />

        <!-- Antal personer per recept -->
        <label for="numberOfPeople">Portioner:</label>
        <input
          v-model="formData.numberOfPeople"
          type="number"
          id="numberOfPeople"
          min="1"
          max="10"
        />

        <!-- Checkbox för snabba preferenser -->
        <div class="checkboxes">
          <label>
            <input type="checkbox" v-model="formData.preferences.vegetarian" />
            <div>Vegetarian</div>
          </label>
          <label>
            <input type="checkbox" v-model="formData.preferences.vegan" />
            <div>Vegan</div>
          </label>
          <label>
            <input type="checkbox" v-model="formData.preferences.klimatsmart" />
            <div>Klimatsmart</div>
          </label>
          <!-- Lägg till liknande rader för andra preferenser -->
        </div>
        <br />

        <!-- Dina Snabbväg formulärfält och knappar -->
        <div class="stepIcons">
          <Icon icon="carbon:previous-filled" width="36" @click="backStep" />
          <div class="text-flex">
            <p>Nästa</p>
            <Icon
              icon="carbon:next-filled"
              width="36"
              @click="moveToNextStep"
            />
          </div>
        </div>
      </div>

      <div v-else-if="currentStep === 2 && selectedPath === 'detailed'">
        <!-- Steg 2 för Mer detaljerad väg: Antal dagar, antal måltider, ingredienser -->
        <h2>Antal dagar, antal måltider, ingredienser</h2>

        <!-- Antal dagar -->
        <label for="numberOfDays">Antal dagar:</label>
        <input
          v-model="formData.numberOfDays"
          type="number"
          id="numberOfDays"
          min="1"
          max="14"
        />

        <!-- Antal måltider -->
        <label for="numberOfPeople">Portioner:</label>
        <input
          v-model="formData.numberOfPeople"
          type="number"
          id="numberOfPeople"
          min="1"
          max="10"
        />

        <!-- Checkbox för långsamma preferenser -->
        <div>
          <div class="checkboxes">
            <label>
              <input
                type="checkbox"
                v-model="formData.preferences.vegetarian"
              />
              <div>Vegetarian</div>
            </label>
            <label>
              <input type="checkbox" v-model="formData.preferences.vegan" />
              <div>Vegan</div>
            </label>
            <label>
              <input
                type="checkbox"
                v-model="formData.preferences.klimatsmart"
              />
              <div>Klimatsmart</div>
            </label>
            <!-- Lägg till liknande rader för andra preferenser -->
          </div>
        </div>
        <h3>Välj dina speciella preferenser, skriv ett ord sen "enter"</h3>
        <div>
          <button
            @click="changeCategory('allergies')"
            :class="{
              'category-button': true,
              'active-category': activeCategory === 'allergies',
            }"
          >
            Allergier
          </button>
          <button
            @click="changeCategory('ingredientsAtHome')"
            :class="{
              'category-button': true,
              'active-category': activeCategory === 'ingredientsAtHome',
            }"
          >
            Ingredienser hemma
          </button>
          <button
            @click="changeCategory('worldCuisinePreferences')"
            :class="{
              'category-button': true,
              'active-category': activeCategory === 'worldCuisinePreferences',
            }"
          >
            Världens kök
          </button>
        </div>
        <div>
          <input
            type="text"
            v-model="newPill"
            @keyup.enter="addPill(activeCategory)"
            placeholder="Skriv dina preferenser här"
          />
        </div>
        <br />
        <div>
          <div
            v-for="(category, categoryName) in formData.userPreferences"
            :key="categoryName"
          >
            <div class="pill" v-for="(pill, index) in category" :key="index">
              {{ pill }}
              <span
                class="delete-button"
                @click="removePill(categoryName, index)"
                >x</span
              >
            </div>
          </div>
        </div>
        <div class="stepIcons">
          <Icon icon="carbon:previous-filled" width="36" @click="backStep" />
          <div class="text-flex">
            <p>Nästa</p>
            <Icon
              icon="carbon:next-filled"
              width="36"
              @click="moveToNextStep"
            />
          </div>
        </div>
      </div>

      <div v-else-if="currentStep === 3">
        <!-- Steg 3: Generera Matrecept -->
        <h2>Generera Matrecept</h2>
        <!-- Ditt formulär för att generera recept -->
        <div>
          <button class="generateButton" @click="fetchData">
            Generera recept
          </button>
        </div>

        <Icon icon="carbon:previous-filled" width="36" @click="backStep" />
      </div>
    </div>
  </div>

  <div v-if="recipesloaded" class="info-row">
    <h3>
      Här är dina recept, här kan du välja att spara allt till din profil, eller
      exportera alla ingredienser till en inköpslista!
    </h3>
    <div v-if="!loading" class="button-container">
      <button class="generateButton" @click="showModal">
        Spara alla recept <Icon icon="carbon:user-avatar-filled" />
      </button>
      <button class="generateButton">
        Exportera alla ingredienser <Icon icon="carbon:document-download" />
      </button>
    </div>
    <!--Modal för att spara alla recept, med ett namn-->
    <div v-if="isModalVisible">
      <div class="modal">
        <div class="modal-content">
          <h2>Spara recept</h2>
          <form @submit.prevent="saveRecipes">
            <input
              v-model="mealPlanName"
              type="text"
              placeholder="Namn på måltidsplanen"
            />
            <br />
            <!-- Lägg till formulärfält för att ange recept -->
            <button type="submit" @click="saveRecipes(mealPlanName)">
              Spara
            </button>
            <button @click="closeModal">Stäng</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="loader" v-if="loading">
    <h4>Loading...</h4>
  </div>
  <div class="card-container">
    <!--Show all recipes in cards, give possibility to save the recipes to your own recipe page, or take all recipes ingredients and send to ICA or other food delivery-->
    <div v-for="(recipe, index) in recipes" :key="index" class="card">
      <h3>{{ recipe.title.replace(":", "") }}</h3>
      <div>
        <h4>Ingredienser:</h4>
        <ul>
          <li
            v-for="(ingredient, i) in recipe.ingredients
              .split('-')
              .map((item) => item.trim().replace(':', '').replace(/\s+/g, ' '))
              .filter((item) => item !== '')"
            :key="i"
          >
            {{ ingredient }}
          </li>
        </ul>
      </div>
      <div>
        <h4>Instruktioner:</h4>
        <ol>
          <li
            v-for="(step, i) in recipe.instructions
              .split(/\d+\./)
              .filter(Boolean)
              .filter((item) => item !== ':')
              .filter((item) => item !== '')
              .slice(1)"
            :key="i"
          >
            {{ step.trim().replace(":", "") }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon } from "@iconify/vue";
export default {
  components: { Icon },
  data() {
    return {
      clicked: false,
      isModalVisible: false,
      recipesloaded: false,
      mealPlanName: "",
      loading: false,
      activeCategory: "allergies",
      recipes: [],
      currentStep: 1,
      newPill: "",
      selectedPath: null,
      formData: {
        numberOfDays: 1,
        numberOfPeople: 1,
        preferences: {
          vegetarian: false,
          vegan: false,
          klimatsmart: false,
          meat: false,
          lactoseFree: false,
        },
        userPreferences: {
          allergies: [],
          ingredientsAtHome: [],
          worldCuisinePreferences: [],
        },
      },
    };
  },
  methods: {
    addToHeart() {
      //Skicka till Django och spara i user profile favoriter
      if (this.clicked == true) {
        this.clicked = false;
      } else {
        this.clicked = true;
      }
    },
    addPill(category) {
      if (this.newPill.trim() !== "") {
        this.formData.userPreferences[category].push(this.newPill);
        this.newPill = "";
      }
    },
    removePill(category, index) {
      this.formData.userPreferences[category].splice(index, 1);
    },
    changeCategory(category) {
      this.activeCategory = category;
    },
    selectQuickPath() {
      this.selectedPath = "quick";
      this.moveToNextStep();
    },
    selectDetailedPath() {
      this.selectedPath = "detailed";
      this.moveToNextStep();
    },
    moveToNextStep() {
      this.currentStep++;
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    backStep() {
      this.currentStep--;
    },
    saveRecipes(mealPlanName) {
      const requestData = {
        mealPlanName: mealPlanName,
        recipes: this.recipes,
        user: localStorage.getItem("user"),
      };
      console.log(this.recipes);
      this.isModalVisible = false;
      fetch("https://jellyfish-app-42zln.ondigitalocean.app/api/savemealplan/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(requestData),
      });
    },

    async fetchData() {
      this.recipesloaded = true;
      console.log(JSON.stringify(this.formData));
      this.loading = true;
      console.log(this.loading);
      await fetch("https://jellyfish-app-42zln.ondigitalocean.app/api/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formData),
      })
        .then((response) => response.json())
        .then((data) => {
          this.recipes = data.recipes;
          console.log(this.recipes);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: start;
  min-height: 300px;
  margin-bottom: 3rem;
  height: 50%;
  width: 500px;
  padding: 30px 50px 40px;
  box-shadow: 1px 4px 10px 1px #aaa;
  background: white;
  padding: 20px;
}
.modal-content form input[type="text"] {
  display: block;
  height: 20px;
  font-size: 14px;
  padding: 6px 12px;
  width: 60%;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  border: none;
  background-color: #f3f3f3;
}
.text-flex {
  display: flex;
  align-items: center;
}
.register-stepper {
  display: flex;
  z-index: 2;
  justify-content: space-around;
  width: 100%;
  position: relative;
}
.register-stepper::before {
  z-index: 0;
  content: "";
  display: block;
  position: absolute;
  height: 2px;
  top: calc(50% - 1px);
  background: #cecece;
  width: calc(100% - 200px);
}
.step {
  display: flex;
  z-index: 2;
  background-color: white;
  justify-content: center;
  align-items: center;
  border: 1px solid #1cb732;
  border-radius: 50%;
  padding: 5px;
  height: 25px;
  width: 25px;
  font-size: 16px;
}

.step-active {
  background: linear-gradient(to right, #6fc672, #51d558);
}

* {
  font-family: Helvetica;
}
.info-row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.info-row h3 {
  width: 40%;
}
.button-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  align-items: center;
}
.loader {
  display: flex;
  justify-content: center;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-right: 5%;
  margin-left: 5%;
  justify-content: space-around;
}
.card {
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
  max-width: 45%;
  border: 1px solid #1cb732c9;
}

.card h3 {
  color: #1cb732c9;
}
.stepIcons {
  display: flex;
  justify-content: space-between;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes TransitioningBackground {
  0% {
    background-position: 1% 0%;
  }
  50% {
    background-position: 99% 100%;
  }
  100% {
    background-position: 1% 0%;
  }
}
.category-button {
  border: 1px solid #61d371c9;
  color: black;
  background-color: white;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.active-category {
  background-color: #61d371c9;
}

.generateButton {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 2rem;
  text-align: center;
  width: 200px;
  height: 60px;
  border-radius: 5px;
  box-shadow: 1px 4px 10px 1px #adacac;
  position: relative;
  overflow: hidden;

  background: linear-gradient(270deg, #61d371c9, #23d140c7);
  background-size: 400% 400%;
  animation: TransitioningBackground 10s ease infinite;

  transition: 0.6s;
}
.pill {
  display: inline-block;
  background-color: #32cc4cc7;
  color: #000000;
  padding: 5px 10px;
  border-radius: 20px;
  margin: 5px;
}

.delete-button {
  cursor: pointer;
  color: rgb(0, 0, 0);
}
.generateButton::before {
  content: "";
  display: block;
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
  width: 60px;
  height: 100%;
  top: 0;
  filter: blur(30px);
  transform: translateX(-100px) skewX(-15deg);
}

.generateButton::after {
  content: "";
  display: block;
  position: absolute;
  background: rgba(255, 255, 255, 0.2);
  width: 30px;
  height: 100%;
  top: 0;
  filter: blur(5px);
  transform: translateX(-100px) skewX(-15deg);
}

.generateButton:hover {
  background: linear-gradient(to left, #44d157, #13c731);
  box-shadow: 1px 4px 10px 1px #525252;
  cursor: pointer;
}
.generateButton:hover::before,
.generateButton:hover::after {
  transform: translateX(300px) skewX(-15deg);
  transition: 0.7s;
}
.quickButton,
.detailButton {
  display: inline-block;
  padding: 15px 25px;
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  box-shadow: 1px 4px 10px 1px #aaa;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  animation: TransitioningBackground 10s ease infinite;
  transition: 0.6s;
}

.quickButton {
  color: #fff;
  background: linear-gradient(to right, #3498db, #2980b9); /* Blue gradient */
  border: 2px solid #2980b9;
}

.quickButton:hover {
  box-shadow: 1px 4px 10px 1px #525252;
}

.detailButton {
  color: #fff;
  background: linear-gradient(to right, #4caf50, #45a049); /* Green gradient */
  border: 2px solid #45a049;
  margin-left: 10px; /* Add some spacing between the buttons */
}

.detailButton:hover {
  box-shadow: 1px 4px 10px 1px #484848;
}

.background {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: start;

  min-height: 300px;
  margin-bottom: 3rem;
  height: 100%;
  width: 500px;
  padding: 30px 50px 40px;
  box-shadow: 1px 4px 10px 1px #aaa;
}

.form input[type="text"],
input[type="number"] {
  display: block;
  height: 20px;
  font-size: 14px;
  padding: 6px 12px;
  width: 60%;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  border: none;
  background-color: #f3f3f3;
}
.checkboxes {
  height: 50px;
}
label {
  font-size: 16px;
  margin-bottom: 0.3rem;
}
.checkboxes label {
  position: relative;
  width: 8rem;
  height: 30px;
  font-size: 14px;
  border-radius: 8px;
  margin: 5px;
  float: left;
  border: 2px solid #0bc00e;
  box-sizing: border-box;
}
.checkboxes input[type="checkbox"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 30px;
  opacity: 0;
  cursor: pointer;
}

.checkboxes div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 25px;
  transition: 0.5s ease;
}
.checkboxes input[type="checkbox"]:checked ~ div {
  background-color: #0bc00e;
  border-radius: 6px;
}
</style>
