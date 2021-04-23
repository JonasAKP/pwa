<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      src="https://images.photowall.com/products/44478/sunny-sky.jpg?"
    >
      <v-btn min-width="256px" class="white--text" elevation="0" outlined to="/"
        >Home</v-btn
      >
      <v-btn
        min-width="256px"
        class="white--text"
        elevation="0"
        outlined
        to="/about"
        >About</v-btn
      >
      <v-btn
        min-width="256px"
        class="white--text"
        elevation="0"
        outlined
        to="/create"
        >Create Project</v-btn
      >
      <v-btn
        min-width="256px"
        class="white--text"
        elevation="0"
        outlined
        @click="logout()"
        v-if="userEmail && userToken"
        >Logout</v-btn
      >
    </v-navigation-drawer>
    <v-app-bar
      app
      color="primary"
      dark
      src="https://wallpapermemory.com/uploads/245/sunrise-background-hd-1080p-284228.jpg"
      elevate-on-scroll
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
          @click.stop="drawer = !drawer"
        />

        <v-toolbar-title>Trello Clone</v-toolbar-title>
      </div>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <v-btn elevation="0" outlined to="/Login" v-if="!userEmail && !userToken">Login</v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: "App",

  components: {
   
  },

  data: () => ({ drawer: null, userEmail: null, userToken: null }),
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.push("Login");
    },
  },
  created() {
    this.userEmail = sessionStorage.getItem("user_email");
    this.userToken = sessionStorage.getItem("user_token");
  },
};
</script>
