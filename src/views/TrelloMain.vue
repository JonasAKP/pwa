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
            newTask: "",
            arrBacklog: [
                {name: "Project name"},
                {name: "new task"},
                {name: "styling page"},
                {name: "doing stuff"},
            ],
            arrInProgress:[],
            arrTested:[],
            arrDone:[]
            }
        },
        methods: {
            add() {
                if(this.newTask){
                    this.arrBacklog.push({name:this.newTask});
                    this.newTask="";
                }
            }
           
        }
    }
</script>
