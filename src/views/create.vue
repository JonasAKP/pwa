<template>
  <v-container>
    <v-stepper v-model="e1">
      <!-- Start of the stepper. Header component with the numbers in it  -->
      <v-stepper-header>
        <!-- first page. the complete function adds the number to the page that is next to >  -->
        <v-stepper-step :complete="e1 > 1" step="1">
          Project Setup
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          Project Tasks
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3">
          Management
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4"> Create </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form v-model="valid">
            <!-- <v-row>
              <v-col style="margin: 20px 0 20px 0">
                <h2>Project type:</h2>
                <v-radio-group v-model="radios" mandatory>
                  <v-radio label="Rest API - MMD" value="radio-1"></v-radio>
                  <v-radio label="Rest API - PBA" value="radio-2"></v-radio>
                  <v-radio label="Empty Template" value="radio-3"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row> -->

            <v-row style="">
              <v-col>
                <v-form>
                  <h2>Project</h2>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="project"
                      :rules="rules"
                      label="Project Name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="description"
                      :rules="rules"
                      label="Project Description"
                      required
                    ></v-text-field>
                  </v-col>
                </v-form>
              </v-col>

              <v-col>
                <h2>Time Schedule</h2>

                <v-col cols="12" sm="6">
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :rules="dates"
                        v-model="startDate"
                        label="Start date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="startDate"
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :rules="dates"
                        v-model="endDate"
                        label="End date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="endDate"
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    type="number"
                    v-model="hour"
                    :rules="hours"
                    label="Total hours allocated"
                  ></v-text-field>
                </v-col>
              </v-col>

              <v-col>
                <h2>Stakeholder</h2>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="stake"
                    :rules="names"
                    label="Stakeholder/partners"
                  ></v-text-field>
                </v-col>

                <br />
                <br />
                <h2>Members</h2>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="leader"
                    :rules="names"
                    label="Project Leader"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-col cols="12">
                    <v-select
                      disable-lookup
                      style="margin: -10px"
                      :rules="members"
                      v-model="p_members"
                      :items="allMembers"
                      label="Members"
                      multiple
                      chips
                      item-text="name"
                      :item-value="allMembers._id"
                      return-object
                    ></v-select>
                  </v-col>
                </v-col>
              </v-col>
            </v-row>

            <v-btn
              :disabled="!valid"
              color="primary"
              @click="
                e1 = 2;
                validate;
              "
            >
              Continue
            </v-btn>

            <v-btn text to="/"> Cancel </v-btn>
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="2">
          <!-- Content here -->

          <v-row>
            <v-col cols="12" md="5">
              <v-row style="margin: 0">
                <v-form v-model="isFormValid">
                  <v-text-field
                  style="width: 300px"
                    v-model="newTask"
                    :rules="tasks"
                    placeholder="Enter Task"
                  ></v-text-field>
                </v-form>
                <v-btn
                  style="margin: 15px"
                  color="primary"
                  :disabled="!isFormValid"
                  @click="add"
                >
                  Add
                </v-btn>
              </v-row>
              <v-row style="margin 0">
                <v-card class="col-md-12" flat>
                  <h3>Tasks</h3>
                  <v-card
                    style="margin: 10px; padding: 5px"
                    class="list-group-items"
                    v-for="(element, index) in taskBacklog"
                    :key="index"
                  >
                    {{ element.name }}
                    <v-btn
                      :right="true"
                      :absolute="true"
                      height="25px"
                      text
                      @click="removeA(index)"
                      >X</v-btn
                    >
                  </v-card>
                </v-card>
              </v-row>
            </v-col>
            <v-col> </v-col>
          </v-row>

          <!-- Content ends here -->

          <v-btn
            color="primary"
            @click="
              calc();
              e1 = 3;
            "
          >
            Continue
          </v-btn>

          <v-btn text to="/"> Cancel </v-btn>

          <v-btn color="primary" @click="e1 = 1"> Back </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-form>
            <v-row>
              <v-col class="col-sm-6">
                <h4>Project Members</h4>
                <v-simple-table style="margin: 0 0 30px 0">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Role</th>
                        <th class="text-left">Hours available</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="member in p_members" :key="member.name">
                        <td>{{ member.name }}</td>
                        <td>{{ member.role }}</td>
                        <td>{{ member.weekHours }}</td>
                      </tr>
                      <tr>
                        <td>Total hours</td>
                        <td></td>
                        <td>{{ totalHours }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <v-row> </v-row>
              </v-col>

              <v-col>
                <v-row>
                  <v-form v-model="isThreeValid">
                    <v-col cols="12" sm="5">
                      <h4>Cloud location</h4>
                      <v-text-field
                        v-model="cloud"
                        :rules="rules"
                        label="Upload location"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="5" offset="md-2">
                      <h4>Github Repository</h4>
                      <v-text-field
                        v-model="github"
                        :rules="rules"
                        label="Github location"
                      ></v-text-field>
                    </v-col>
                  </v-form>
                  <v-col cols="12" sm="5">
                    <v-row>
                      <v-form v-model="isTechValid">
                        <v-text-field
                          style="margin: 0 0 0 10px"
                          :rules="tasks"
                          v-model="newTask"
                          placeholder="Technologies"
                        ></v-text-field>
                      </v-form>
                      <v-btn
                        :disabled="!isTechValid"
                        style="margin: 15px"
                        color="primary"
                        @click="addTech"
                      >
                        Add
                      </v-btn>
                    </v-row>
                    <v-card
                      :rules="techCheck"
                      style="margin: 10px; padding: 5px"
                      class="list-group-items"
                      v-for="element in techsUsed"
                      :key="element.name"
                    >
                      {{ element.name }}
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-btn
              color="primary"
              :disabled="!isThreeValid"
              @click="
                e1 = 4;
                validate;
              "
            >
              Continue
            </v-btn>

            <v-btn text to="/"> Cancel </v-btn>

            <v-btn color="primary" @click="e1 = 2"> Back </v-btn>
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card height="300px" flat>
            <h2 style="text-align: center">Project: {{ project }}</h2>
            <div style="text-align: center">
              <v-btn color="success" @click="createProject">Create</v-btn>
            </div>
          </v-card>

          <v-btn color="primary" @click="e1 = 1"> Page 1 </v-btn>

          <v-btn text to="/"> Cancel </v-btn>

          <v-btn color="primary" @click="e1 = 3" right> Back </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  name: "Create",
  data: () => ({
    token: null,
    userID: null,
    radios: null, // fix later
    project: null,
    description: null,
    startDate: null, // fix later
    endDate: null,
    menu: false,
    menu2: false, // fix later
    hour: null, // fix later
    stake: null,
    leader: null,
    totalHours: null,
    p_members: [],
    newTask: null,
    selected: null,
    cloud: null,
    github: null,
    //array for keeping data
    taskBacklog: [],
    taskDrop: [],
    techsUsed: [],
    allMembers: [],
    user: null,
    projectID: null,
    //rules start here
    isFormValid: false,
    isThreeValid: false,
    isTechValid: false,
    valid: false,
    valid1: true,
    name: "Rules",
    rules: [
      (v) => !!v || "Is required",
      (v) => (v && v.length >= 3) || "Name must be above than 3 characters",
      (v) =>
        /^[a-zA-Z0-9\u00c0-\u017e][a-zA-Z0-9\u00c0-\u017e\s]*$/i.test(v) ||
        "No special characters",
    ],
    dates: [
      (v) => !!v || "Is required",
      (v) => (v && v.length >= 3) || "Please pick a date",
    ],
    names: [
      (v) => !!v || "Is required",
      (v) => (v && v.length >= 2) || "Name must be above than 2 characters",
      (v) =>
        /^[a-zA-Z\u00c0-\u017e][a-zA-Z\u00c0-\u017e\s]*$/i.test(v) ||
        "No special characters",
    ],
    members: [
      (v) => !!v || "Is required",
      (v) => (v && v.length >= 1) || "At least one member must be added",
    ],
    hours: [
      (v) => !!v || "Is required",
      (v) => (v && v.length <= 3) || "Must be below 3 digits",
      (v) => /^[0-9]*$/i.test(v) || "Only numbers",
    ],
    tasks: [
      (v) => !!v || "Is required",
      (v) =>
        /^[a-zA-Z\u00c0-\u017e][a-zA-Z\u00c0-\u017e\s]*$/i.test(v) ||
        "No special characters",
    ],

    // rules end here
    arrCheck: [(taskBacklog) => taskBacklog && taskBacklog.length >= 0],
    techCheck: [(techsUsed) => techsUsed && techsUsed.length >= 0],
    e1: 1,
  }),
  created() {
    this.token = sessionStorage.getItem("user_token");
    this.userID = sessionStorage.getItem("user_id");
    if (this.token == null && this.userID == null) {
      this.$router.push("Login");
    } else {
      this.getUser();
      this.getAllUsers();
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    add() {
      if (this.newTask) {
        this.taskBacklog.push({ name: this.newTask });
        this.newTask = "";
      }
    },
    addTech() {
      if (this.newTask) {
        this.techsUsed.push({ name: this.newTask });
        this.newTask = "";
      }
    },
    removeA(index) {
      this.taskBacklog.splice(index, 1);
    },
    createProject() {
      //const taskList = this.taskDrop;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": this.token,
        },
        body: JSON.stringify({
          name: this.project,
          description: this.description,
          timeBegin: this.startDate,
          timeEnd: this.endDate,
          duration: this.hour,
          stakeholder: this.stake,
          leader: this.leader,
          cloud: this.cloud,
          github: this.github,
          tech: this.techsUsed,
          tasks: this.taskDrop,
          status: "Ongoing",
          members: this.p_members,
        }),
      };
      fetch(
        "https://rest-api-pwa.herokuapp.com/api/projects/",
        requestOptions
      ).then((response) =>
        response
          .json()
          .then((data) => ({
            data: data,
            status: response.status,
          }))
          .then((response) => {
            if (response.data) {
              this.projectID = response.data[0]._id;
              this.addProjectToUser(this.projectID);
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
    addProjectToUser(newProject) {
      const arrProject = this.user.projects;
      arrProject.push(newProject);
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": this.token,
        },
        body: JSON.stringify({
          password: this.user.password,
          projects: arrProject,
        }),
      };
      fetch(
        "https://rest-api-pwa.herokuapp.com/api/users/" + this.userID,
        requestOptions
      )
        .then((response) => {
          if (response.ok) {
            this.createTasks();
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
    getUser() {
      fetch("https://rest-api-pwa.herokuapp.com/api/users/" + this.userID, {
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
              this.user = response.data;
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
    createTasks() {
      this.taskBacklog.forEach((Task) => {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": this.token,
          },
          body: JSON.stringify({
            name: Task.name,
            status: "Backlog",
            priority: 1,
          }),
        };
        fetch(
          "https://rest-api-pwa.herokuapp.com/api/tasks/",
          requestOptions
        ).then((response) =>
          response
            .json()
            .then((data) => ({
              data: data,
              status: response.status,
            }))
            .then((response) => {
              this.bindTasks(response.data[0]._id);
              
              //this.taskDrop.push(response.data[0]._id); // response.data[0]._id
              if (response.data) {
                console.log("task created");
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
      this.bindProjectToMembers();
    },

    getAllUsers() {
      fetch("https://rest-api-pwa.herokuapp.com/api/users/", {
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
              this.allMembers = response.data;
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

    bindTasks(taskID) {
      const arrayTask = this.taskDrop;
      arrayTask.push(taskID);
      this.taskDrop = arrayTask;
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": this.token,
        },
        body: JSON.stringify({
          tasks: arrayTask,
        }),
      };
      fetch(
        "https://rest-api-pwa.herokuapp.com/api/projects/" + this.projectID,
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
    },
    bindProjectToMembers() {
      console.log("list: " + this.p_members);
      this.p_members.forEach((member) => {
        console.log(member);
        const arrayProjects = member.projects;
        arrayProjects.push(this.projectID);
        member.projects = arrayProjects;

        console.log("array: " + member.projects);
        console.log("id: " + member._id);
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": this.token,
          },
          body: JSON.stringify({
            projects: member.projects,
            password: this.user.password,
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
      });
      this.$router.push({
        name: "Home",
        params: { text: "Project Created", snackbar: true },
      });
    },

    calc() {
      this.totalHours = 0;
      this.p_members.forEach((element) => {
        this.totalHours = this.totalHours + element.weekHours;
      });
    },
  },
};
</script>
