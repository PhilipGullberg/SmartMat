<template>
  <div class="nav">
    <RouterLink to="/">mat.ai</RouterLink>

    <div class="nav-links">
      <RouterLink
        v-for="link in links"
        :key="link.name"
        :to="link.to && link.to"
        :is="link.to ? 'router-link' : 'span'"
        @click="link.click && openLogin()"
      >
        {{ link.name }}
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { loginOpen } from "@/shared/store";
import RouterLink from "./RouterLink.vue";

export default {
  name: "HomeNavbar",
  components: { RouterLink },

  data() {
    loginOpen.user = localStorage.getItem("user");
    return {
      links: [
        { name: "Planera din middag", to: "/smartmatplanerare" },
        { name: "Om", to: "/about" },
        { name: "Profil", to: "/userpage" },
        {
          name: loginOpen.user ? `Inloggad som ${loginOpen.user}` : "Logga in",
          to: "",
          click: true,
        },
      ],
    };
  },

  methods: {
    openLogin() {
      loginOpen.status = true;
    },
  },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
}

.nav-links {
  display: flex;
  gap: 10px;
}
</style>
