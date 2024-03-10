<template>
  <router-link class="link-container" :to="to"> <slot /> </router-link>
</template>

<script>
export default {
  props: {
    to: String,
  },
};
</script>

<style lang="scss">
@import "../shared/variables.scss";

.link-container {
  position: relative;
  text-decoration: none;
  font-size: 25px;
  border-radius: 40px;
  box-shadow: -4px 4px 0 #000;
  border: 1px solid black;
  color: #000;
  font-weight: 700;
  padding: 5px 17.5px;
  transition: 0.1s ease-in-out;
  background: map-get($colors, secondaryBackground);
}

.link-container:hover {
  box-shadow: -2px 2px 0 #000;
  transform: translate(-2px, 2px);
}

.link-container:active {
  box-shadow: none;
  transform: translate(-4px, 4px);
}
</style>
