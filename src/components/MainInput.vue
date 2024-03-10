<template>
  <input
    ref="input"
    class="main-input"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    type: {
      default: "text",
    },
    autoFocus: {
      default: false,
    },
    modelValue: String,
    placeholder: String,
  },

  mounted() {
    if (this.autoFocus) {
      this.$refs.input.focus();
    }
  },
};
</script>

<style lang="scss">
@import "../shared/variables.scss";

.main-input {
  box-shadow: $boxShadow;
  border: $border;
  background: map-get($colors, secondaryBackground);
  transition: 0.1s ease-in-out;
  outline: none;
  border-radius: $borderRadius;
  padding: 5px 10px;
  font-size: map-get($fontSizes, normal);
  margin: 5px 0;
}

.main-input:hover {
  box-shadow: -2px 2px 0 #000;
  transform: translate(-2px, 2px);
}

.main-input:active {
  box-shadow: none;
  transform: translate(-4px, 4px);
}
</style>
