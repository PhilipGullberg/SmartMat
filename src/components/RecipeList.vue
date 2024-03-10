<template>
    <div>
        <ul>
            <li v-for="recipe in recipes" :key="recipe.id">
                
                <router-link :to="{ name: 'recipe-detail', params: { id: recipe.id} ,props: { recipe: recipe } }">
                    {{ recipe.title.replace(':', '')  }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['recipes'],
    
}
</script>