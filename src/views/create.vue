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
                      v-model="projects"
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
                    :rules="rules"
                    label="Stakeholder/partners"
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
                    v-for="(member, index) in p_members"
                    :key="index"
                    v-model="member.name"
                    :label="member.label"
                  >
                  </v-text-field>
                </v-col>
              </v-col>
            </v-row>

            <v-btn
              :disabled="valid"
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
                <v-text-field
                  :rules="rules"
                  v-model="newTask"
                  placeholder="Enter Task"
                  v-on:keyup.enter="add"
                ></v-text-field>
                <v-btn style="margin: 15px" color="primary" @click="add">
                  Add
                </v-btn>
              </v-row>
              <v-row style="margin 0">
                <v-card class="col-md-12" flat>
                  <h3>Tasks</h3>
                  <v-card
                    :rules="arrCheck"
                    style="margin: 10px; padding: 5px"
                    class="list-group-items"
                    v-for="(element, index) in arrBacklog"
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
            <v-col>
              <!-- <v-checkbox
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
              ></v-checkbox> -->
            </v-col>
          </v-row>
          <!-- Content ends here -->

          <v-btn color="primary" @click="(e1 = 3)"> Continue </v-btn>

          <v-btn text to="/"> Cancel </v-btn>

          <v-btn color="primary" @click="e1 = 1"> Back </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-row>
            <v-col class="col-sm-6">
              <v-row>
                <v-col class="col-sm-4">
                  <h4>Project Members</h4>
                  <v-radio-group>
                    <v-radio
                      :value="member.name"
                      v-for="member in p_members"
                      :key="member.name"
                      :label="member.name"
                    >
                    </v-radio>
                  </v-radio-group>
                </v-col>

                <v-col class="col-sm-4">
                  <v-text-field
                    label="Tasks"
                    style="padding: 0px"
                    class="my-10"
                  ></v-text-field>
                  <v-text-field
                    style="padding: 0px"
                    type="number"
                    label="Hours"
                    :rules="hours"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-simple-table style="text-align: center; margin: 30px">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Tasks</th>
                        <th class="text-left">Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="member in p_members" :key="member.name">
                        <td>{{ member.name }}</td>
                        <td>{{ member.role }}</td>
                        <td>{{ member.hours }}</td>
                      </tr>
                      <tr>
                        <td>Total hours</td>
                        <td></td>
                        <td>{{ totalHours }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-row>
            </v-col>

            <v-col class="col-sm-6">
              <v-row>
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
                <v-col cols="12" sm="5">
                  <v-row>
                    <v-text-field
                      style="margin: 0 0 0 10px"
                      :rules="rules"
                      v-model="newTask"
                      placeholder="Technologies"
                      v-on:keyup.enter="add"
                    ></v-text-field>
                    <v-btn
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

          <v-btn color="primary" @click="e1 = 4"> Continue </v-btn>

          <v-btn text to="/"> Cancel </v-btn>

          <v-btn color="primary" @click="e1 = 2"> Back </v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card height="300px" flat>
            <h2 style="text-align: center">Project id</h2>
            <div style="text-align: center">
              <v-btn color="success">Create</v-btn>
            </div>
          </v-card>

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
    startDate: null, // fix later
    endDate: null, // fix later
    hour: null, // fix later
    stake: null,
    members: null,
    leader: null,
    p_members: {
      member1: {
        label: "Member 1",
        role: "QA",
        name: "John",
        hours: 30,
      },
      member2: {
        label: "Member 2",
        role: "Lead Dev",
        name: "Silvia",
        hours: 40,
      },
      member3: {
        label: "Member 3",
        role: "Developer",
        name: "Jane",
        hours: 60,
      },
      member4: {
        label: "Member 4",
        role: "QC",
        name: "Smith",
        hours: 10,
      },
      member5: {
        label: "Member 5",
        role: "Debugger",
        name: "Brian",
        hours: 5,
      },
    },
    newTask: null,
    selected: null,
    cloud: null,
    github: null,
    totalHours: 0,
    //array for keeping data
    arrBacklog: [],
    techsUsed: [],
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
    arrCheck: [(arrBacklog) => arrBacklog && arrBacklog.length >= 0],
    techCheck: [(techsUsed) => techsUsed && techsUsed.length >= 0],
    e1: 1,
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    add() {
      if (this.newTask) {
        this.arrBacklog.push({ name: this.newTask });
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
      this.arrBacklog.splice(index, 1);
    },
    // calc() {
    //   this.p_members.forEach((element) => {
    //     this.totalHours =+ element.hours;
    //     console.log(this.totalHours);
    //   });
    // },
  },
};
</script>
