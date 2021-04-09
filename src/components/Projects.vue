<template>
    <v-col>
        <h2>Project</h2>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="title"
            :rules="rules"
            label="Project Name"
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
          ></v-text-field>
        </v-col>
    </v-col>
</template>

<script>

export default {
  name: 'Time',
}
</script>
