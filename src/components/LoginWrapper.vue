<template>
  <CardWrapper>
    <div class="login-container" v-if="loginOpen.user">
      <MainButton>Logga ut</MainButton>
    </div>
    <div class="login-container" v-if="login && !loginOpen.user">
      <div class="text">Logga in</div>
      <MainInput
        autoFocus="true"
        v-model="input.username"
        placeholder="Email..."
      />
      <MainInput
        v-model="input.password"
        placeholder="Password"
        type="password"
      />

      <MainButton @click="onConfirmInput">Logga in</MainButton>

      <div class="text">eller</div>

      <MainButton @click="login = false">Skapa konto</MainButton>
    </div>

    <div class="login-container" v-if="!login && !loginOpen.user">
      <div class="text">Skapa konto</div>
      <MainInput v-model="input.name" autoFocus="true" placeholder="Name..." />
      <MainInput v-model="input.username" placeholder="Email..." />
      <MainInput
        v-model="input.password"
        placeholder="Password"
        type="password"
      />

      <MainButton @click="onConfirmInput">Skapa konto</MainButton>

      <div class="text">eller</div>

      <MainButton @click="login = true">Logga in</MainButton>
    </div>

    <div class="login-container">
      <MainButton @click="loginOpen.status = false">Stäng</MainButton>
    </div>
  </CardWrapper>
</template>

<script setup>
import { loginOpen } from "@/shared/store";
import { apiRoutes } from "../shared/api-routes";
import CardWrapper from "./CardWrapper.vue";
import MainButton from "./MainButton.vue";
import MainInput from "./MainInput.vue";

const login = false;
const input = {
  name: "",
  username: "",
  password: "",
};

async function onConfirmInput() {
  const { username, password, name } = input;
  if (username.length && password.length && name.length) {
    const result = await fetch(apiRoutes.users, {
      method: "POST",
      body: JSON.stringify({ username, password, name }),
    });

    localStorage.setItem("user", await result.text());
  }
}
</script>

<style lang="scss">
@import "../shared/variables.scss";

.login-container {
  text-align: center;
  display: grid;
  gap: 5px;

  .text {
    font-size: map-get($fontSizes, large);
  }
}
</style>
