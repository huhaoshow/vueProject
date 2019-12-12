import Vue from 'vue'
import App from './App.vue'
// 引入初始化样式
import '@/style/reset.css'
// 引入Toast轻提示
import { Toast } from 'vant'
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
