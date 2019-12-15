<template>
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <myInput
        class="inp"
        placeholder='请输入用户名/手机号'
        v-model='userInfo.username'
        :rules='/^1\d{10}$/'
        msg_err='手机号输入不合法，请输入11位手机号'
        ></myInput>
        <myInput class="inp" type='password' v-model="userInfo.password" placeholder='请输入密码'></myInput>
        <myInput class="inp"  v-model="userInfo.nickname" placeholder='请输入昵称'></myInput>
      </div>
      <p class="tips">
        已有账号？
       <router-link to="/login">去登录</router-link>
      </p>
      <myButton type='register' @click='register'>注册</myButton>
    </div>
  </div>
</template>

<script>
// 引入子组件
import myButton from '@/components/myButton.vue'
import myInput from '@/components/myInput.vue'
// 引入api接口
import { userRegister } from '@/api/user.js'
export default {
// 数据函数对象
  data () {
    return {
      userInfo: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  // 注册组件对象
  components: { myButton, myInput },
  // 事件处理函数对象
  methods: {
    async register () {
      console.log(this.userInfo)
      if (this.userInfo.username && this.userInfo.password && this.userInfo.nickname) {
        let res = await userRegister(this.userInfo)
        if (res.status === 200) {
          // 提示并跳转到登录页面
          this.$toast.success(res.data.message)
          this.$router.push({ name: 'login' })
        } else {
          this.$toast.fail(res.data.message)
        }
      } else {
        this.$toast.fail('不能空着不填')
      }
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
  .inp {
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
