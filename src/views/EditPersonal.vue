<template>
  <div class="editPersonal">
    <myHeader title="编辑个人信息">
        <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    </myHeader>
    <div class="head_picture">
        <img :src="userInfo.head_img" alt="">
        <van-uploader :after-read="afterRead" />
    </div>
    <myCell title="昵称" :message='userInfo.nickname' @click="nicknameShow=!nicknameShow"></myCell>
    <van-dialog v-model="nicknameShow" title="修改昵称" show-cancel-button :before-close='updateNickname'>
      <van-field required ref="nickname" :value="userInfo.nickname" label="昵称" />
    </van-dialog>
    <myCell title="密码" message='******' @click="pwdShow=!pwdShow"></myCell>
    <van-dialog v-model="pwdShow" title="修改密码" show-cancel-button :before-close='updatePwd'>
      <van-field required ref="old" placeholder="请输入原密码" label="密码" />
      <van-field required ref="new" placeholder="请输入新密码" label="新密码" />
      <van-field required ref="confirm" placeholder="请确认新密码" label="确认新密码" />
    </van-dialog>
    <myCell title="性别" :message='userInfo.gender?"男":"女"' @click="genderShow=!genderShow"></myCell>
    <van-dialog v-model="genderShow" title="修改昵称" show-cancel-button :before-close='updateGender'>
      <van-picker :columns="['女','男']" :default-index='userInfo.gender' @change="getGender"/>
    </van-dialog>
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
      userInfo: {},
      nicknameShow: false,
      pwdShow: false,
      genderShow: false,
      genderIndex: 0
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
    async afterRead (file) {
      // 获取文件参数,利用FormData来上传文件
      let formData = new FormData()
      formData.append('file', file.file)
      // 发起异步请求,实现文件上传
      let res = await upload(formData)
      // 根据返回的数据来判断是否上传成功
      if (res.data.message === '文件上传成功') {
        // 向服务器发请求,更新数据库上的头像信息
        let response = await editUser(this.id, { head_img: res.data.data.url })
        // 根据返回信息判断是否修改成功
        if (res.status === 200) {
          // 给出提示,修改成功
          this.$toast.success(response.data.message)
          // 更新页面数据
          this.userInfo.head_img = localStorage.getItem('baseURL') + response.data.data.head_img
        } else {
          this.$toast.fail('修改失败')
        }
      } else {
        this.$toast.fail(res.data.message)
      }
    },
    // 更新昵称
    async updateNickname (action, done) {
      // 在关闭模态框前判断输入的昵称是否合法再发请求修改
      // filed输入框的value值需要通过this.$refs.nickname.$refs.input.value来获取
      let newNickname = this.$refs.nickname.$refs.input.value
      if (action === 'confirm' && !newNickname) {
        this.$toast.fail('昵称不能为空,你可以取名为憨憨')
        done(false)
      } else if (action === 'confirm' && newNickname.length >= 10) {
        this.$toast.fail('昵称过长,不能超过10厘米')
        done(false)
      } else if (action === 'confirm' && newNickname === this.userInfo.nickname) {
        this.$toast.fail('你是憨憨吗,这都没改动啊！')
        done(false)
      } else if (action === 'cancel') {
        done()
      } else {
        let res = await editUser(this.id, { nickname: newNickname })
        if (res.status === 200) {
          // 提示用户并更新页面
          this.$toast.success('修改成功')
          this.userInfo.nickname = newNickname
          done()
        }
      }
    },
    // 修改密码
    async updatePwd (active, done) {
      // 同理,在模态框消失前获取到三个框的值
      let oldPwd = this.$refs.old.$refs.input.value
      let newPwd = this.$refs.new.$refs.input.value
      let confirmPwd = this.$refs.confirm.$refs.input.value
      // 判断原密码是否输入正确
      if (active === 'confirm' && oldPwd === this.userInfo.password) {
        // 判断新密码和确认密码是否一致
        if (newPwd === oldPwd) {
          this.$toast.fail('不能和原密码重复,别瞎搞！')
          done(false)
        } else if (newPwd === confirmPwd) {
          // 判断密码是否合法
          if (!/\w{3,16}/.test(newPwd)) {
            this.$toast.fail('密码只能是3~16位的数字,不许打汉字！')
            done(false)
          } else {
            // 发请求修改密码
            let res = await editUser(this.id, { password: newPwd })
            if (res.status === 200) {
              // 给出提示,并且退回到登录页面
              this.$toast.fail(res.data.message)
              this.$router.push({ name: 'login' })
              localStorage.removeItem('token')
              done()
            } else {
              this.toast.fail(res.data.message)
              done(false)
            }
          }
        } else {
          this.$toast.fail('确认新密码失败,写清楚点哦！')
          done(false)
        }
      } else if (active === 'cancel') {
        done()
      } else {
        this.$toast.fail('原密码错误,请重试！你个垃圾')
        done(false)
      }
    },
    // 获取修改的性别
    getGender (picker, value, index) {
      this.genderIndex = index
    },
    // 修改性别
    async updateGender (active, done) {
      // 判断性别是否修改
      if (active === 'confirm' && this.genderIndex === this.userInfo.gender) {
        this.$toast.fail('你没有更改性别哦！')
        done(false)
      } else if (active === 'cancel') {
        done()
      } else {
        let res = await editUser(this.id, { gender: this.genderIndex })
        if (res.status === 200) {
          // 给出提示并更新页面
          this.$toast.success(res.data.message)
          this.userInfo.gender = this.genderIndex
          done()
        } else {
          this.$toast.fail(res.data.message)
          done(false)
        }
      }
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
