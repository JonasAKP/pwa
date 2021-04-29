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
    <v-dialog
      v-model="showModal"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="green lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
        Edit
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
        Task Description
        </v-card-title>

        <v-card-text>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="showModal = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
                </v-card>
                </draggable>
            </v-card>
            <v-spacer></v-spacer>

             <v-card class="col-md-2 yellow lighten-4">
                <h3>In progress</h3>
                <draggable class="list-group" :list="arrInProgress" group="tasks">

 <div v-for="item in arrBacklog" :key="item.id">
            <div v-show="item.toggleIndividual">
              Name: {{ item.name }}
             <button @click="toggleInd(item)">close</button>
            </div>
            <div v-if="!item.toggleIndividual">
              <button @click="toggleInd(item)">open</button>
            </div>
          </div>

             <!--   <v-card style="margin: 10px; padding: 5px" class="list-group-items" v-for="element in arrInProgress" :key="element.name">
                    {{element.name}}
                </v-card> -->
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

        <div>
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
            dialog: false,
            showModal:false,
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
