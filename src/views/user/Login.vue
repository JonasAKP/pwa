<template>
  <v-container>
    <v-col cols="12">
      <v-row class="text-center">
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
  <v-row>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Login
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Back
    </v-btn>
<v-spacer></v-spacer>
 <v-app>
     <v-btn to="/Register"
     class="mr-4"

     >Register</v-btn>
  </v-app>
</v-row>
  </v-form>


    </v-row>
  </v-col>
</v-container>
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
      reset () {
       // this.$refs.form.reset()
      },
      resetValidation () {
      //  this.$refs.form.resetValidation()
      },
    },
  }
</script>