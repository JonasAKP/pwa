<template>
  <v-card style="margin-top: 15px; padding: 5px">
    <v-row>
      <v-col cols="12" sm="2" md="2">
        <div>
          <v-card-title>{{ project.name }}</v-card-title>
          <v-card-subtitle> {{ project.description }}</v-card-subtitle>
        </div>
      </v-col>
      <v-col md="3">
        <div>
          <v-card-title>Members:</v-card-title>
          <v-card-subtitle>{{ membersNames.toString() }} </v-card-subtitle>
        </div>
      </v-col>
      <v-col md="3">
        <div>
          <v-card-title>Due</v-card-title>
          <v-card-subtitle>{{ project.timeEnd }}</v-card-subtitle>
        </div>
      </v-col>
      <v-col md="2" class="center">
        <v-chip class="deep-purple accent-4 white--text" large>{{
          project.status
        }}</v-chip>
      </v-col>

      <v-col md="2" class="center">
        <v-btn text @click="setProject()"
          ><v-icon x-large>mdi-folder-search</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <v-expansion-panels flat>
      <v-expansion-panel>
        <v-expansion-panel-header></v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col md="4">
              <div
                style="display: flex"
                v-for="task in tasksObj"
                :key="task.id"
              >
                <v-checkbox
                  v-if="task.status == 'Done'"
                  input-value="true"
                  value
                  disabled
                ></v-checkbox>
                <v-checkbox v-else value disabled></v-checkbox>

                <p style="margin-top: 18px">{{ task.name }}</p>
              </div>
            </v-col>
            <v-col md="4">
              <v-card-title>Hours Allocated</v-card-title>
              <v-card-subtitle>{{ project.duration }}</v-card-subtitle>
            </v-col>
            <v-col md="4">
              <v-card-title>Start Date</v-card-title>
              <v-card-subtitle>{{ project.timeBegin }}</v-card-subtitle>
              <v-card-title>End Date</v-card-title>
              <v-card-subtitle>{{ project.timeEnd }}</v-card-subtitle>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

  <script>
export default {
  data: () => ({
    /*  type: null,
    name: null,
    description: null,
    duration: null,
    stakeholder: null,
    leader: null,
    timeBegin: null,
    timeEnd: null,
    status: null, */
    project: null,

    date: null,
    taskIDs: [],
    tasksObj: [],
    membersIDs: [],
    membersNames: [],
  }),
  props: {
    projectID: String,
    token: String,
  },
  created() {
    this.getProject();
  },
  methods: {
    setProject() {
      sessionStorage.setItem(
        "project",
        JSON.stringify(this.project)
      );
      this.$router.push("/TrelloMain");
    },
    getProject() {
      fetch(
        "https://rest-api-pwa.herokuapp.com/api/projects/" + this.projectID,
        {
          method: "GET",
          headers: { "auth-token": this.token },
        }
      ).then((response) =>
        response
          .json()
          .then((data) => ({
            data: data,
            status: response.status,
          }))
          .then((response) => {
            if (response.data) {
              this.project = response.data;

              /*   this.type = response.data.type;
              this.name = response.data.name;
              this.description = response.data.description;
              this.duration = response.data.duration;
              this.stakeholder = response.data.stakeholder;
              this.leader = response.data.leader;
              this.timeBegin = response.data.timeBegin;
              this.timeEnd = response.data.timeEnd;
              this.status = response.data.status;
*/
              this.date = response.data.date;

              this.taskIDs = response.data.tasks;
              this.membersIDs = response.data.members;

              this.getMembers();
              this.getTasks();
            } else {
              alert(
                "Server returned " +
                  response.status +
                  " : " +
                  response.statusText
              );
            }
          })
      );
    },

    getMembers() {
      this.membersIDs.forEach((member) => {
        const memberID = member._id;
        fetch("https://rest-api-pwa.herokuapp.com/api/users/" + memberID, {
          method: "GET",
          headers: { "auth-token": this.token },
        }).then((response) =>
          response
            .json()
            .then((data) => ({
              data: data,
              status: response.status,
            }))
            .then((response) => {
              if (response.data) {
                this.membersNames.push(response.data.name);
              } else {
                alert(
                  "Server returned " +
                    response.status +
                    " : " +
                    response.statusText
                );
              }
            })
        );
      });
    },

    getTasks() {
      this.taskIDs.forEach((taskID) => {
        fetch("https://rest-api-pwa.herokuapp.com/api/tasks/" + taskID, {
          method: "GET",
          headers: { "auth-token": this.token },
        }).then((response) =>
          response
            .json()
            .then((data) => ({
              data: data,
              status: response.status,
            }))
            .then((response) => {
              if (response.data) {
                this.tasksObj.push(response.data);
              } else {
                alert(
                  "Server returned " +
                    response.status +
                    " : " +
                    response.statusText
                );
              }
            })
        );
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.align-mid {
  padding-left: 31%;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.status {
  background-color: blue;
  color: white;
  border-radius: 35px;
  padding: 10px;
  text-align: center;
}
</style>