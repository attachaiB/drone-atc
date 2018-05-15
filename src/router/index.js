import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index/Index'
import Login from '@/components/Authen/Login'
import Regis from '@/components/Index/Regis'
import Adminbar from '@/components/Admin/Adminbar'
import Googlemap from '@/components/Index/Googlemap'
import Mnguser from '@/components/Admin/Mnguser'
import Mappage from '@/components/Index/Mappage'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Index },
    { path: '/login', component: Login, meta: { requiresAuth: true } },
    { path: '/user', component: Mappage, meta: { requiresAuthUser: true } },
    { path: '/regis', component: Regis, meta: { requiresAuth: true } },
    { path: '/adpage', component: Adminbar, children: [{ path: '/adpage', component: Googlemap }, { path: '/tabuser', component: Mnguser }], meta: { requiresAuthAdmin: true } }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((x) => x.meta.requiresAuthAdmin)) {
    if (window.$cookies.isKey('username')) {
      if (atob(window.$cookies.get('username')).replace(/"/g, '') !== 'Admin') {
        next({ path: '/' })
      } else {
        next()
      }
    } else {
      next({ path: '/login' })
    }
    return
  }
  next()
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((x) => x.meta.requiresAuthUser)) {
    if (window.$cookies.isKey('username')) {
      if (atob(window.$cookies.get('username')).replace(/"/g, '') !== 'User') {
        next({ path: '/' })
      } else {
        next()
      }
    } else {
      next({ path: '/login' })
    }
    return
  }
  next()
})

export default router
