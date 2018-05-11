// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'vuetify/dist/vuetify.min.css'
import VueCookies from 'vue-cookies'
import VueSweetAlert from 'vue-sweetalert'

Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.use(VueCookies)
Vue.use(VueSweetAlert)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
