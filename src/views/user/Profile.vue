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
      :counter="8"
      :rules="passwordRules"
      label="New Password"
      required
    ></v-text-field>

     <v-text-field
      v-model="cPassword"
      :counter="8"
      :rules="cPasswordRules"
      label="Confirm password"
      required
    ></v-text-field>


    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
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


     <v-btn to="/Login"
     class="mr-4"
    >Back</v-btn>
  

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
      
      checkbox: false,

      name:"",
      email: "",
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 8) || 'Password must be less than 8 characters',
      ],
         cPassword: '',
      cPasswordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 8) || 'Password must be less than 8 characters',
      ],
    }),
    

    methods: {
      validate () {
        this.$refs.form.validate()
      },

    },
  }
</script>