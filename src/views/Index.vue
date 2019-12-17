<template>
  <div class="index">
    <div class="header">
      <span class="iconfont iconnew icon"></span>
      <div class="center">
        <van-icon name="search" />&nbsp;&nbsp;&nbsp;搜索商品
      </div>
      <van-icon name="manager-o" class="icon" @click="jump"/>
    </div>
    <div class="title">
      <van-tabs v-model="active" sticky swipeable>
        <!-- 在categoryList数组中循环,category代表当前循环的栏目,相当于categoryList[active] -->
        <van-tab v-for="category in categoryList" :key="category.id" :title="category.name">
          <!-- 在每个栏目下添加上拉加载 -->
          <van-list v-model="category.loading" :finished="category.finished" finished-text="没有更多了" :immediate-check='false' @load="onLoad">
            <!-- 在每个栏目下添加下拉刷新 -->
            <van-pull-refresh v-model="category.isLoading" success-text='刷新成功' @refresh="onRefresh">
              <!-- 在当前循环的category中再次进行循环 -->
              <articleBlock v-for="article in category.articleList" :key="article.id" :article='article'></articleBlock>
          </van-pull-refresh>
        </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// 引入api方法
import { getCategoryList } from '@/api/category.js'
import { getArticleList } from '@/api/article.js'
// 引入组件
import articleBlock from '@/components/articleBlock.vue'
export default {
  // 数据函数对象
  data () {
    return {
      active: localStorage.getItem('token') ? 1 : 0,
      categoryList: []
    }
  },
  // 组件加载完成钩子函数
  async mounted () {
    // 打开页面后发请求获取所有内容并渲染到页面上
    // 获取栏目列表并渲染
    let res = await getCategoryList()
    if (res.status === 200) {
      // 如果直接获取所有文章将会造成服务器的负载,所以为了达到每次请求只获取当前栏目的文章,所以要对数据进行改造,在请求文章的时候传递url参数
      this.categoryList = res.data.data.map((item) => {
        return {
          ...item, // 原始的内容
          articleList: [], // 当前栏目所请求的内容
          pageIndex: 1, // 当前栏目请求的页码
          pageSize: 6, // 当前栏目每页请求的条数
          isLoading: false, // 当前栏目的下拉刷新状态,true为刷新中,false为刷新完成
          loading: false, // 当前栏目上拉加载状态,true为加载中,false为加载完成
          finished: false // 当前栏目是否全部加载完毕,若加载完毕则不再触发load事件,true为加载完毕,false为未加载完毕
        }
      })
      // 获取当前所在栏目的文章
      this.renderArticleList()
    } else { this.$toast.fail(res.data.message) }
  },
  // 注册组件对象
  components: { articleBlock },
  // 事件处理函数对象
  methods: {
    // 封装获取文章列表并渲染页面
    async renderArticleList () {
      let res = await getArticleList({
        pageIndex: this.categoryList[this.active].pageIndex,
        pageSize: this.categoryList[this.active].pageSize,
        category: this.categoryList[this.active].id
      })
      if (res.status === 200) {
        // 将获取到的内容追加到原先的数组中
        this.categoryList[this.active].articleList.push(...res.data.data)
        // 停止加载
        this.categoryList[this.active].loading = false
        // 判断数据库中的内容是否完全加载完毕,如果返回的数据条数小于请求的条数,则说明数据库内容加载完毕
        if (res.data.data.length < this.categoryList[this.active].pageSize) {
          this.categoryList[this.active].finished = true
        }
      } else {
        this.$toast.fail(res.data.message)
      }
    },
    // 下拉刷新
    onRefresh () {
      // 请求页码重置为1
      this.categoryList[this.active].pageIndex = 1
      // 下拉刷新时将finished重置为false,否则无法再次进行上拉加载更多
      this.categoryList[this.active].finished = false
      // 重新请求第一页数据
      // 将原先加载的内容清空
      this.categoryList[this.active].articleList.length = 0
      this.renderArticleList()
      // 数据请求完成后关闭下拉刷新
      this.categoryList[this.active].isLoading = false
    },
    // 上拉加载更多
    onLoad () {
      console.log('加载')
      // 请求页码+1
      this.categoryList[this.active].pageIndex += 1
      // 继续请求下一页数据
      this.renderArticleList()
    },
    // 跳转到中心页
    jump () {
      let token = localStorage.getItem('token')
      if (token) {
        this.$router.push({ path: `/personal/${localStorage.getItem('id')}` })
      } else {
        this.$router.push({ name: 'login' })
      }
    }
  },
  // 监听对象
  watch: {
    active () {
      // 当active改变则说明了栏目进行了切换
      // 获取当前栏目的文章数据 this.categoryList[this.active].articleList
      // 如果当前栏目的文章列表数据长度为0,说明还没有获取过这个栏目的新闻数据，那么就需要发起请求获取数据
      // 如果已经有数据，则无需再次发起请求
      if (this.categoryList[this.active].articleList.length === 0) {
        this.renderArticleList()
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
