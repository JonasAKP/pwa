<template>
  <v-app>
    <v-container>
      <v-col cols="12">
        <v-card style="padding: 15px">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              hint="At least 6 characters"
              counter
              :rules="passwordRules"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              required
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-text-field
              v-model="cPassword"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              hint="At least 6 characters"
              counter
              :rules="cPasswordRules"
              label="Confirm password"
              required
              @click:append="show2 = !show2"
            ></v-text-field>

            <v-checkbox
              v-model="checkbox"
              :rules="[(v) => !!v || 'You must agree to continue!']"
              label="Do you agree?"
              required
            ></v-checkbox>

            <v-row style="height: 60px; margin: 0px">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
              >
                Submit
              </v-btn>

              <v-btn to="/Login" class="mr-4">Back</v-btn>
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
    clicked: "not clicked",
    //totalVuePackages: null,
    show1: true,
    show2: true,
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    checkbox: false,

    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length >= 6) || "Password must be bigger than 8 characters",
    ],
    cPassword: "",
    cPasswordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length >= 6) || "Password must be bigger than 8 characters",
    ],
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
      this.registerUser();
    },

   /*  getUser() {
      fetch("http://localhost:4000/api/users")
        .then((response) => response.json())
        .then(
          (data) => (
            (this.totalVuePackages = data)
          )
        );
    }, */

    registerUser() {
      /*  fetch("https://rest-api-pwa.herokuapp.com/api/users/register", {
        method: "POST",
          body: {
          name: "test",
          email: "test@ss.dk",
          password: "123456"
        },
      }) */
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "wtfff",
          email: "wtfff@ss.dk",
          password: "123456",
        }),
      };
      fetch(
        "http://localhost:4000/api/users/register",
        requestOptions
      )
        // .then((response) => response.json())
      .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            alert(
              "Server returned " + response.status + " : " + response.statusText
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>