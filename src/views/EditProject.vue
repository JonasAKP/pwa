<template>
  <div>
    <v-container>
      <v-col cols="12">
        <v-card style="padding: 15px">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col md="12">
                <v-text-field
                  v-model="project.name"
                  label="Name"
                  required
                ></v-text-field>

                <v-textarea
                  v-model="project.description"
                  label="Description"
                  required
                ></v-textarea>
              </v-col>
              <v-col md="4">
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
                      v-model="project.timeEnd"
                      label="Due Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      required
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="project.timeEnd"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col md="4">
                <v-text-field
                  v-model="project.duration"
                  label="Hours Allocated"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col md="4">
                <v-select
                  v-model="status"
                  :items="items"
                  label="Status"
                ></v-select>
              </v-col>
              <v-col md="6">
                <v-text-field
                  v-model="project.github"
                  label="Github"
                  required
                ></v-text-field>
              </v-col>
              <v-col md="6">
                <v-text-field
                  v-model="project.cloud"
                  label="Cloud"
                  required
                ></v-text-field>
              </v-col>
              <v-col md="12">
                <v-checkbox
                  v-model="checkbox"
                  :rules="[(v) => !!v || 'You must agree to continue!']"
                  label="Do you agree?"
                  required
                ></v-checkbox>
              </v-col>
              <v-col md="12">
                <v-row style="height: 60px; margin: 0px">
                  <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="validate"
                  >
                    Update
                  </v-btn>

                  <v-btn to="/" class="mr-4">Back</v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      checkbox: false,
      project: null,
      user: null,
      token: null,
      menu: false,
      status: null,
      items: ["Ongoing", "Done", "On Hold", "Cancelled"],
    };
  },

  // run when page is created and check if the user are logged in.
  //checks if user and token is set in session
  // grabs data from other view and sets them
  created() {
    this.token = sessionStorage.getItem("user_token");
    this.userID = sessionStorage.getItem("user_id");
    if (this.token == null && this.userID == null) {
      this.$router.push("Login");
    } else {
      this.project = this.$route.params.project;
      this.status = this.project.status;

      if (!this.project) {
        alert("No Project Found");
        this.$router.push("/");
      }
    }
  },
  methods: {
    //validate user inputs
    validate() {
      if (this.$refs.form.validate()) {
        this.updateProject();
      }
    },
    //Updates current project in Database
    updateProject() {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": this.token,
        },
        body: JSON.stringify({
            name: this.project.name,
            description: this.project.description,
            timeEnd: this.project.timeEnd,
            duration: this.project.duration,
            cloud: this.project.cloud,
            github: this.project.github,
            status: this.status
        }),
      };
      fetch(
        "https://rest-api-pwa.herokuapp.com/api/projects/" + this.project._id,
        requestOptions
      )
        .then((response) => {
          if (response.ok) {
            this.$router.push({
              name: "Home",
              params: { text: "Project has been Updated", snackbar: true },
            });
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
  },
};
</script>

<style lang="scss" scoped>
</style>