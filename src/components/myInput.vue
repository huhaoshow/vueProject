<template>
  <input
  class='inp'
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
    // 组件加载完成后,若有内容填充,文本框显示正确提示
    this.status = !!this.value
  },
  // 变量数组
  props: ['value', 'rules', 'err_msg'],
  // 事件处理函数对象
  methods: {
    // 当文本框的内容发生变化时执行
    handleInput (event) {
      let value = event.target.value
      this.$emit('input', value)
      // 如果有正则表达式,就进行判断,若没有正则表达式则文本框有内容就显示正确提示,没有内容显示错误提示
      if (this.rules) {
        // 如果内容符何表达式,则显示正确提示,否则显示错误提示
        if (this.rules.test(value)) {
          this.status = true
        } else {
          this.status = false
        }
      } else {
        this.status = !!value
      }
    },
    // 在文本框失去焦点的时候触发
    handleBlur (event) {
      // 如果有正则表达式且内容不符合要求,则轻提示错误信息
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
    // 正确提示
    .success{
        border-bottom-color: skyblue;
    }
    // 错误提示
    .error{
        border-bottom-color: red;
    }
</style>
