<template>
  <div id="app">
    <!-- 添加路由映射区域 -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  // 组件加载完成钩子函数
  mounted () {
    // this.$toast('登录成功')
  }
}
</script>

<style lang="less">
@import url('http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css');
</style>
