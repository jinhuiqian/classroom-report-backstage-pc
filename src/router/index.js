import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: '/allreports',
        name: 'AllReports',
        component: () => import('../views/AllReports.vue')
      },
      {
        path: '/exceptionreport',
        name: 'ExceptionReport',
        component: () => import('../views/ExceptionReport.vue')
      },
      {
        path: '/data',
        name: 'Data',
        component: () => import('../views/Data.vue')
      },
      {
        path: '/authority',
        name: 'Authority',
        component: () => import('../views/Authority.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0

    if (to.hash) {
      scrollTo = to.hash
    } else if (savedPosition) {
      scrollTo = savedPosition.y
    }
    return goTo(scrollTo)
  },
  routes
})

export default router