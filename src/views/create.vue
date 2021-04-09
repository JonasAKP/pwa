<template>
  <v-container>
<v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"        
      >
        Project Setup
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
        Project Tasks
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 3"
        step="3"
      >
        Management
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="4">
        Create
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
         <v-row>
      <project></project>
    </v-row>
    <v-row style="">
      <projects></projects>
      <Schedules></Schedules>
      <Stakeholder></Stakeholder>
    </v-row>

        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Continue
        </v-btn>

        <v-btn text to="/">
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>

        <v-btn text to="/">
          Cancel
        </v-btn>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Back
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 4"
        >
          Continue
        </v-btn>

        <v-btn text to="/">
          Cancel
        </v-btn>

        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Back
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>

        <v-btn text to="/">
          Cancel
        </v-btn>

        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Back
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>


  </v-container>





</template>

<script>
import Project from '../components/Project'
import Projects from '../components/Projects'
import Schedules from '../components/Schedules'
import Stakeholder from '../components/Stakeholder'

  export default {
    name: 'Create',
    components: {
  
   'Project':
        Project,
    'Projects':
        Projects,
    'Schedules':
        Schedules,
    'Stakeholder':
        Stakeholder
  },

    data () {
      return {
        e1: 1,
      }
    },
  }
</script>
