<template>
  <div class="personal">
    <router-link :to='"/editPersonal/"+UserInfo.id'>
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="UserInfo.head_img" alt='' />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>
            {{UserInfo.nickname}}
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <myCell title="我的关注" message='关注的用户'></myCell>
    <myCell title="我的跟帖" message='跟帖/回复'></myCell>
    <myCell title="我的收藏" message='文章/视频'></myCell>
    <myCell title="设置"></myCell>
    <div class="back">
      <myButton type='back' class="exitBtn" @click="exit">退出</myButton>
      <myButton type='back' class="logOut" @click="logOut">注销</myButton>
    </div>

  </div>
</template>

<script>
import { getUserInfo } from '@/api/user.js'
import myCell from '@/components/myCell.vue'
import myButton from '@/components/myButton.vue'
export default {
  // 数据对象函数
  data () {
    return {
      UserInfo: {},
      URL: '/editPersonal/'
    }
  },
  // 组件加载完毕钩子函数
  mounted () {
    // 在跳转到个人中心页时获取当前用户的数据并填充到页面上
    let id = this.$route.params.id
    getUserInfo(id)
      .then((res) => {
        if (res.data.message === '获取成功') {
          // 将返回的用户数据存到UserInfo中
          this.UserInfo = res.data.data
          // 处理用户头像,加载用户头像,若用户没有设置则显示默认头像
          if (this.UserInfo.head_img) {
          // 用户头像的路径为基准地址+图片的服务器地址
            this.UserInfo.head_img = localStorage.getItem('baseURL') + this.UserInfo.head_img
          } else {
            this.UserInfo.head_img = localStorage.getItem('baseURL') + '/uploads/image/default.jpg'
          }
        } else {
          this.$toast.fail(res.data.message)
        }
      }).catch((err) => {
        console.log(err)
        this.$toast.fail('服务器正忙,请稍后')
      })
  },
  // 注册组件对象
  components: { myCell, myButton },
  // 事件方法函数对象
  methods: {
    // 退出不注销账号转到首页
    exit () {
      this.$router.push({ name: 'index' })
    },
    // 注销退出到登录页面
    logOut () {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang='less' scoped>
.personal{
    width: 100vw;
    height: 100vh;
    background-color: #eee;
}
a{
    color: #666;
}
.profile {
  display: flex;
  padding: 20px 20px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 90 / 360 * 100vw;
    height: 90 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 20px;
  }

  .name {
    font-size: 18px;
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #ccc;
    font-size: 18px;
    margin-top: 5px;
  }
}
/deep/ .back{
  display: flex;
  margin: 30px auto;
  justify-content: space-evenly;
}
</style>
