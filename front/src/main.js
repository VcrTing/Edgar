
import Vue from 'vue'

import App from './App'

import store from './common/store'
import router from './common/router'
import i18n from './common/plugin/i18n'

import net from './air/net/index'
import conf from './conf'
import serv from './serv/serv'
import view from '@/air/es/view'
import validate from '@/air/es/validate'

Vue.prototype.net = net
Vue.prototype.serv = serv
Vue.prototype.conf = conf

Vue.prototype.view = view
Vue.prototype.vid = validate

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
