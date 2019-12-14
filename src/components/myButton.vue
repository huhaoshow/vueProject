<template>
<div class="btn" :class="{login:type==='login',back:type==='back'}" @click='handleClick'>
    <slot></slot>
</div>
</template>

<script>
export default {
  // 变量数组
  props: ['type'],
  // 事件函数对象
  methods: {
    // 如果有人点击该按钮,将事件发射给父组件,让父组件来处理
    handleClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less' scoped>
// type=login时的按钮样式
.btn{
    width: 318*100vw/360;
    height: 48*100vw/360;
    border-radius: 24*100vw/360;
    color: #fff;
    text-align: center;
    line-height: 48*100vw/360;
    font-size: 18px;
}
.login{
  background-color: #c30;
}
.back{
  background-color: #060;
}
</style>
