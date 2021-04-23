<template>
  <div class="home">
    <h1>Projects</h1>
    <v-btn
      text
      color="yellow darken-2"
      style="padding: 0; margin-bottom: 0; margin-top: 15px"
    >
      <v-icon
        color="yellow darken-2"
        large
        style="margin-right: 5px; margin-left: 0"
        >mdi-folder-plus</v-icon
      >
      New Project
    </v-btn>
    <v-row>
      <v-col md="8">
        <v-card style="margin-top: 15px; padding: 5px">
          <v-row>
            <v-col cols="2" sm="2" md="3">
              <div>
                <v-card-title>Project One</v-card-title>
                <v-card-subtitle>
                  These palettes provide additional ways to use your primary and
                  secondary colors.</v-card-subtitle
                >
              </div>
            </v-col>
            <v-col md="3">
              <div>
                <v-card-title>Members:</v-card-title>
                <v-card-subtitle>bob,søren, mads</v-card-subtitle>
              </div>
            </v-col>
            <v-col md="2">
              <div>
                <v-card-title>Due</v-card-title>
                <v-card-subtitle>23-04-2021</v-card-subtitle>
              </div>
            </v-col>
            <v-col md="2" class="center">
              <v-chip class="deep-purple accent-4 white--text" large
                >ONGOING</v-chip
              >
            </v-col>

            <v-col md="2" class="center">
              <v-btn text><v-icon x-large>mdi-folder-search</v-icon></v-btn>
            </v-col>
          </v-row>
          <v-expansion-panels flat>
            <v-expansion-panel>
              <v-expansion-panel-header></v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col md="3">
                    <div style="display: flex">
                      <v-checkbox value disabled></v-checkbox>
                      <p style="margin-top: 18px">task one</p>
                    </div>
                    <div style="display: flex">
                      <v-checkbox value disabled></v-checkbox>
                      <p style="margin-top: 18px">task two</p>
                    </div>
                    <div style="display: flex">
                      <v-checkbox
                        input-value="true"
                        value
                        disabled
                      ></v-checkbox>
                      <p style="margin-top: 18px">task three</p>
                    </div>
                  </v-col>
                  <v-col md="2">
                    <v-card-title>Budget</v-card-title>
                    <v-card-subtitle>200 hours</v-card-subtitle>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  created() {
    if (
      sessionStorage.getItem("user_token") == null &&
      sessionStorage.getItem("user_email") == null
    ) {
      this.$router.push("Login");
    }
  },
};
</script>

<style lang="scss" scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.status {
  background-color: blue;
  color: white;
  border-radius: 35px;
  padding: 10px;
  text-align: center;
}

.home {
  padding: 20px;
}
</style>
