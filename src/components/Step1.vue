<template>
  <v-container>
    <v-row style="margin: 20px 0 20px 0">
      <v-icon large color="green darken-2">mdi-check</v-icon>Project Setup <v-spacer>
      </v-spacer> <v-icon large>mdi-check</v-icon> Project Tasks <v-spacer>
      </v-spacer> <v-icon large>mdi-pencil</v-icon> Management <v-spacer>
      </v-spacer> <v-icon large>mdi-folder-plus</v-icon>Create
    </v-row>
    <v-divider></v-divider>
    <v-row style="margin: 20px 0 20px 0">
      Project type:
    <v-radio-group
      v-model="radios"
      mandatory
    >
      <v-radio
        label="Rest API - MMD"
        value="radio-1"
      ></v-radio>
      <v-radio
        label="Rest API - PBA"
        value="radio-2"
      ></v-radio>
      <v-radio
        label="Empty Template"
        value="radio-3"
      ></v-radio>
      </v-radio-group>


    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Step1',

    data: () => ({
          
    }),
  }
</script>
