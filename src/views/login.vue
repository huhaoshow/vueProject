<template>
<div id="app">
  <div class="container">
    <div class="close"><span class="iconfont iconicon-test"></span></div>
    <div class="logo"><span class="iconfont iconnew"></span></div>
    <div class="inputs">
      <myInput type='text' placeholder='用户名/手机号' v-model="user.username"
  :rules='/^1\d{10}$/' err_msg='用户名格式错误'></myInput>
      <myInput type='password' v-model="user.password"></myInput>
    </div>
    <p class="tips">没有账号？<a href="#/register" class="">去注册</a></p>
    <myButton type='login' @click='login'>登录</myButton>
    </div>
  </div>
</template>

<script>
// 引入子组件
import myButton from '@/components/myButton.vue'
import myInput from '@/components/myInput.vue'
// 引入api接口
import { userLogin } from '@/api/user.js'

export default {
  // 数据对象函数
  data () {
    return {
      user: {
        username: '10086',
        password: '123'
      }
    }
  },
  // 注册组件对象
  components: {
    myButton, myInput
  },
  // 事件处理函数对象
  methods: {
    login () {
      // 发请求验证信息是否正确
      userLogin(this.user)
        .then((res) => {
          // 如果验证成功,页面跳转到个人中心页并将token值存入,否则提示用户名不存在
          if (res.data.message === '登录成功') {
            console.log(res)
            localStorage.setItem('token', res.data.data.token)
            this.$router.push({ path: `/personal/${res.data.data.user.id}` })
          } else if (res.data.message === '用户不存在') {
            this.$toast.fail(res.data.message)
          }
          // 发请求失败则提示服务器正忙
        }).catch((err) => {
          console.log(err)
          this.$toast.fail('服务器正忙,请稍后')
        })
    }
  }
}
</script>

<style lang='less'>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
