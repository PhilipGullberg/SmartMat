<template>
  <div class="card-wrapper">
    <slot />
  </div>
</template>

<style lang="scss">
@import "../shared/variables.scss";

.card-wrapper {
  border-radius: $borderRadius;
  box-shadow: $boxShadow;
  border: $border;
  padding: 20px 15px;
  background: map-get($colors, background);
  width: fit-content;
}
</style>
