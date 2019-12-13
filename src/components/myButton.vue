<template>
<div :class="{login:type==='login'}" @click='handleClick'>
    <slot></slot>
</div>
</template>

<script>
export default {
  // 变量数组
  props: ['type'],
  // 事件函数对象
  methods: {
    handleClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less' scoped>
.login{
    width: 318*100vw/360;
    height: 48*100vw/360;
    background-color: #cc3300;
    border-radius: 24*100vw/360;
    color: #fff;
    text-align: center;
    line-height: 48*100vw/360;
    font-size: 18px;

}
</style>
