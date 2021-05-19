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
        v-if="userToken"
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
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Trello Clone</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
      <v-btn elevation="0" outlined to="/Login" v-if="!userToken">Login </v-btn>
    </v-app-bar>
    <v-main>
      <router-view @eventname="updateToken"></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({ drawer: null, userID: null, userToken: null }),
  methods: {
    logout() {
      this.userID = null;
      this.userToken = null;
      sessionStorage.clear();

      this.$router.push("Login");
    },
    updateToken(childToken) {
      this.userToken = childToken;
    },
  },
  created() {
    this.userID = sessionStorage.getItem("user_id");
    this.userToken = sessionStorage.getItem("user_token");
  },
};
</script>
