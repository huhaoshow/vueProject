<template>
  <div class="cell" @click='handleClick'>
      <div class="left">{{title}}</div>
      <div class="right">
          {{message}}
          <span class="iconfont iconjiantou1"></span>
      </div>
  </div>
</template>

<script>
export default {
// 变量数组
  props: ['title', 'message'],
  // 事件处理函数对象
  methods: {
    handleClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less' scoped>
    .cell{
        height: 60*100vw/360;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        padding: 0 30px;
        font-size: 18px;
        >.right{
            color: #666
        }
    }
</style>
