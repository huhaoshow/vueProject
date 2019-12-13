<template>
<div class="login">
  <myInput type='text' placeholder='用户名/手机号' v-model="user.userName"
  :rules='/^1\d{10}$/' err_msg='用户名格式错误'></myInput>
  <myInput type='password' v-model="user.userPwd"></myInput>
  <div class="loginBtn">
    <myButton type='login' @click='login'>登录</myButton>
  </div>
</div>
</template>

<script>
import myButton from '@/components/myButton.vue'
import myInput from '@/components/myInput.vue'
export default {
  // 数据对象函数
  data () {
    return {
      user: {
        userName: '15270659539',
        userPwd: '1596321'
      }
    }
  },
  // 注册组件对象
  components: {
    myButton, myInput
  },
  // 事件处理函数对象
  methods: {
    login (data) {

    }
  }
}
</script>

<style lang='less'>

</style>
