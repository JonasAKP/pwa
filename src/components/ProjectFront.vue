<template>
  <div>
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
        <v-col md="2">
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

        <v-col md="1" class="center">
          <v-btn text @click="setProject()"
            ><v-icon x-large>mdi-folder-search</v-icon></v-btn
          >
        </v-col>
        <v-col md="1" class="center">
          <v-btn text @click="editProject(project)"
            ><v-icon x-large color="yellow darken-2">mdi-pencil</v-icon></v-btn
          >
        </v-col>
        <v-col md="1" class="center">
          <!-- get project and open dialog to delete -->
          <v-btn text @click="getItem(project)" @click.stop="dialog = true"
            ><v-icon x-large color="error">mdi-delete-forever</v-icon></v-btn
          >
        </v-col>
      </v-row>
      <!-- hidden until expaned by user -->
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
      <!--  -->
    </v-card>
    <!-- dialog for delete -->
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2">
            Delete {{ project.name }}
          </v-card-title>
          <v-form v-model="valid">
            <v-card-text class="mt-2">
              are you sure you want to delete project: {{ project.name }}
              <v-text-field
                v-model="confirm"
                label="Write Name of Project to comfirm Delete"
                :rules="confirmRules"
                required
              ></v-text-field>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="deleteProjectAndTasks(project, confirm)"
                @click.stop="dialog = false"
                :disabled="!valid"
              >
                Delete project
              </v-btn>
              <v-btn color="red" text @click="dialog = false"> cancel </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </div>
  </div>
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
    dialog: false,
    date: null,
    taskIDs: [],
    tasksObj: [],
    membersIDs: [],
    membersNames: [],
    membersOnProject: [],
    valid: false,
    confirm: "",
    confirmRules: [(v) => !!v || " field is required"],
  }),
  props: {
    projectID: String,
    token: String,
    user: Object,
  },
  // run when compontent is created and calls methot getProject().
  created() {
    this.getProject();
  },

  methods: {
    //sets project in session and reroute to trelloMain.vue
    setProject() {
      sessionStorage.setItem("project", JSON.stringify(this.project));
      this.$router.push("/TrelloMain");
    },

    // get project from database.
    // calls getMember()
    // calls getTasks()
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
              console.log("get Projects");

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
    //gets project and set it to item.
    getItem(item) {
      this.item = item;
      this.activeEditItem = item.id;
    },

    //gets project and set it to item.
    //reroute to EditProject.vue
    editProject(item) {
      this.item = item;
      this.activeEditItem = item.id;
      this.$router.push({ name: "EditProject", params: { project: item } });
    },

    //gets members on current project from the database
    //push member name to list of member names.
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
                this.membersNames.push(" " + response.data.name);
                this.membersOnProject.push(response.data);
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

    //checks if confirm field matches name of project.
    //if confirm and project name matches calls deleteTasksInProject()
    deleteProjectAndTasks(project, confirm) {
      if (confirm != project.name) {
        alert(confirm + "does not match " + project.name);
        this.confirm = null;
      } else if (confirm == project.name) {
        this.deleteTasksInProject(project);
      }
    },

    //Delete all tasks related to current project from database
    deleteTasksInProject(project) {
      if (!project.tasks || project.tasks.length == 0) {
        this.deleteProjectFromAllUsers(project);
      } else if (project.tasks) {
        project.tasks.forEach((task) => {
          const requestOptions = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "auth-token": this.token,
            },
          };
          fetch(
            "https://rest-api-pwa.herokuapp.com/api/tasks/" + task,
            requestOptions
          )
            .then((response) => {
              if (response.ok) {
                console.log(task + "task Deleted");

                return response.json();
              } else {
                alert(
                  "Server returned " +
                    response.status +
                    " : " +
                    response.statusText,
                  (this.error = "Something went wrong")
                );
              }
            })
            .catch((err) => {
              console.log(err);
            });
        });

        this.deleteProjectFromAllUsers(project);
      }
    },

    //delete project id from all user related to the project.
    deleteProjectFromAllUsers(project) {
      //get all memeber on project
      const removeFrom = this.membersOnProject;
      //push current user to array of member on project.
      removeFrom.push(this.user);
      //for each user on array removes id from their projects array in database.
      removeFrom.forEach((member) => {
        const projectsMinusDeleted = member.projects;
        console.log("projectID: " + this.project._id);
        const index = projectsMinusDeleted.indexOf(project._id);
        if (index != -1) {
          console.log("index " + index);
          projectsMinusDeleted.splice(index, 1);

          const requestOptions = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": this.token,
            },
            body: JSON.stringify({
              password: member.password,
              projects: projectsMinusDeleted,
            }),
          };
          fetch(
            "https://rest-api-pwa.herokuapp.com/api/users/" + member._id,
            requestOptions
          )
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                alert(
                  "Server returned " +
                    response.status +
                    " : " +
                    response.statusText,
                  (this.error = "Something went wrong")
                );
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
      this.deleteTheProject(project);
    },

    //delete project from database.
    deleteTheProject(project) {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": this.token,
        },
      };
      fetch(
        "https://rest-api-pwa.herokuapp.com/api/projects/" + project._id,
        requestOptions
      )
        .then((response) => {
          if (response.ok) {
            console.log("Project Deleted" + project.name);
            this.text = "Project has been Deleted";
            this.snackbar = true;

            return response.json();
          } else {
            alert(
              "Server returned " +
                response.status +
                " : " +
                response.statusText,
              (this.error = "Something went wrong")
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //get tasks in project from database.
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