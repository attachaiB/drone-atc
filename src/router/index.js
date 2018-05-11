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

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Index },
    { path: '/login', component: Login },
    { path: '/user', component: Mappage },
    { path: '/regis', component: Regis },
    { path: '/adpage', component: Adminbar, children: [{ path: '/adpage', component: Googlemap }, { path: '/tabuser', component: Mnguser }] }
  ]
})
