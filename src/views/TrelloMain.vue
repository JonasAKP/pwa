<template>
  <div class="container mt-5">
    <h1> {{ project.name }} </h1>
    <div class="row">
      <div class="col form-inline" style="padding-left: 0px">
        <v-dialog
          v-model="dialog2"
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <div class="pa-5">
              <v-text-field v-model="item1.name" label="Name"></v-text-field>
              <v-text-field
                v-model="item1.description"
                label="Description"
              ></v-text-field>
              <v-text-field
                v-model="item1.duration"
                label="Allocated hours"
              ></v-text-field>
              <v-text-field
                v-model="item1.assigned"
                label="Assigned member"
              ></v-text-field>
              <v-select
                :items="arrPriority"
                v-model="item1.priority"
                label="Priority"
              ></v-select>
              <v-btn
                style="margin: 5px"
                color="green lighten-2"
                @click="createTask(item1)"
                @click.stop="dialog2 = false"
              >
                Add
              </v-btn>
              <v-btn
                style="margin: 5px"
                color="red lighten-1"
                @click="dialog2 = false"
              >
                <!-- 4: Edit stuff: add onclick to close it -->
                Cancel
              </v-btn>
            </div>
          </v-card>
        </v-dialog>
        <v-btn
          style="height: 28px; margin: 10px"
          color="primary"
          @click="dialog2 = true"
          >New task</v-btn
        >
      </div>
    </div>

    <div class="row mt-3">
      <v-card class="col-md-2 red lighten-4">
        <h3>Backlog</h3>
        <draggable class="list-group" :list="arrBacklog" group="tasks" @change="backlogChange">
          <v-card
            style="margin: 10px; padding: 5px"
            class="list-group-items"
            v-for="element in arrBacklog"
            :key="element.name"
          >
            <div>
              {{ element.name }}
              <div class="text-end">
                <v-btn @click="editItem(element)" @click.stop="dialog = true">
                  Edit<!-- 2: edit onclick modal -->
                </v-btn>
              </div>
            </div>
          </v-card>
        </draggable>
      </v-card>
      <v-spacer></v-spacer>

      <v-card class="col-md-2 yellow lighten-4">
        <h3>In progress</h3>
        <draggable class="list-group" :list="arrInProgress" group="tasks" @change="inProgressChange">
          <v-card
            style="margin: 10px; padding: 5px"
            class="list-group-items"
            v-for="element in arrInProgress"
            :key="element.name"
          >
            <div>
              {{ element.name }}
              <div class="text-end">
                <v-btn @click="editItem(element)" @click.stop="dialog = true">
                  Edit
                  <!-- 2: edit onclick modal -->
                </v-btn>
              </div>
            </div>
          </v-card>
        </draggable>
      </v-card>
      <v-spacer></v-spacer>

      <v-card class="col-md-2 blue lighten-4">
        <h3>Tested</h3>
        <draggable class="list-group" :list="arrTested" group="tasks" @change="testedChange">
          <v-card
            style="margin: 10px; padding: 5px"
            class="list-group-items"
            v-for="element in arrTested"
            :key="element.name"
          >
            <div>
              {{ element.name }}
              <div class="text-end">
                <v-btn @click="editItem(element)" @click.stop="dialog = true">
                  Edit
                  <!-- 2: edit onclick modal -->
                </v-btn>
              </div>
            </div>
          </v-card>
        </draggable>
      </v-card>
      <v-spacer></v-spacer>

      <v-card class="col-md-2 green lighten-4">
        <h3>Done</h3>
        <draggable class="list-group" :list="arrDone" group="tasks" @change="doneChange">
          <v-card
            style="margin: 10px; padding: 5px"
            class="list-group-items"
            v-for="element in arrDone"
            :key="element.name"
          >
            <div>
              {{ element.name }}
              <div class="text-end">
                <v-btn @click="editItem(element)" @click.stop="dialog = true">
                  Edit
                  <!-- 2: edit onclick modal -->
                </v-btn>
              </div>
            </div>
          </v-card>
        </draggable>
      </v-card>
    </div>

    <!--         <div>
          <h1>open close</h1>
          
          <div v-for="item in arrBacklog" :key="item.id">
            <div v-show="item.toggleIndividual">
              Name: {{ item.name }}
             <button @click="toggleInd(item)">close</button>
            </div>
            <div v-if="!item.toggleIndividual">
              <button @click="toggleInd(item)">open</button>
            </div>
          </div>
        </div> -->
    <div>
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <div class="pa-5">
            <v-text-field v-model="item.name" label="Name"></v-text-field>
            <v-text-field
              v-model="item.description"
              label="Description"
            ></v-text-field>
            <v-text-field
              v-model="item.duration"
              label="Allocated hours"
            ></v-text-field>
            <v-text-field
              v-model="item.assigned"
              label="Assigned member"
            ></v-text-field>
            <v-select
              :items="arrPriority"
              v-model="item.priority"
              label="Priority"
            ></v-select>
            <v-btn
              style="margin: 5px"
              color="green lighten-2"
              @click="updateItem(item)"
              @click.stop="dialog = false"
            >
              Edit
            </v-btn>
            <v-btn
              style="margin: 5px"
              color="red lighten-1"
              @click="dialog = false"
            >
              <!-- 4: Edit stuff: add onclick to close it -->
              Cancel
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      arrPriority: ["High", "Medium", "Low"],
      token: null,
      userID: null,
      project: null,
      updatedSuccess: false,
      updatedItem: "Tasks has been updated",
      dialog: false, // 3: edit - modal box
      dialog2: false,
      activeEditItem: null, // 5 storing id to use with edit
      item: [], // 4 : Edit add to store for edit data//
      item1: [],
      newTask: "",
      arrBacklog: [],
      arrInProgress: [],
      arrTested: [],
      arrDone: [],
    };
  },
  created() {
    this.token = sessionStorage.getItem("user_token");
    this.userID = sessionStorage.getItem("user_id");
    if (this.token == null && this.userID == null) {
      this.$router.push("Login");
    }
    this.project = JSON.parse(sessionStorage.getItem("project"));
    window.addEventListener('beforeunload', this.getTasks());
  },
