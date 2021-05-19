<template>
  <div class="home">
    <h1>Projects</h1>
    <v-btn
      text
      color="yellow darken-2"
      style="padding: 0; margin-bottom: 0; margin-top: 15px"
      to="/create"
    >
      <v-icon
        color="yellow darken-2"
        large
        style="margin-right: 5px; margin-left: 0"
        >mdi-folder-plus</v-icon
      >
      New Project
    </v-btn>
    <v-row>
      <v-col md="7">
        <div v-for="project in this.sortedProjects" :key="project">
          <ProjectFront
            :projectID="project._id"
            :token="token"
            :user="user"
          ></ProjectFront>
        </div>
      </v-col>
      <v-col md="5">
        <v-card style="margin-top: 15px; padding: 20px">
          <v-row>
            <v-col md="6">
              <v-row style="padding-top: 10px">
                <div style="padding-left: 15px">
                  <v-card-title id="title1" style="padding: 0"
                    >Search By Name</v-card-title
                  >
                  <v-text-field
                    class="searchField"
                    append-icon="mdi-magnify"
                    v-model="searchField"
                  ></v-text-field>
                </div>
              </v-row>
              <v-row>
                <v-radio-group
                  style="padding-left: 15px"
                  v-model="radio"
                  label="Sort By"
                >
                  <v-radio value="status" label="status"></v-radio>
                  <v-radio value="date" label="date"></v-radio>
                  <v-radio value="name" label="name"></v-radio>
                </v-radio-group>
              </v-row>
            </v-col>
            <v-col md="4">
              <v-row>
                <div>
                  <v-card-title> {{ user.name }} </v-card-title>
                  <v-card-subtitle>
                    {{ user.email }}
                  </v-card-subtitle>
                </div>
              </v-row>

              <v-row>
                <div class="mt-9 ml-5">
                  <p>Weekly Hours: {{ user.weekHours }}</p>
                  <v-progress-linear
                    :value="user.weekHours"
                  ></v-progress-linear>
                </div>
              </v-row>
            </v-col>
            <v-col md="2">
              <v-btn to="/profile" text rounded color="yellow darken-2" 
                ><v-icon x-large>mdi-pencil </v-icon>
              </v-btn></v-col
            >
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
// @ is an alias to /src
import ProjectFront from "../components/ProjectFront";
export default {
  name: "Home",
  data: () => ({
    token: null,
    userID: null,
    user: null,
    radio: null,
    searchField: "",
    text: null,
    snackbar: false,
    fullProjects: [],
    sortedProjects: [],
  }),
  components: {
    ProjectFront,
  },
  created() {
    this.token = sessionStorage.getItem("user_token");
    this.userID = sessionStorage.getItem("user_id");
    if (this.token == null && this.userID == null) {
      this.$router.push("Login");
    } else {
      this.getUser();
    }
    this.text = this.$route.params.text;
    this.snackbar = this.$route.params.snackbar;
  },

  watch: {
    searchField: function () {
      this.sortedProjects = this.fullProjects.filter((project) => {
        return project.name
          .toLowerCase()
          .includes(this.searchField.toLowerCase());
      });
    },

    radio: function () {
      console.log(this.sortedProjects);
      if (this.radio == "name") {
        this.sortedProjects.sort(function (a, b) {
          var x = a.name.toLowerCase();
          var y = b.name.toLowerCase();

          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          console.log("øh2222?");
          return 0;
        });
      } else if (this.radio == "date") {
        this.sortedProjects.sort(function (a, b) {
          var x = a.timeEnd.toLowerCase();
          var y = b.timeEnd.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
      } else if (this.radio == "status") {
        this.sortedProjects.sort(function (a, b) {
          var x = a.status.toLowerCase();
          var y = b.status.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
      }
    },
  },
  methods: {
    getFullProjects() {
      this.user.projects.forEach((projectID) => {
        fetch("https://rest-api-pwa.herokuapp.com/api/projects/" + projectID, {
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
                const project = response.data;
                this.fullProjects.push(project);
                this.sortedProjects = this.fullProjects;
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
              this.getFullProjects();
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
  },
};
</script>

<style lang="scss" scoped>
#title1 {
  color: lightgrey;
}

.searchField {
  border: black solid 1px;
  border-radius: 10px;
  padding: 0 5px;
}

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

.home {
  padding: 20px;
}
</style>
