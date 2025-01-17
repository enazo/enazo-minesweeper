import Vue from 'vue'
import App from './Game'
import _ from 'lodash'

Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')
