import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import register from '../views/user/Register.vue'
import login from '../views/user/Login.vue'
import create from '../views/create.vue'
import TrelloMain from '../views/TrelloMain.vue'
import profile from '../views/user/Profile.vue'
import editProject from '../views/EditProject.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Register',
    name: 'Register',
    component: register
  },
  {
    path: '/Login',
    name: 'Login',
    component: login
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: profile
  },
  {
    path: '/Create',
    name: 'Create',
    component: create
  },
  {
    path: '/TrelloMain',
    name: 'TrelloMain',
    component: TrelloMain
  }, 
  {
    path: '/EditProject',
    name: 'EditProject',
    component: editProject
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
