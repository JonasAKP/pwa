<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col form-inline" style="padding-left:0px">
            <input style="border:black solid 1px" v-model="newTask" placeholder="Enter Task" v-on:keyup.enter="add">
            <v-btn style="height: 28px; margin: 10px" color="primary" @click="add">New task</v-btn> 
            </div>
          </div>
          <div class="row mt-3">
              <v-card class="col-md-2">
                  <div class="p-2 alert alert-secondary">
                <h3>Backlog</h3>
                <draggable class="list-group" :list="arrBacklog" group="tasks">
                <div class="list-group-items" v-for="element in arrBacklog" :key="element.name">
                    {{element.name}}
                </div>
                </draggable>
                </div>
            </v-card>


             <v-card class="col-md-2">
                  <div class="p-2 alert alert-primary">
                <h3>In progress</h3>
                <draggable class="list-group" :list="arrInProgress" group="tasks">
                <div class="list-group-items" v-for="element in arrInProgress" :key="element.name">
                    {{element.name}}
                </div>
                </draggable>
                </div>
            </v-card>


             <v-card class="col-md-2">
                  <div class="p-2 alert alert-secondary">
                <h3>Tested</h3>
                <draggable class="list-group" :list="arrTested" group="tasks">
                <div class="list-group-items" v-for="element in arrTested" :key="element.name">
                    {{element.name}}
                </div>
                </draggable>
                </div>
            </v-card>


             <v-card class="col-md-2">
                  <div class="p-2 alert alert-secondary">
                <h3>Done</h3>
                <draggable class="list-group" :list="arrDone" group="tasks">
                <div class="list-group-items" v-for="element in arrDone" :key="element.name">
                    {{element.name}}
                </div>
                </draggable>
                </div>
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
