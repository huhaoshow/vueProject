<template>
  <div class="header">
      <span><slot name="left"></slot></span>
      <span class="title">{{title}}</span>
      <span><slot name="right"></slot></span>
  </div>
</template>

<script>
export default {
// 变量数组
  props: ['title']
}
</script>

<style lang='less' scoped>
    .header{
        height: 46*100vw/360;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        .title{
            font-weight: 600;
            font-size: 18px;
        }
    }
</style>
