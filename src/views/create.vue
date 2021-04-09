<template>
  <v-container>
    <v-row style="margin: 20px 0 20px 0">
      <v-icon large color="green darken-2">mdi-check</v-icon>Project Setup <v-spacer>
      </v-spacer> <v-icon large>mdi-check</v-icon> Project Tasks <v-spacer>
      </v-spacer> <v-icon large>mdi-pencil</v-icon> Management <v-spacer>
      </v-spacer> <v-icon large>mdi-folder-plus</v-icon>Create
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <project></project>
    </v-row>
    <v-row style="margin: -25px">
      <projects></projects>
      <Schedules></Schedules>
      <Stakeholder></Stakeholder>
    </v-row>

<v-btn> Continue </v-btn>
<v-btn to="/"> Back </v-btn>


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

    data: () => ({
          
    }),
  }
</script>
