<template>
  <div class="editPersonal">
    <myHeader title="编辑个人信息">
        <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    </myHeader>
    <div class="head_picture">
        <img :src="userInfo.head_img" alt="">
    </div>
    <myCell title="昵称" :message='userInfo.nickname'></myCell>
    <myCell title="密码" message='******'></myCell>
    <myCell title="性别" :message='userInfo.gender?"男":"女"'></myCell>
  </div>
</template>

<script>
import myHeader from '@/components/myHeader.vue'
import myCell from '@/components/myCell.vue'
import { getUserInfo } from '@/api/user.js'
export default {
  // 注册组件对象
  components: { myHeader, myCell },
  //   数据对象函数
  data () {
    return {
      userInfo: {}
    }
  },
  //   组件加载完成钩子函数
  mounted () {
    // 个人信息的默认展示
    let id = this.$route.params.id
    getUserInfo(id)
      .then((res) => {
        if (res.data.message === '获取成功') {
          // 将返回的数据存在userInfo中
          this.userInfo = res.data.data
          console.log(this.userInfo)
          // 同样的方法处理头像
          if (this.userInfo.head_img) {
            this.userInfo.head_img = localStorage.getItem('baseURL') + this.userInfo.head_img
          } else {
            this.userInfo.head_img = localStorage.getItem('baseURL') + '/uploads/image/default.jpg'
          }
        } else {
          this.$toast.fail(res.data.message)
        }
      }).catch((err) => {
        console.log(err)
        this.$toast.fail('请求失败')
      })
  }
}

</script>

<style lang='less' scoped>
.head_picture {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  img {
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
}
</style>
