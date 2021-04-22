<template>
    <v-col style="margin: 20px 0 20px 0">
      <h2>Project type:</h2>
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
    </v-col>
</template>

<script>

export default {
  name: 'Project',
}
</script>
