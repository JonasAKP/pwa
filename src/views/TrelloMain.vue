<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col form-inline">
            <v-input dark v-model="newTask" placeholder="Enter Task" v-on:keyup.enter="add"></v-input> 
            </div>
          </div>
          <div class="row">
              <div class="col-md-3">
                  <div class="p-2 alert alert-secondary">
                <h3>Backlog</h3>
                <draggable class="list-group" :list="arrBacklog" group="tasks">
                <div class="list-group-items" v-for="element in arrBacklog" :key="element.name">
                    {{element.name}}
                </div>
                </draggable>
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
