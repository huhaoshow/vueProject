// 引入vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'

// 引入需要映射的组件
import Login from '@/views/login.vue'

// 将vue-router挂载到vue中
Vue.use(VueRouter)

// 创建路由实例
let router = new VueRouter({
  // 配置路由
  routes: [
    {
      name: 'first',
      path: '/',
      redirect: { name: 'login' }
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})

// 暴露路由实例
export default router
