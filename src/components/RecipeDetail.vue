<template>
  <div>
     <div v-if="loaded" class="recipe-container">
            <h1>{{ recipe.title.replace(':', '')  }}</h1>
            <div class="recipe-details">
              <div class="ingredients">
                <h2>Ingredienser</h2>
                <ul>
                  <li v-for="ingredient in this.recipe.ingredients.split('\n').filter((item, index) => index !== 0 && item !== '').map(item => item.trim().slice(2))" :key="ingredient">
                    {{ ingredient }}
                  </li>
                </ul>
              </div>
              <div class="instructions">
                <h2>Instruktioner</h2>
                <ol>
                  <li v-for="step in this.recipe.instructions.split('\n').filter((item, index) => index !== 0 && item !== '').map(item => item.trim().slice(2))" :key="step">
                    {{ step }}
                  </li>
                </ol>
              </div>
            </div>
            <button class="generateButton" @click="save_recipe">
                Spara receptet <Icon icon="carbon:user-avatar-filled" />
              </button>
          </div>
          


  </div>
</template>

<script>
export default {
  props: ['id'],
  data(){
    return{
        loaded:false,
        recipe:[],
    }
  },
  methods:{
    get_recipe(id) {
         fetch("http://127.0.0.1:8000/api/get_recipe/", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',

                },

                body: JSON.stringify(id),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.recipe=data;
                this.loaded=true;
                
            })
            

    },
    save_recipe(id){
        //skicka med till user också
        fetch("http://127.0.0.1:8000/api/save_recipe/", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',

                },

                body: JSON.stringify(id),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);


                })
    }

  },
  mounted() {
        this.get_recipe(this.id);
    },
}
</script>

<style>
.recipe-container {
  background-color: aliceblue;
  padding:5%;
  border-radius:10px;
  max-width: 600px;
  margin: 0 auto;
}

.recipe-details {
  display: flex;
}

.ingredients,
.instructions {
  flex: 1;
  margin: 0 20px;
}

ul,
ol {
  padding: 0;
  
}

li {
  margin-bottom: 10px;
}
</style>