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
    component: () => import('../views/invest/Invest.vue'),
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
        component: () => import('../views/AboutUs/aboutus.vue')
      },
      {
        path: '/information',
        component: () => import('../views/home/Home.vue')
      },
      {
        path: '/invest',
        component: () => import('../views/invest/Invest.vue')
      },
      {
        name:"InvestDetails",
        path: '/InvestDetails',
        component: () => import('../views/invest/InvestDetails.vue')
      },
      {
        path: '/borrowing',
        component: () => import('../views/home/Home.vue')
      },
      {
        path: '/account',
        component: () => import('../views/about/About.vue')
      },
      {
        path: '/aboutus',
       
        children:[
          {
            path: '/mag',
            component: () => import('../views/AboutUs/mag.vue')
          },
          {
            path: '/img',
            component: () => import('../views/AboutUs/img.vue')
          },
          {
            path: '/news', 
            component: () => import('../views/AboutUs/news.vue'),
           
          },
          {
            path: '/news1',
            component: () => import('../views/AboutUs/news1.vue')
          },
          {
            path: '/com', 
            component: () => import('../views/AboutUs/communique.vue'),
           
          },
          {
            path: '/com1', 
            component: () => import('../views/AboutUs/com1.vue'),
         
          },{
            path: '/contact', 
            component: () => import('../views/AboutUs/contact.vue'),
          
          },
          
        ],
        component: () => import('../views/AboutUs/aboutus.vue')
        
        
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

// router.beforeEach((to, from, next) => {
//   if (to.path === "/login") return next();

//   const tokenStr = window.sessionStorage.getItem("token");

//   if (!tokenStr) return next('/login');

//   next();
// })

export default router
