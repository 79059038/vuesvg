import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button, Select} from 'element-ui'
import axios from 'axios'

const axiosInstall = axios.create({
  timeout: 1000
})
Vue.prototype.$axios = axiosInstall

Vue.config.productionTip = false

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