/* watch: {
arrInProgress: {
  deep:true,
  handler(){
    const last = this.arrInProgress[this.arrInProgress.length - 1];
    console.log(last);
  }
} 
}, */

  methods: {
    backlogChange({added}) {
      if(added) {
        added.element.status = "Backlog";
        this.updateStatus(added.element);
      }
    },

  inProgressChange({added}) {
      if(added) {
        added.element.status = "inProgress";
        this.updateStatus(added.element);
      }
    },

    testedChange({added}) {
      if(added) {
        added.element.status = "Tested";
        this.updateStatus(added.element);
      }
    },

    doneChange({added}) {
      if(added) {
        added.element.status = "Done";
        this.updateStatus(added.element);
      }
    },

    createTask(item) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": this.token,
        },
        body: JSON.stringify({
          name: item.name,
          description: item.description,
          duration: item.duration,
          assigned: item.assigned,
          priority: item.priority,
          status: "backlog",
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
            if (response.data) {
              const taskID = response.data[0]._id;
              this.bindTaskToProject(taskID);
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
    bindTaskToProject(taskID){
      const arrayTask = this.project.tasks;
      arrayTask.push(taskID);
      this.project.tasks = arrayTask;
       const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": this.token,
        },
        body: JSON.stringify({
          tasks: arrayTask
        }),
      };
      fetch(
        "https://rest-api-pwa.herokuapp.com/api/projects/" + this.project._id,
        requestOptions
      )
        .then((response) => {
          if (response.ok) {
            sessionStorage.setItem("project", JSON.stringify(this.project));
            this.dialog2 = false;
            alert("Task added");
          this.arrBacklog = [];
          this.arrInProgress = [];
          this.arrTested = [];
          this.arrDone = [];
          this.getTasks();
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
    getTasks() {
      this.project.tasks.forEach((taskID) => {
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
                if (
                  response.data.status == "Backlog" ||
                  response.data.status == "backlog"
                ) {
                  this.arrBacklog.push(response.data);
                } else if (
                  response.data.status == "InProgress" ||
                  response.data.status == "inProgress"
                ) {
                  this.arrInProgress.push(response.data);
                } else if (
                  response.data.status == "Tested" ||
                  response.data.status == "tested"
                ) {
                  this.arrTested.push(response.data);
                } else if (
                  response.data.status == "Done" ||
                  response.data.status == "done"
                ) {
                  this.arrDone.push(response.data);
                }
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
    editItem(item) {
      this.item = item;
      this.activeEditItem = item.id;
    },
    updateItem(item) {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": this.token,
        },
        body: JSON.stringify({
          name: item.name,
          description: item.description,
          duration: item.duration,
          assigned: item.assigned,
          priority: item.priority,
          status: item.status
        }),
      };
      fetch(
        "https://rest-api-pwa.herokuapp.com/api/tasks/" + item._id,
        requestOptions
      )
        .then((response) => {
          if (response.ok) {
            this.dialog = false;
            alert("Task Updated");
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

      updateStatus(item) {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": this.token,
        },
        body: JSON.stringify({
          status: item.status
        }),
      };
      fetch(
        "https://rest-api-pwa.herokuapp.com/api/tasks/" + item._id,
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

    toggleInd(item) {
      item.toggleIndividual = !item.toggleIndividual;
    },
    add() {
      if (this.newTask) {
        this.arrBacklog.push({ name: this.newTask });
        this.newTask = "";
      }
    },
  },
};
</script>
