<template>
  <div class="home"></div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {
    //HelloWorld
  },
  mounted() {
   if (
      
      sessionStorage.getItem("user_token") == null &&
      sessionStorage.getItem("user_email") == null
    ) {
        this.$router.push('Login');
    }
  },
};
</script>
