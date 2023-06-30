import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import PageIndex  from '../views/navegation/PageIndex.vue'
import PageWhite  from '../views/PageWhite.vue'
import PageLogin  from '../views/session/PageLogin.vue'
import PageHome   from '../views/navegation/PageHome.vue'
import AddTrabajador from '../views/workers/AddTrabajador.vue'
import listTrabajadores from '../views/workers/ListTrabajadores.vue'

const routes = [
  /*{
    path: '/',
    name: 'home',
    component: HomeView
  },*/
  {
    path: '/',
    name: 'index',
    component: PageIndex
  },
  {
    path: '/about',
    name: 'about',
    component: PageWhite
  },
  {
    path: '/login',
    name: 'login',
    component: PageLogin
  },
  {
    path: '/home',
    name: 'home',
    component: PageHome
  },
  {
    path: '/addTrabajador',
    name: 'addTrabajador',
    component: AddTrabajador
  },
  {
    path: '/listTrabajadores',
    name: 'listTrabajadores',
    component: listTrabajadores
  }/*,
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about"  '../views/AboutView.vue')
  }*/
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
