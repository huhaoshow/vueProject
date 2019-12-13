<template>
  <input
  class='inp'
  :type="type"
  :placeholder="placeholder"
  :value='value'
  @input='handleInput'
  @blur='handleBlur'
  :class="{error:!status,success:status}"
  >
</template>

<script>
export default {
// 数据对象函数
  data () {
    return {
      status: false
    }
  },
  // 组件加载完毕钩子函数
  mounted () {
    this.status = !!this.value
  },
  // 变量数组
  props: ['type', 'placeholder', 'value', 'rules', 'err_msg'],
  // 事件处理函数对象
  methods: {
    handleInput (event) {
      let value = event.target.value
      this.$emit('input', value)
      if (this.rules) {
        if (this.rules.test(value)) {
          this.status = true
        } else {
          this.status = false
        }
      } else {
        this.status = !!value
      }
    },
    handleBlur (event) {
      if (this.rules && !this.rules.test(event.target.value)) {
        this.$toast.fail(this.err_msg)
      }
    }
  }
}
</script>

<style lang='less' scoped>
    .inp{
        border: none;
        border-bottom: 2px solid #757575;
        outline:none;
        width: 314*100vw/360;
        height: 40*100vw/360;
        font-size: 18px;
        margin: 5px 0;
        background-color: transparent;
    }
    .success{
        border-bottom-color: skyblue;
    }
    .error{
        border-bottom-color: red;
    }
</style>
