<template>
  <div class="articleDetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span @click="isfollowUser" :class='{active:article.has_follow}'>{{article.has_follow?'已关注':'关注'}}</span>
    </div>
    <div class="detail">
      <div class="title">{{article.title}}</div>
      <div class="desc">
        <span>{{article.user && article.user.nickname}}</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <div v-if="article.type === 1" class="content" v-html="article.content"></div>
      <!-- 视频标签 -->
      <video v-if="article.type === 2" :src="article.content" :poster="article.cover[0].url" controls></video>
      <div class="opt">
        <span @click="isLike" :class="{liked:article.has_like}" class="like">
          <van-icon name="good-job-o" />{{article.comment_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="../assets/logo.png" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
  </div>
</template>

<script>
import { getArticleDetail, likeArticle } from '@/api/article.js'
import { followUser, unFollowUser } from '@/api/user.js'

export default {
  // 数据函数对象
  data () {
    return {
      article: {},
      articleId: ''
    }
  },
  // 组件加载完成钩子函数
  async mounted () {
    // 跳转到详情页后获取传过来的id并发请求获取当前数据判断是文章还是视频,然后进行页面渲染
    this.articleId = this.$route.params.id
    let res = await getArticleDetail(this.articleId)
    if (res.status === 200) {
      this.article = res.data.data
      console.log(this.article)
    } else {
      this.$toast.fail('页面请求失败')
    }
  },
  // 事件处理函数方法
  methods: {
    // 处理关注或者取消关注的事件函数
    async isfollowUser () {
      // 如果关注了,点击则是取消关注,如果没有关注点击则是关注
      // 由于响应拦截器的作用,若用户没有登录则会返回用户信息不正确从而将其退出到登入页
      if (this.article.has_follow) {
        // 发起取消关注请求
        let res1 = await unFollowUser(this.article.user.id)
        if (res1.status === 200) {
          // 更新页面上的关注信息并且给出提示
          this.article.has_follow = false
          this.$toast.success(res1.data.message)
        } else {
          this.$toast.fail(res1.data.message)
        }
      } else {
        let res2 = await followUser(this.article.user.id)
        if (res2.status === 200) {
          // 更新页面上的在关注信息并且给出提示
          this.article.has_follow = true
          this.$toast.success(res2.data.message)
        } else {
          this.$toast.fail(res2.data.message)
        }
      }
    },
    // 处理是否点赞的事件
    async isLike () {
      // 由于点赞和取消点赞都是同一个接口,所以发起请求后,根据返回结果来确定是点赞还是取消点赞
      let res = await likeArticle(this.article.user.id)
      // 如果返回结果是点赞成功,则之前未点赞,若是取消成功,则之前是点赞
      if (res.data.message === '点赞成功') {
        // 更新页面点赞状态为已点赞,并使得点赞数+1,
        this.article.has_like = true
        this.article.comment_length++
      } else if (res.data.message === '取消成功') {
        // 更新页面点赞状态为未点赞,并使得点赞数-1,
        this.article.has_like = false
        this.article.comment_length--
      } else {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
.active{
  background-color: #ccc !important;
}
.liked{
  background-color: #a00 !important;
}
video{
    width: 100%;
    margin-bottom: 10px;
}
/deep/.photo{
    img {
        width: 100%!important;
        display: block;
    }
}
</style>
