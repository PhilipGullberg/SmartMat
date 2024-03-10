<template>
    <div>
        <div class="card-header">
            <h2>{{ mealPlan.name }}</h2>
        </div>
        <div class="card-body">
            <h3>Recipes:</h3>
            <RecipeList :recipes="mealPlan.recipes" />
        </div>
    </div>
</template>

<script>
import RecipeList from '../components/RecipeList.vue';

export default {
    props: ['mealPlan'],
    components: {
        RecipeList,
    },
};
</script>
