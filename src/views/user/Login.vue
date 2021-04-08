<template>
 <v-app>
  <v-container>
    <v-col cols="12">
    <v-card style="padding: 15px">
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >

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

    <v-btn to="/Home"
      color="error"
      class="mr-4"
    >
      Back
    </v-btn>
<v-spacer></v-spacer>

     <v-btn to="/Register"
     class="mr-4"

     >Register</v-btn>
  
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
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'Wrong E-mail',
      ],
      checkbox: false,

      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 8) || 'password is incorrect, please try again',
      ],
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
    },
  }
</script>