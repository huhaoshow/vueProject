// 这个文件封装了路由模块

// 引入vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'

// 引入需要映射的组件
import Login from '@/views/login.vue'
import Personal from '@/views/Personal.vue'
import EditPersonal from '@/views/EditPersonal.vue'
import Register from '@/views/Register.vue'
import Index from '@/views/Index.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'

// 将vue-router挂载到vue中
Vue.use(VueRouter)

// 创建路由实例
let router = new VueRouter({
  // 配置路由
  routes: [
    {
      // 登录页
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      // 个人中心页
      name: 'personal',
      path: '/personal/:id',
      component: Personal
    },
    {
      // 编辑个人中心页
      name: 'editPersonal',
      path: '/editPersonal/:id',
      component: EditPersonal
    },
    {
      // 注册页面
      name: 'register',
      path: '/register',
      component: Register
    },
    {
      // 首页
      name: 'index',
      path: '/',
      component: Index
    },
    // 详情页
    {
      name: 'articleDetail',
      path: '/articleDetail/:id',
      component: ArticleDetail
    }
  ]
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 如果要跳转的页面需要授权,则进行判断是否有令牌,否则自由跳转
  if (to.path.indexOf('/personal') === 0) {
    let token = localStorage.getItem('token')
    // 如果有令牌则允许其跳转,否则是没有被允许,将其退回到登录页面
    if (token) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

// 暴露路由实例
export default router
