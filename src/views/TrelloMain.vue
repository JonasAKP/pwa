<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col form-inline" style="padding-left:0px">
            <input style="border:black solid 1px" v-model="newTask" placeholder="Enter Task" v-on:keyup.enter="add">
            <v-btn style="height: 28px; margin: 10px" color="primary" @click="add">New task</v-btn> 
            </div>
          </div>
          <div class="row mt-3">
              <v-card class="col-md-2 red lighten-4">
                <h3>Backlog</h3>
                <draggable class="list-group" :list="arrBacklog" group="tasks">
                <v-card style="margin: 10px; padding: 5px" class="list-group-items" v-for="element in arrBacklog" :key="element.name">
                    {{element.name}}
                    <div class="text-center">
                       <v-btn small text >
                    <v-icon @click="editItem(element)" @click.stop="dialog = true">edit</v-icon> <!-- 2: edit onclick modal -->
                  </v-btn>
            </div>
              </v-card>
                </draggable>
            </v-card>
            <v-spacer></v-spacer>

             <v-card class="col-md-2 yellow lighten-4">
                <h3>In progress</h3>
                <draggable class="list-group" :list="arrInProgress" group="tasks">
                  
                  <v-card style="margin: 10px; padding: 5px" class="list-group-items" v-for="element in arrInProgress" :key="element.name">
                 {{element.name}}
                </v-card> 
                </draggable>
            </v-card>
            <v-spacer></v-spacer>

             <v-card class="col-md-2 blue lighten-4">
                <h3>Tested</h3>
                <draggable class="list-group" :list="arrTested" group="tasks">
                <v-card style="margin: 10px; padding: 5px" class="list-group-items" v-for="element in arrTested" :key="element.name">
                    {{element.name}}
                </v-card>
                </draggable>
            </v-card>
            <v-spacer></v-spacer>

             <v-card class="col-md-2 green lighten-4">
                <h3>Done</h3>
                <draggable class="list-group" :list="arrDone" group="tasks">
                <v-card style="margin: 10px; padding: 5px" class="list-group-items" v-for="element in arrDone" :key="element.name">
                    {{element.name}}
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
      <v-dialog
        v-model="dialog"
        max-width="400"
      >
        <v-card>
        <div class="pa-5">
            <v-text-field autofocus v-model="item.name"></v-text-field>
            <v-text-field autofocus v-model="item.description"></v-text-field>
            <v-btn
              color="complete"
              @click="updateItem()"
              @click.stop="dialog = false"
            >
             Edit
            </v-btn>
            <v-btn
              color="incomplete"
              @click="dialog = false"  
            >  <!-- 4: Edit stuff: add onclick to close it -->
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
        components:{
            draggable
        },
        data(){
            return{
            
        updatedSuccess: false,
        updatedItem: 'Tasks has been updated',
        dialog: false,  // 3: edit - modal box
        activeEditItem: null, // 5 storing id to use with edit
        item: [] // 4 : Edit add to store for edit data//
        ,
            newTask: "",
            arrBacklog: [
                {name: "Project name", toggleIndividual: false},
                {name: "New task", toggleIndividual: false},
                {name: "Styling page", toggleIndividual: false},
                {name: "Doing stuff", toggleIndividual: false},
            ],
            arrInProgress:[],
            arrTested:[],
            arrDone:[]
            }
        },
        methods: {
          editItem(item) {
        this.item = item;
        this.activeEditItem = item.id;
        },
        updateItem() {console.log("edit later")},
           toggleInd(item){
          item.toggleIndividual = !item.toggleIndividual;
        },
            add() {
                if(this.newTask){
                    this.arrBacklog.push({name:this.newTask});
                    this.newTask="";
                }
            }
           
        }
    }
</script>
