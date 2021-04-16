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
                :counter="8"
                :rules="passwordRules"
                label="Password"
                required
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
             
              <v-btn to="/Home" color="error" class="mr-4"> Back </v-btn>
              <v-spacer></v-spacer>
              {{ test }}
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

    test: "",
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

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.loginUser();
        //this.$router.push("/");
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
              console.log(response.data);
              console.log("token" + " " + response.data.token);

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

//localStorage.setItem("user_token", JSON.stringify(response.data));
// localStorage.setItem("user_email", this.email);
</script>

<style lang="scss" scoped>
#errorMessage {
  color: red;
}
</style>
