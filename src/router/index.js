import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/welcome',
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        component: () => import('../views/home/Home.vue')
      },
      {
        path: '/about',
        component: () => import('../views/about/About.vue')
      },
      {
        path: '/information',
        component: () => import('../views/home/Home.vue')
      },
      {
        path: '/invest',
        component: () => import('../views/about/About.vue')
      },
      {
        path: '/borrowing',
        component: () => import('../views/home/Home.vue')
      },
      {
        path: '/account',
        component: () => import('../views/about/About.vue')
      }
    ],
    component: () => import('../views/login/Welcome.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();

  const tokenStr = window.sessionStorage.getItem("token");

  if (!tokenStr) return next('/login');

  next();
})

export default router
