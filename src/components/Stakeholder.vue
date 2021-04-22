<template>
    <v-col>
        <h2>Stakeholder</h2>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="title"
            :rules="rules"
            label="Stakeholder/partners"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="title"
            :rules="rules"
            label="Project Members"
          ></v-text-field>
        </v-col>

        <br>
        <br>
        <h2>Members</h2>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="title"
            :rules="rules"
            label="Project Leader"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="title"
            :rules="rules"
            label="Project Members"
          ></v-text-field>
        </v-col>
    </v-col>
</template>

<script>

export default {
  name: 'Stakeholder',
}
</script>
