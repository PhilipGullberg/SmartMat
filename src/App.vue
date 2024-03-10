<template>
  <HomeNavbar />
  <Transition name="scale">
    <LoginWrapper class="login-wrapper" v-if="loginOpen.status" />
  </Transition>
  <router-view  />

  <!--<button @click="fetchData">Fetch Data</button>
        <div>{{ responseData }}</div>-->
</template>

<script setup>
import HomeNavbar from "./components/HomeNavbar.vue";
import LoginWrapper from "./components/LoginWrapper.vue";
import { loginOpen } from "./shared/store";


</script>

<style lang="scss">
@import "./shared/variables.scss";

body {
  font-family: "Varela Round";
  background: map-get($colors, background);
  background-size: 100%;
  color: map-get($colors, text);
}

.login-wrapper {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1;
}

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.5s ease-in-out;
  transform-origin: top right;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0);
}
</style>
