<template>
  <v-app>
    <v-container>
      <v-col cols="12">
        <v-card style="padding: 15px">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              hint="At least 4 characters"
              counter
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
              v-model="role"
              hint="At least 4 characters"
              counter
              :rules="roleRules"
              label="Role"
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
            <p id="errorMessage">{{ error }}</p>

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
    error: "",
    show1: false,
    show2: false,
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length >= 2) || "Name must be more than 2 characters",
    ],
    role: "",
    roleRules: [
      (v) => !!v || "role is required",
      (v) => (v && v.length >= 4) || "Role must be more than 4 characters",
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
      if (this.$refs.form.validate()) {
        if (this.password != this.cPassword) {
          this.error = "Password does not match";
        } else {
          this.registerUser();
          alert("User Registered");
          this.$router.push("Login");
        }
      }
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
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role
        }),
      };
      fetch(
        // "http://localhost:4000/api/users/register",
        "https://rest-api-pwa.herokuapp.com/api/users/register",
        requestOptions
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            alert(
              "Server returned " +
                response.status +
                " : " +
                response.statusText,
              (this.error = "Something went wrong")
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

<style lang="scss" scoped>
#errorMessage {
  color: red;
}
</style>