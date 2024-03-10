<template>
  <Transition name="pop" appear>
    <div class="info-container">
      <div class="half info-texts">
        <div
          v-for="(text, index) in info"
          :key="text"
          name="fade"
          appear
          class="info-text"
          :style="`opacity: ${showInfo === index ? 1 : 0.25}`"
        >
          {{ text }}
        </div>

        <RouterLink to="/smartmatplanerare"> Prova nu! </RouterLink>
      </div>

      <div class="half pictures">
        <Transition
          v-for="(img, index) in images"
          :key="img"
          name="fade"
          appear
        >
          <img
            v-if="showInfo === index"
            class="picture"
            :key="img"
            v-bind:src="require(`../assets/${img}`)"
            :class="'robot-' + (index + 1)"
          />
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<script>
import RouterLink from "../components/RouterLink.vue";

export default {
  components: { RouterLink },
  data() {
    return {
      info: [
        "Skanna ditt kylskåp",
        "Välj dina preferenser",
        "Få AI genererade recept och inköpslistor",
      ],
      images: ["scan-fridge.png", "preferences.png", "recipe.png"],
      showInfo: 0,
    };
  },
  mounted() {
    setInterval(() => {
      this.showInfo = this.showInfo === 2 ? 0 : this.showInfo + 1;
    }, 1500);
  },
};
</script>

<style lang="scss">
@import "../shared/variables.scss";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease-in-out;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

.pop-enter-active {
  transition: transform 0.5s ease-in;
}

.pop-enter-from {
  transform: scale(0) skew(45deg);
}

.info-container {
  display: flex;
  margin: 60px 40px;
}

.half {
  width: 50%;
}

.pictures {
  display: flex;
  justify-content: center;
}

.info-texts {
  justify-items: center;
  display: grid;
  gap: 10px;
}

.info-text {
  font-size: 45px;
  margin: 10px;
  font-weight: bold;
  text-align: center;
  transition: opacity 0.5s ease-in-out;
  width: 500px;
}

.picture {
  width: 500px;
  border-radius: $borderRadius;
  box-shadow: $boxShadow;
  position: absolute;
  border: $border;
}
</style>
