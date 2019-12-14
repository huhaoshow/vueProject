<template>
  <div class="personal">
    <router-link to="/edit_profile">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="currentUserInfo.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>
            {{currentUserInfo.nickname}}
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
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user.js'
import myCell from '@/components/myCell.vue'
export default {
  // 数据对象函数
  data () {
    return {
      currentUserInfo: {}
    }
  },
  // 组件加载完毕钩子函数
  mounted () {
    // 在跳转到个人中心页时获取当前用户的数据并填充到页面上
    let id = this.$route.params.id
    getUserInfo(id)
      .then((res) => {
        console.log(res)
        // 将返回的用户数据存到currentUserInfo中
        this.currentUserInfo = res.data.data
        console.log(this.currentUserInfo)
        // 处理用户头像,加载用户头像,若用户没有设置则显示默认头像
        if (this.currentUserInfo.head_img) {
          // 用户头像的路径为基准地址+图片的服务器地址
          this.currentUserInfo.head_img = localStorage.getItem('baseURL') + this.currentUserInfo.head_img
        } else {
          this.currentUserInfo.head_img = localStorage.getItem('baseURL') + '/uploads/image/default.jpg'
        }
      }).catch((err) => {
        console.log(err)
        this.$toast.fail('服务器正忙,请稍后')
      })
  },
  // 注册组件对象
  components: { myCell }
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
</style>
