<template>
  <button class="main-btn"><slot /></button>
</template>

<style lang="scss">
@import "../shared/variables.scss";

.main-btn {
  box-shadow: $boxShadow;
  border: $border;
  padding: 5px 17.5px;
  background: map-get($colors, secondaryBackground);
  transition: 0.1s ease-in-out;
  cursor: pointer;
  border-radius: $borderRadius;
  font-size: map-get($fontSizes, $key: normal);
  margin: 5px 0;
}

.main-btn:hover {
  box-shadow: -2px 2px 0 #000;
  transform: translate(-2px, 2px);
}

.main-btn:active {
  box-shadow: none;
  transform: translate(-4px, 4px);
}
</style>
