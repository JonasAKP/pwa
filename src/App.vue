<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <router-link to="/"> Home </router-link>
      <router-link to="/About"> About </router-link>
      <router-link to="/Register"> Login </router-link>
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
      <v-btn elevation="0" outlined to="/">Home</v-btn>
      <v-btn elevation="0" outlined to="/about">About</v-btn>
      <v-btn elevation="0" outlined to="/Register">Register</v-btn>
    </v-app-bar>
    <v-main>     
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
  
  //  HelloWorld,
  },

  data: () => ({ drawer: null }),
  
};
</script>
