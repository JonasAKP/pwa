<template>
    <v-col>
        <h2>Time Schedule</h2>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="title"
            :rules="rules"
            label="Start date"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="title"
            :rules="rules"
            label="End date"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="title"
            :rules="rules"
            label="Total hours allocated"
          ></v-text-field>
        </v-col>
    </v-col>
</template>

<script>

export default {
  name: 'Projects',
}
</script>
