<template>
    <v-col cols="12" md="6">
        <v-text-field :rules="rules"></v-text-field>
    </v-col>
</template>


<script>
  export default {
    data: () => ({
      rules: [
        value => !!value || 'Required.',
        value => (value || '').length <= 20 || 'Max 20 characters'
      ],
    }),
  }
</script>