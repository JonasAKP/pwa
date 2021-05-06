<template>
  <v-container>
    <v-stepper v-model="e1">
      <v-stepper-header>
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
            <v-row>
              <v-col style="margin: 20px 0 20px 0">
                <h2>Project type:</h2>
                <v-radio-group v-model="radios" mandatory>
                  <v-radio label="Rest API - MMD" value="radio-1"></v-radio>
                  <v-radio label="Rest API - PBA" value="radio-2"></v-radio>
                  <v-radio label="Empty Template" value="radio-3"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

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
                      v-model="projects"
                      :rules="rules"
                      label="Project Description"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="id"
                      :rules="rules"
                      label="Project ID (#Number)"
                      required
                    ></v-text-field>
                  </v-col>
                </v-form>
              </v-col>

              <v-col>
                <h2>Time Schedule</h2>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="startDate"
                    :rules="rules"
                    label="Start date"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="endDate"
                    :rules="rules"
                    label="End date"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
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
                    :rules="rules"
                    label="Stakeholder/partners"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="members"
                    :rules="rules"
                    label="Project Members"
                  ></v-text-field>
                </v-col>

                <br />
                <br />
                <h2>Members</h2>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="leader"
                    :rules="rules"
                    label="Project Leader"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="p_members"
                    :rules="rules"
                    label="Project Members"
                  ></v-text-field>
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
            <v-col cols="12" md="6">
              <v-row>
                <v-text-field :rules="rules"></v-text-field>
                <v-btn style="margin: 15px" color="primary"> Add </v-btn>
              </v-row>
            </v-col>
            <v-col>
              <v-checkbox
                v-model="selected"
                label="Report"
                value="Report"
              ></v-checkbox>
              <v-checkbox
                v-model="selected"
                label="Jacob"
                value="Jacob"
              ></v-checkbox>
              <v-checkbox
                v-model="selected"
                label="John"
                value="John"
              ></v-checkbox>
              <v-checkbox
                v-model="selected"
                label="Jacob"
                value="Jacob"
              ></v-checkbox>
              <v-checkbox
                v-model="selected"
                label="John"
                value="John"
              ></v-checkbox>
              <v-checkbox
                v-model="selected"
                label="Jacob"
                value="Jacob"
              ></v-checkbox>
            </v-col>
          </v-row>
          <!-- Content ends here -->

          <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>

          <v-btn text to="/"> Cancel </v-btn>

          <v-btn color="primary" @click="e1 = 1"> Back </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="e1 = 4"> Continue </v-btn>

          <v-btn text to="/"> Cancel </v-btn>

          <v-btn color="primary" @click="e1 = 2"> Back </v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="e1 = 1"> Continue </v-btn>

          <v-btn text to="/"> Cancel </v-btn>

          <v-btn color="primary" @click="e1 = 3"> Back </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  name: "Create",
  data: () => ({
    radios: null, // fix later
    project: null,
    projects: null,
    id: null,
    startDate: 0, // fix later
    endDate: 0, // fix later
    hour: 0, // fix later
    stake: null,
    members: null,
    leader: null,
    p_members: null,
    selected: null,
    //rules start here
    valid: true,
    name: "Rules",
    rules: [
      (v) => !!v || "Is required",
      (v) => (v && v.length >= 5) || "Name must be above than 5 characters",
    ],
    hours: [
      (v) => !!v || "Is required",
      (v) => (v && v.length <= 3) || "Must be below 3 digits",
    ],
    e1: 1,
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>
