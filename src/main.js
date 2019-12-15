import Vue from 'vue'
import App from './App.vue'
// 引入初始化样式
import '@/style/reset.css'
// 引入路由实例
import router from '@/router/index.js'
// 引入vant组件
import { Toast, Uploader, Dialog, Field, Picker } from 'vant'

// 挂载成员
Vue.use(Toast)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Picker)

Vue.config.productionTip = false

new Vue({
  // 将router注入
  router,
  render: h => h(App)
}).$mount('#app')
