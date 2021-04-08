import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import register from '../views/user/Register.vue'
import login from '../views/user/Login.vue'
import step1 from '../components/Step1.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
    path: '/Create',
    name: 'Create',
    component: step1
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
