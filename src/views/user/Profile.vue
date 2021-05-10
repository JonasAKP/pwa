<template>
  <v-app>
    <v-container>
      <v-col cols="12">
        <v-card style="padding: 15px">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              label="Name"
              disabled
            ></v-text-field>

            <v-text-field
              v-model="email"
              label="E-mail"
              disabled
            ></v-text-field>

            <v-text-field
              v-model="password"
              counter
              :rules="passwordRules"
              label="New Password"
              required
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-text-field
              v-model="cPassword"
              :counter="8"
              :rules="cPasswordRules"
              label="Confirm password"
              required
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
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

              <v-btn to="/" class="mr-4">Back</v-btn>
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
    user: null,
    checkbox: false,
    show1: false,
    show2: false,
    token: null,
    userID: null,
    name: "",
    email: "",
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 6) || "Password must be more than 6 characters",
    ],
    cPassword: "",
    cPasswordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 6) || "Password must be more than 6 characters",
    ],
  }),
  created() {
    this.token = sessionStorage.getItem("user_token");
    this.userID = sessionStorage.getItem("user_id");
    if (this.token == null && this.userID == null) {
      this.$router.push("Login");
    } else {
      this.getUser();
    }
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        if (this.password != this.cPassword) {
          alert("Password and confirm passwod does not match");
        } else {
          this.updatePassword();
        }
      }
    },

    getUser() {
      fetch("https://rest-api-pwa.herokuapp.com/api/users/" + this.userID, {
        method: "GET",
        headers: { "auth-token": this.token },
      }).then((response) =>
        response
          .json()
          .then((data) => ({
            data: data,
            status: response.status,
          }))
          .then((response) => {
            if (response.data) {
              this.name = response.data.name;
              this.email = response.data.email;
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

    updatePassword() {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
           "auth-token": this.token
        },
        body: JSON.stringify({ 
          password: this.password,
        }),
      };
      fetch(
        "https://rest-api-pwa.herokuapp.com/api/users/" + this.userID,
        requestOptions
      ).then((response) => {
          if (response.ok) {
            
             this.$router.push( {name:'Home', params: {text: "Password has been changed", snackbar: true}});
            return response.json();
          } else {
            alert(
              "Server returned " + response.status + " : " + response.statusText,
              this.error = "Something went wrong"
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