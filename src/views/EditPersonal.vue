<template>
  <div class="editPersonal">
    <myHeader title="编辑个人信息">
        <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    </myHeader>
    <div class="head_picture">
        <img :src="userInfo.head_img" alt="">
        <van-uploader :after-read="afterRead" />
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
import { upload, editUser } from '@/api/upload.js'
export default {
  // 注册组件对象
  components: { myHeader, myCell },
  //   数据对象函数
  data () {
    return {
      id: '',
      userInfo: {}
    }
  },
  //   组件加载完成钩子函数
  mounted () {
    // 个人信息的默认展示
    this.id = this.$route.params.id
    getUserInfo(this.id)
      .then((res) => {
        if (res.data.message === '获取成功') {
          // 将返回的数据存在userInfo中,并存下id以备使用
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
  },
  // 事件处理函数对象
  methods: {
    // 文件上传后触发
    afterRead (file) {
      console.log(file)
      // 利用FormData来上传文件
      let formData = new FormData()
      formData.append('file', file.file)
      // 发起异步请求,实现文件上传
      upload(formData)
        .then((res) => {
          console.log(res)
          // 根据返回的数据来判断是否上传成功
          if (res.data.message === '文件上传成功') {
            // 向服务器发请求,更新数据库上的头像信息
            editUser(this.id, { head_img: res.data.data.url })
              .then((res) => {
                // 根据返回信息判断是否修改成功
                if (res.data.message === '修改成功') {
                  // 给出提示,修改成功
                  this.$toast.success(res.data.message)
                  // 更新页面数据
                  this.userInfo.head_img = localStorage.getItem('baseURL') + res.data.data.head_img
                } else {
                  this.$toast.fail('修改失败')
                }
              }).catch((err) => {
                console.log(err)
                this.$toast.fail('请求失败')
              })
          } else {
            this.$toast.fail(res.data.message)
          }
        })
        .catch((err) => {
          console.log(err)
          this.$toast.fail('请求失败')
        })
    }
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
// 修改元素的大小
/deep/.van-uploader__upload{
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
}
// 设置元素的对齐方式
/deep/.van-uploader{
    // 实现任意元素居中
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    opacity: 0;
}
</style>
