<template>
    <v-col>
      <v-form>
        <h2>Project</h2>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="title"
            :rules="rules"
            label="Project Name"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="title"
            :rules="rules"
            label="Project Description"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="title"
            :rules="rules"
            label="Project ID (#Number)"
            required
          ></v-text-field>
        </v-col>
      </v-form>
    </v-col>
</template>

<script>

export default {
  name: 'Time',
  data: () => ({
      valid: true,
      name: '',
      rules: [
        v => !!v || 'Is required',
        v => (v && v.length >= 5) || 'Name must be above than 5 characters'
        ]
  })
}
</script>
