<template>
  <v-app>
    <v-container>
      <v-col cols="12">
        <v-card style="padding: 15px">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-col>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="password"
                counter
                :rules="passwordRules"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                label="Password"
                required
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-row style="height: 60px; margin: 11px">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
              >
                Login
              </v-btn>

              <v-btn to="/" color="error" class="mr-4"> Back </v-btn>
              <v-spacer></v-spacer>
              <!-- {{ test }} -->
              <v-btn to="/Register" class="mr-4">Register</v-btn>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    show1: false,
    // test: "",
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "Wrong E-mail",
    ],
    checkbox: false,

    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length <= 8) || "password is incorrect, please try again",
    ],
  }),
  created() {
    this.token = sessionStorage.getItem("user_token");
    this.userID = sessionStorage.getItem("user_id");
    if (this.token != null && this.userID != null) {
      this.$router.push("/");
    }
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.loginUser();
      }
    },

    loginUser() {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      };
      fetch(
        "https://rest-api-pwa.herokuapp.com/api/users/login",
        requestOptions
      ).then((response) =>
        response
          .json()
          .then((data) => ({
            data: data,
            status: response.status,
          }))
          .then((response) => {
            if (response.data) {
              console.log(response.data.token);
              if (!response.data.token) {
                alert("Email and Password does not match");
              } else {
                sessionStorage.setItem(
                  "user_token",
                  response.data.token
                  // console.log("getToken: " + response.data.token)
                );
                sessionStorage.setItem("user_id", response.data.userId);
                const token = sessionStorage.getItem("user_token");
                const userID = sessionStorage.getItem("user_id");
                if (token != null && userID != null) {
                  alert(this.email + " Has been logged in");
                  this.$router.push("/");
                } else {  
                  alert("Something went wrong");
                }
              }
              // this.test = "token: " + sessionStorage.getItem("user_token") + "\n" + "user :" + sessionStorage.getItem("user_email") ;
            } else {
              alert(
                "Server returned " +
                  response.status +
                  " : " +
                  response.statusText
              );
            }
          })
      );
    },
  },
};
</script>

<style lang="scss" scoped>
#errorMessage {
  color: red;
}
</style>
