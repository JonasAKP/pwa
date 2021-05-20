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

        <!-- Second page -->
        <v-stepper-step :complete="e1 > 2" step="2">
          Project Tasks
        </v-stepper-step>

        <v-divider></v-divider>

        <!-- Third page -->
        <v-stepper-step :complete="e1 > 3" step="3">
          Management
        </v-stepper-step>

        <v-divider></v-divider>

        <!-- Fourth page -->
        <v-stepper-step step="4"> Create </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <!-- Content of the first step starts here -->
        <v-stepper-content step="1">
          <!-- checks if all content rules are validated -->
          <v-form v-model="valid">

            <v-row>
              <v-col>
                <v-form>
                  <h2>Project</h2>

                  <v-col cols="12" sm="6">
                    <!-- normal text field. the rules are linked down below, but restricts what the field can do -->
                    <v-text-field
                      type="text"
                      v-model="project"
                      :rules="rules"
                      label="Project Name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-textarea
                      type="text"
                      v-model="description"
                      :rules="rules"
                      label="Project Description"
                      required
                    ></v-textarea>
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
                        type="text"
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
                        type="text"
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
                    required
                  ></v-text-field>
                </v-col>
              </v-col>

              <v-col>
                <h2>Stakeholder</h2>

                <v-col cols="12" sm="6">
                  <v-text-field
                    type="text"
                    v-model="stake"
                    :rules="names"
                    label="Stakeholder/partners"
                    required
                  ></v-text-field>
                </v-col>

                <br />
                <br />
                <h2>Members</h2>
                <v-col cols="12" sm="6">
                  <v-text-field
                    type="text"
                    v-model="leader"
                    :rules="names"
                    label="Project Leader"
                    required
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
                
              "
            >
              Continue
            </v-btn>

            <v-btn text to="/"> Cancel </v-btn>
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="2">
          <!-- Content here -->
          <v-form v-model="isFormValid">
            <v-row>
              <v-col cols="12" md="5">
                <v-row style="margin: 0">
                  <v-text-field
                    @keydown.enter.prevent="add()"
                    type="text"
                    v-model="newTask"
                    :rules="tasks"
                    placeholder="Enter Task"
                  ></v-text-field>

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
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-form v-model="isThreeValid" v-on:submit.prevent>
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
                  <v-col cols="12" sm="5">
                    <h4>Cloud location</h4>
                    <v-text-field
                      type="text"
                      style="width: 200px"
                      v-model="cloud"
                      :rules="rules"
                      label="Upload location"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="5" offset="md-2">
                    <h4>Github Repository</h4>
                    <v-text-field
                      type="text"
                      style="width: 200px"
                      v-model="github"
                      :rules="rules"
                      label="Github location"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="5">
                    <v-row>
                      <v-form
                        v-model="isTechValid"
                        @keydown.enter.prevent="addTech()"
                      >
                        <v-text-field
                          @keydown.enter.prevent="addTech()"
                          type="text"
                          style="margin: 0 0 0 10px"
                          :rules="tasks"
                          v-model="newTask"
                          placeholder="Technologies"
                        ></v-text-field>
                      </v-form>
                      <v-btn
                        @keydown.enter.prevent="addTech()"
                        :disabled="!isTechValid"
                        style="margin: 15px"
                        color="primary"
                        @click="addTech"
                      >
                        Add
                      </v-btn>
                    </v-row>
                    <v-card
                      @keydown.enter.prevent="addTech()"
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
    // Validates v and checks if v is true. also checks if the length is true on most fields. there is also regular expressions that checks if the fields contains everything else then a-Z 0-9 and nordic characters
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
    e1: 1,
  }),
  //checks if the user is logged in. if not, redirected to login
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

  
    // pushes data into an array called taskBacklog
    add()  {
      if (this.newTask) {
        this.taskBacklog.push({ name: this.newTask });
        this.newTask = "";
        // should have a regEx here
      }
      
    },
    // pushes into techsUsed
    addTech() {
      if (this.newTask) {
        this.techsUsed.push({ name: this.newTask });
        this.newTask = "";
      }
    },
    // removes items from an array
    removeA(index) {
      this.taskBacklog.splice(index, 1);
    },
    // creates project by taking the v-model data and arrays of the steps and pushes them into the db
    createProject() {
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
    // binds the current project to a user and is used in createProject
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
    // gets the logged in user
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

    // takes our current task list array and pushes them individually to an db entry and gets and id back for each task, then executes bind project to members
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

    //gets all users current in the database. is used for a dropdown where you can pick between registered users
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
              console.log(this.allMembers);
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
    // binds task to project
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
    // binds the project to the members selected
    bindProjectToMembers() {
      this.p_members.forEach((member) => {
        const arrayProjects = member.projects;
        arrayProjects.push(this.projectID);
        member.projects = arrayProjects;
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

    // calculates the total ammount of hours available 
    calc() {
      this.totalHours = 0;
      this.p_members.forEach((element) => {
        this.totalHours = this.totalHours + element.weekHours;
      });
    },
  }
}

</script>
