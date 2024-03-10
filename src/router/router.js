import { createRouter, createWebHistory } from 'vue-router';
import SmartMatPlanerare from '../views/SmartMatPlanerare.vue';
import HomePage from '../views/HomePage.vue';
import UserPage from '../views/UserPage.vue';
import AboutUsPage from '../views/AboutUsPage.vue';
import RecipeDetail from '../components/RecipeDetail.vue';

const routes = [
  { path: '/', name:"HomePage", component: HomePage, alias: '/home' },
  { path: '/about', name:"AboutUsPage", component: AboutUsPage, alias: '/aboutus' },
  { path: '/smartmatplanerare', name:"SmartMatPlanerare", component:  SmartMatPlanerare },
  { path: '/userpage', name:"userpage", component:  UserPage },
  { path: '/recipe/:id', name:"recipe-detail", component: RecipeDetail, props:true },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;