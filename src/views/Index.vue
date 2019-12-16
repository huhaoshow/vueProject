<template>
  <div class="index">
    <div class="header">
      <span class="iconfont iconnew icon"></span>
      <div class="center">
        <van-icon name="search" />&nbsp;&nbsp;&nbsp;搜索商品
      </div>
      <van-icon name="manager-o" class="icon" />
    </div>
    <div class="title">
      <van-tabs v-model="active" sticky swipeable>
        <!-- 在category数组中循环,value代表当前循环的内容,相当于category[active] -->
        <van-tab v-for="value in category" :key="value.id" :title="value.name">
          <!-- 在当前循环的value中再次进行循环 -->
          <articleBlock v-for="article in value.articleList" :key="article.id" :article='article'></articleBlock>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// 引入api方法
import { getCategory } from '@/api/category.js'
import { getArticleList } from '@/api/article.js'
// 引入组件
import articleBlock from '@/components/articleBlock.vue'
export default {
  // 组件加载完成钩子函数
  mounted () {
    // 打开页面后发请求获取所有内容并渲染到页面上
    // 获取栏目列表并渲染
    getCategory().then((res) => {
      if (res.status === 200) {
        this.category = res.data.data
        console.log(this.category)
        // 如果直接获取所有文章将会造成服务器的负载,所以为了达到每次请求只获取当前栏目的文章,所以要对数据进行改造,在请求文章的时候传递url参数
        this.category = this.category.map((item) => {
          return {
            ...item,
            articleList: [],
            pageIndex: 1,
            pageSize: 9
          }
        })
        console.log(this.category)
        console.log(this.category[this.active].id)
        // 获取当前所在栏目的文章
        this.getAriticleList()
      } else {
        this.$toast.fail(res.data.message)
      }
    }).catch((err) => {
      console.log(err)
      this.$toast.fail('请求失败')
    })
  },
  // 数据函数对象
  data () {
    return {
      active: localStorage.getItem('token') ? 1 : 0,
      category: []
    }
  },
  // 注册组件对象
  components: { articleBlock },
  // 事件处理函数对象
  methods: {
    async getAriticleList () {
      let res = await getArticleList({
        pageIndex: this.category[this.active].pageIndex,
        pageSize: this.category[this.active].pageSize,
        category: this.category[this.active].id
      })
      if (res.status === 200) {
        this.category[this.active].articleList = res.data.data
      } else {
        this.$toast.fail(res.data.message)
      }
    }
  },
  // 监听对象
  watch: {
    active () {
      // 当active改变则说明了栏目进行了切换
      // 获取当前栏目的文章数据 this.category[this.active].articleList
      // 如果当前栏目的文章列表数据长度为0,说明还没有获取过这个栏目的新闻数据，那么就需要发起请求获取数据
      // 如果已经有数据，则无需再次发起请求
      if (this.category[this.active].articleList.length === 0) {
        this.getAriticleList()
      }
    }
  }
}

</script>

<style lang='less' scoped>
.index {
  .header {
    height: 50 * 100vw/360;
    display: flex;
    justify-content: space-between;
    background-color: #f00;
    align-items: center;
    color: #fff;
    .icon {
      font-size: 25px;
      padding: 0 20px;
    }
    .iconnew {
      font-size: 60px;
    }
    .center {
      flex: 1;
      height: 40px;
      line-height: 40px;
      background-color: rgba(255, 255, 255, 0.5);
      text-align: center;
      border-radius: 20px;
    }
  }
}
</style>
